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

- If a parameter is not used by a toggle, and it's not already in filters, we'll need to just hardcode the default value

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
