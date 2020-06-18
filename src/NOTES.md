Steps to create a new page:

_1. Duplicate the `template-page` folder in `layouts`, and rename it to the new page (eg: 'value-of-building-approvals')_

- Add this page to the imports in `layouts/index.ts`

- Add this page to the `PageMappings` object in `layouts/index.ts`

- Add this page to the `devPages` array in `layouts/index.ts`

These steps allow the page to be served once we visit eg /monash/value-of-building-approvals in development.

If we want the page to be accessible in production, we'll also need to add it to the `productionPages` array.

_2. Open up `value-of-building-approvals/index.ts`._

Here, you will need to add data into the `entities` and `filterToggles` arrays in `PageContent`

- Open up `data/entities.ts`, find the array that matches `value-of-building-approvals`, and copy it into the `entities` array
- Open up `data/toggles.ts`, find the array that matches `value-of-building-approvals`, and copy it into the `filterToggles` array

Once we've done these steps, we should be able to see the Headline and Description on the page.

TODO: add the Subtitle field here as a template string -- sometimes the Subtitle uses variables (eg [anything inside braces]) which we'll
need to interpolate before displaying.

_Now, we'll need to fetch the data for this page._

- The easiest way to do this is to open up Cosmos DB, and query the containers directly.

- First, open up the Pages container and find the page with the alias `value-of-building-approvals` (eg `WHERE c.Alias = 'value-of-etc'`)

- Next, find the 'Entities' object in this item, and find the entity with a `SetName = 'Table'`

- Make note of both the the EntityID _and_ the EntityTypeID. **EntityIDs are not globally unique**

- Now, open up the Entities container and find the entity which matches both `EntityID` and `EntityTypeID`

- This entity should hopefully have a HtmlTableID key set (eg: 348)

- Now, open up the Tables container and find the table which matches this `EntityTypeID`

- Make note of the Name -- we'll need this shortly

- Copy the TableName and OrderBy values into the `contentDataQuery` function in `value-of-building-approvals/index`

- The parameters (eg everything inside the "()", so ClientID, WebID, BMID) will need to be in the same order as in the `Parameters` object in Cosmos (or just look up the function in SQL)

- Any parameters used should either appear in the `filterToggles` array, or be in filters already (eg ClientID, BMID, WebID)

- If a parameter is not used by a toggle, and it's not already in filters, we'll need to just hardcode the default value, if a toggle needs to be hidden just add: `Hidden: true,` to the toggle object.

Once we've done these steps, we should be able to uncomment the lines so that data is being fetched using this SQL call.

TODO: We need a way to determine when a 'lite' SQL call should be used. This should be as easy as passing an `isLite` variable through to `fetchData`,
which calls either a full or a lite SQL query. **Hopefully** the shape of the data remains the same -- if not, we may need to render different
tables for lite clients, etc.

_Next, we need to update the `entities` strings that use variables_

For example, a template string might look like:

`In ${data.currentAreaName}, there were [Econ_Ind_EmployedResidents].[LocalJobNumber].{0:#,#} residents employed in the year ending June [Econ_Ind_EmployedResidents].[YearEnding].`

Here, `data.currentAreaName` has already been set for us -- we just need to work out how to display `LocalJobNumber` and `YearEnding`.

First, check that the Name of the HtmlTable above matches the table being referenced here -- eg `Econ_Ind_EmployedResidents`. (If it doesn't, maybe there's another table being used and we have to dig a bit deeper?)

Second, look at the `Attributes` key in the Table object -- there should be an entry whose `Name` matches the variable we're looking for (eg `LocalJobNumber`). _This is not the column name_. The value we need to get is the `ReturnColumnName`, eg `PerYear1`.

This value will be one of the columns returned by the SQL call, which we have access to in the `contentData` array. _Sometimes we want the first row back, sometimes we want the largest row back_. For now, until we can work out the best logic, it might be easier to manipulate `contentData` on a case-by-case basis to get the correct data returned.

---

After this, the remaining work will be formatting the data into the tables and charts, and working out any other uses of the data (eg strings that compare results).

TODO: ideally, we'd be able to use the Entities object more generally to format tables and charts directly, as there's a _lot_ of information in Cosmos that could drive this logic. However, making the entire app general enough to use this data, while maintaining the ability to "escape"
the data structures when required, would be a lot of work that's outside the scope of simply translating pages.

Ideally, we'd use a CMS-driven API to serve data from Cosmos, format it into a format readable by Next, and render pages appropriately. Right now, this would be a lot of work without immediate benefits, and as more pages are translated more edge-case scenarios will inevitably be uncovered that lead to further work maintaining a generalised solution.

My focus has generally been on pulling out shared features across the majority of pages (eg the Headline, Description, Control Panel, Related Pages) and automatically including them where possible. Although the steps above cover _a lot_ of ground, most of it is "simply" finding the correct data to use -- and can be replaced with just checking the existing CMS, or looking elsewhere to find this data. 25% of the work is finding the correct SQL query and 25% of the work is fixing up the Headline and Description strings to use the correct variables. The remaining 50% is building out tables, charts, and formatting the strings that compare benchmarks etc (which has already been done for eg `workers-field-of-qualifications`).

Pages:

[
{
"Alias":"home",
"PageID":4000,
"MenuTitle":"Home"
},
{
"Alias":"indicator",
"PageID":4010,
"MenuTitle":"Economic indicators"
},
{
"Alias":"about",
"PageID":4180,
"MenuTitle":"About the area"
},
{
"Alias":"infrastructure",
"PageID":4190,
"MenuTitle":"Infrastructure"
},
{
"Alias":"size",
"PageID":4200,
"MenuTitle":"Economic value"
},
{
"Alias":"structure",
"PageID":4220,
"MenuTitle":"Local employment"
},
{
"Alias":"spatial-economy",
"PageID":4340,
"MenuTitle":"Businesses"
},
{
"Alias":"industry-focus",
"PageID":4320,
"MenuTitle":"Industry focus"
},
{
"Alias":"journey-to-work",
"PageID":4360,
"MenuTitle":"Journey to work"
},
{
"Alias":"workforce-profiles",
"PageID":4420,
"MenuTitle":"Local workers"
},
{
"Alias":"labour-force",
"PageID":4421,
"MenuTitle":"Resident workers"
},
{
"Alias":"local-market",
"PageID":4490,
"MenuTitle":"Market profile"
},
{
"Alias":"housing-market",
"PageID":4640,
"MenuTitle":"Housing cost"
},
{
"Alias":"tourism",
"PageID":4540,
"MenuTitle":"Tourism and hospitality"
},
{
"Alias":"covid19",
"PageID":99999,
"MenuTitle":"Covid19 economic outlook"
},
{
"Alias":"economic-impact-assesment",
"PageID":4520,
"MenuTitle":"Economic impact model"
},
{
"Alias":"event-impact-assesment",
"PageID":4525,
"MenuTitle":"Event impact calculator"
},
{
"Alias":"location-quotient",
"PageID":4528,
"MenuTitle":"Location quotient"
},
{
"Alias":"shift-share",
"PageID":4529,
"MenuTitle":"Shift-share analysis"
},
{
"Alias":"reports-root",
"PageID":4625,
"MenuTitle":"Reports"
},
{
"Alias":"about-economy-parent",
"PageID":4545,
"MenuTitle":"About the economic profile"
},
{
"Alias":"explanatory-notes",
"PageID":4560,
"MenuTitle":"Explanatory notes"
},
{
"Alias":"signin",
"PageID":4996,
"MenuTitle":"Sign in"
},
{
"Alias":"population",
"PageID":4110,
"MenuTitle":"Population"
},
{
"Alias":"gross-product",
"PageID":4120,
"MenuTitle":"Gross product"
},
{
"Alias":"local-jobs",
"PageID":4122,
"MenuTitle":"Local employment"
},
{
"Alias":"industry-composition",
"PageID":4123,
"MenuTitle":"Industry composition"
},
{
"Alias":"employed-residents",
"PageID":4124,
"MenuTitle":"Employed residents"
},
{
"Alias":"unemployment",
"PageID":4130,
"MenuTitle":"Unemployment"
},
{
"Alias":"value-of-building-approvals",
"PageID":4140,
"MenuTitle":"Building approvals"
},
{
"Alias":"housing-prices",
"PageID":4145,
"MenuTitle":"Housing prices"
},
{
"Alias":"housing-rental",
"PageID":4146,
"MenuTitle":"Housing rental"
},
{
"Alias":"retail-trade",
"PageID":4150,
"MenuTitle":"Retail trade"
},
{
"Alias":"consumer-price-index",
"PageID":4160,
"MenuTitle":"Consumer Price Index"
},
{
"Alias":"gross-regional-product",
"PageID":4210,
"MenuTitle":"Gross Regional Product"
},
{
"Alias":"value-add-by-industry",
"PageID":4250,
"MenuTitle":"Value added"
},
{
"Alias":"output-by-industry",
"PageID":4260,
"MenuTitle":"Output"
},
{
"Alias":"local-sales-by-industry",
"PageID":4290,
"MenuTitle":"Local sales"
},
{
"Alias":"exports-by-industry",
"PageID":4270,
"MenuTitle":"Exports"
},
{
"Alias":"imports-by-industry",
"PageID":4280,
"MenuTitle":"Imports"
},
{
"Alias":"employment-by-industry",
"PageID":4240,
"MenuTitle":"Employment by industry (Total)"
},
{
"Alias":"employment-by-industry-fte",
"PageID":4230,
"MenuTitle":"Employment by industry (FTE)"
},
{
"Alias":"employment-census",
"PageID":4235,
"MenuTitle":"Employment by industry (Census)"
},
{
"Alias":"worker-productivity-by-industry",
"PageID":4300,
"MenuTitle":"Worker productivity"
},
{
"Alias":"employment-locations",
"PageID":4350,
"MenuTitle":"Employment locations"
},
{
"Alias":"Employment-capacity",
"PageID":4510,
"MenuTitle":"Jobs to workers ratio"
},
{
"Alias":"industry-sector-analysis",
"PageID":4330,
"MenuTitle":"Industry sector analysis"
},
{
"Alias":"industry-sector-analysis-series",
"PageID":4332,
"MenuTitle":"Time series industry sector analysis"
},
{
"Alias":"number-of-businesses-by-industry",
"PageID":4310,
"MenuTitle":"Businesses by industry"
},
{
"Alias":"business-locations",
"PageID":4351,
"MenuTitle":"Business locations"
},
{
"Alias":"workers-place-of-residence-industry",
"PageID":4371,
"MenuTitle":"Workers place of residence by industry"
},
{
"Alias":"workers-place-of-residence-occupation",
"PageID":4372,
"MenuTitle":"Workers place of residence by occupation"
},
{
"Alias":"local-employment",
"PageID":4410,
"MenuTitle":"Employment self-sufficiency"
},
{
"Alias":"residents-place-of-work-industry",
"PageID":4381,
"MenuTitle":"Residents place of work by industry"
},
{
"Alias":"residents-place-of-work-occupation",
"PageID":4382,
"MenuTitle":"Residents place of work by occupation"
},
{
"Alias":"employed-locally",
"PageID":4400,
"MenuTitle":"Employment self-containment"
},
{
"Alias":"workers-key-statistics",
"PageID":4430,
"MenuTitle":"Key statistics"
},
{
"Alias":"workers-age-structure",
"PageID":4440,
"MenuTitle":"Age structure"
},
{
"Alias":"workers-hours-worked",
"PageID":4450,
"MenuTitle":"Hours worked"
},
{
"Alias":"workers-occupations",
"PageID":4460,
"MenuTitle":"Occupations"
},
{
"Alias":"workers-level-of-qualifications",
"PageID":4470,
"MenuTitle":"Qualifications"
},
{
"Alias":"workers-field-of-qualification",
"PageID":4480,
"MenuTitle":"Field of qualification"
},
{
"Alias":"workers-income",
"PageID":4482,
"MenuTitle":"Income"
},
{
"Alias":"workers-income-quartile",
"PageID":4433,
"MenuTitle":"Income quartiles"
},
{
"Alias":"workers-travel-to-work",
"PageID":4484,
"MenuTitle":"Method of travel to work"
},
{
"Alias":"labourforce-key-statistics",
"PageID":4422,
"MenuTitle":"Key statistics"
},
{
"Alias":"industry",
"PageID":4429,
"MenuTitle":"Industry summary"
},
{
"Alias":"age-structure",
"PageID":4423,
"MenuTitle":"Age structure"
},
{
"Alias":"hours-worked",
"PageID":4424,
"MenuTitle":"Hours worked"
},
{
"Alias":"occupations",
"PageID":4425,
"MenuTitle":"Occupations"
},
{
"Alias":"qualifications",
"PageID":4426,
"MenuTitle":"Qualifications"
},
{
"Alias":"field-of-qualification",
"PageID":4427,
"MenuTitle":"Field of qualification"
},
{
"Alias":"income",
"PageID":4428,
"MenuTitle":"Income"
},
{
"Alias":"income-quartiles",
"PageID":4434,
"MenuTitle":"Income quartiles"
},
{
"Alias":"travel-to-work",
"PageID":4431,
"MenuTitle":"Method of travel to work"
},
{
"Alias":"unemployed-keystats",
"PageID":4432,
"MenuTitle":"Characteristics of the unemployed"
},
{
"Alias":"market-characteristics",
"PageID":4500,
"MenuTitle":"Market characteristics"
},
{
"Alias":"income-sources",
"PageID":4505,
"MenuTitle":"Sources of income"
},
{
"Alias":"household-expenditure",
"PageID":4508,
"MenuTitle":"Household expenditure"
},
{
"Alias":"tourism-value",
"PageID":4541,
"MenuTitle":"Tourism sector analysis"
},
{
"Alias":"tourism-workforce",
"PageID":4542,
"MenuTitle":"Workforce characteristics"
},
{
"Alias":"tourism-visitor-summary",
"PageID":4543,
"MenuTitle":"Tourism visitor summary"
},
{
"Alias":"tourism-visitors-nights",
"PageID":4544,
"MenuTitle":"Visitors and nights"
},
{
"Alias":"tourism-visitors-reason",
"PageID":4546,
"MenuTitle":"Visitors by reason"
},
{
"Alias":"about-economy-id",
"PageID":4550,
"MenuTitle":"Overview"
},
{
"Alias":"economy-flyer",
"PageID":4551,
"MenuTitle":"Promotional flyer"
},
{
"Alias":"accessibility-economy",
"PageID":4555,
"MenuTitle":"Accessibility"
},
{
"Alias":"data-sources",
"PageID":4570,
"MenuTitle":"Data sources"
},
{
"Alias":"population-types",
"PageID":4580,
"MenuTitle":"Population types"
},
{
"Alias":"industry-sector-definitions",
"PageID":4590,
"MenuTitle":"Industry sector definitions"
},
{
"Alias":"topic-notes",
"PageID":4600,
"MenuTitle":"Specific topic notes"
},
{
"Alias":"glossary",
"PageID":4610,
"MenuTitle":"Glossary"
},
{
"Alias":"site-map",
"PageID":4620,
"MenuTitle":"Site map"
},
{
"Alias":"economic-model-updates",
"PageID":5009,
"MenuTitle":"Economic model updates"
},
{
"Alias":"reports",
"PageID":4630,
"MenuTitle":"Economic overview"
},
{
"Alias":"reports-industry",
"PageID":4631,
"MenuTitle":"Industry sector reports"
},
{
"Alias":"reports-employment",
"PageID":4632,
"MenuTitle":"Employment reports"
},
{
"Alias":"housing-values",
"PageID":4641,
"MenuTitle":"Housing valuation"
},
{
"Alias":"rental-listings",
"PageID":4642,
"MenuTitle":"Rental listings"
}
]
