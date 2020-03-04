import { LinkBuilder } from '../../../components/ui/links';
import { SubTitleAlt, TopList, TopOrderedList } from '../../../styles/MainContentStyles';

const DataSourcesPage = () => {
  return (
    <>
      <SubTitleAlt>National Economics (NIEIR micro simulation model)</SubTitleAlt>
      <p>
        Economy.id industry structure and industry sector profiles use a National Accounts regional econometric model
        developed by National Economics (NIEIR). This model is based on replicating the outputs of the National Accounts
        framework for local areas such as LGAs, using a range of data sources to model the accounts to show local
        trends.
      </p>
      <p>
        National accounts provide a systematic statistical framework for summarising and analysing economic events, and
        wealth of an economy and its components. The principal economic events recorded in national accounts have been
        production, consumption, and accumulation of wealth. National accounts have also recorded the income generated
        by production, the distribution of income among the factors of production and the use of the income, either by
        consumption or acquisition of assets.
      </p>
      <p>
        National Economics has three regional models. The State (SIMP) and Regional IMP (RIMP) models are used for
        forecasting state and regional economic activity, and assessing state and regional impacts. The Regional
        Household Information System (RHIS) uses microsimulation techniques to distribute estimates of household
        expenditure and incomes to small regions.
      </p>
      <p>
        These models provide estimates of state economic activity on both a quarterly and an annual basis. Both models
        are based upon the detailed ABS state accounts with quarterly updates based on key aggregates. The annual model
        incorporates a detailed industry disaggregation and input-output structure. The dynamic input-output modelling
        used in this structure allows for detailed impact assessments to be made which incorporate local effects.
      </p>
      <p>
        An <b>input-output model</b> depicts the inter-industry relations of an economy. It shows how the output of one
        industry is an input to each other industry. Using a matrix representation of an area’s economy, a given input
        is typically enumerated in the column of an industry and its outputs are enumerated in its corresponding row.
        This format shows how dependent each industry is on all others in the economy both as customer of their outputs
        and as supplier of their inputs.
      </p>
      <p>
        The National Economics state and regional models contain over 400,000 variables at the local level and provide
        estimates of:
      </p>
      <TopList>
        <li>population growth;</li>
        <li>dwelling commencements;</li>
        <li>housing stock;</li>
        <li>employment by industry;</li>
        <li>output by industry; </li>
        <li>investment by industry;</li>
        <li>imports and exports by industry;</li>
        <li>gross regional product; and</li>
        <li>estimated consumption expenditure.</li>
      </TopList>
      <p>
        Inputs to these models are continually being refined, and are available for different time periods, from
        5-yearly (census) to quarterly (labour force). These inputs include, but are not necessarily limited to:
      </p>
      <TopList>
        <li>Population Census data (working population) </li>
        <li>ABS National Accounts (income, expenditure and product) </li>
        <li>ABS State Accounts</li>
        <li>ABS Labour Force Survey regional employment and hours estimates</li>
        <li>ATO Income tax estimates by postcode</li>
        <li>Centrelink payments by postcode</li>
        <li>Real Estate Institute (state) housing price and rent estimates</li>
        <li>ABS Household Expenditure Survey</li>
      </TopList>
      <p>
        <b>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the most two years of data should be anticipated by
          users, which could change the statistical outcomes. The model is normally updated between January and March
          each year, adding the previous financial year’s data.
        </b>
      </p>
      <p>
        For more information on the modelled economic data, please go to the{' '}
        {LinkBuilder('http://www.nieir.com.au/', 'NIEIR website')}.
      </p>
      <SubTitleAlt>Hometrack Australia</SubTitleAlt>
      <p>
        Hometrack Australia (Hometrack) is a property analytics company specialising in valuation services and property
        risk analytics. Hometrack’s focus is on combining its predictive analytics prowess with industry expertise to
        create advanced forms of software-as-a-service platforms. Hometrack provides essential tools to mortgage
        lenders, servicers, rating agencies and the investment community, in both private and government sectors.
      </p>
      <p>
        Hometrack is an Australian based company and subsidiary of Hometrack Data Systems Ltd in the UK. Hometrack
        commenced operating in Australia in 2007. Since then Hometrack has grown its range of products to incorporate a
        comprehensive suite of electronic and physical valuation solutions and workflow solutions. Hometrack manages a
        comprehensive and accurate property database in Australia, built from a wide variety of unique data sources.
        Hometrack employs a locally based team of database engineers, application developers and quantitative experts to
        ensure quality is maintained to the highest standards. A distinctive feature of Hometrack is that market leading
        predictive analytics is embedded within all of its solutions.
      </p>
      <p>
        The services offered by Hometrack include automated valuations (AVMs), desktop valuations (Hometrack Valuer),
        predictive scoring and data analytics, with an emphasis on assisting customers to manage property risk and grow
        profitability.
      </p>
      <p>
        For more information on Hometrack, please go to the{' '}
        {LinkBuilder('https://www.hometrack.com/au/', 'Hometrack website')}.
      </p>
      <SubTitleAlt>Australian Bureau of Statistics Census data </SubTitleAlt>
      <p>
        The Census of Population and Housing is undertaken by the Australian Bureau of Statistics every five years and
        provides a snapshot of the nation, which helps define who we are and what we do.
      </p>
      <p>
        The Census is one of the most comprehensive sources of economic data available to local government because it:
      </p>
      <TopOrderedList>
        <li>
          includes a series of questions about skills and employment, including education levels, occupations, industry
          of employment, hours worked, method of travel to work and income;{' '}
        </li>
        <li>provides that information for small geographic areas, including Local Government Areas; and</li>
        <li>links where people live with where they work.</li>
      </TopOrderedList>
      <p>
        In economy.id Census data is used to present the economic base of the local area, as well as to present the
        characteristics of the Local workers, Residents, Local resident workers and Regional resident workers. Census
        employment data is also the base data used to convert National Accounts data into an input-output model for a
        local area in the NIEIR model.
      </p>
      <p>
        economy.id includes data from the 2006 and 2011 Census to show how the local economic base and population
        characteristics are changing. The 2011 Census was conducted on 9 August 2011. The next Census will be conducted
        on August, 2016.
      </p>
      <SubTitleAlt>Australian Bureau of Statistics Place of work data</SubTitleAlt>
      <p>
        Place of Work data provides information on where people work. It is based on the Census Question:{' '}
        <em>"For the main job held last week, what was the person's workplace address?"</em>
      </p>
      <TopList>
        <li>
          Place of Work data is coded to Destination Zones, which are designed by State Transport Authorities (STAs) in
          each state and territory.
        </li>
        <li>
          Work Destination Zones concord with Local Government Area boundaries, but they do not match other Census
          boundaries such as collection districts. They are designed to reflect the location of industry rather than
          residents, so there are more, small destination zones around major employment nodes, while they are large and
          sparser in residential and rural areas.
        </li>
      </TopList>
      <p>
        In economy.id Place of Work Data is used to identify the employment locations of people working in each industry
        sector in the local area. The data is presented in thematic maps by destination zone for each industry sector.
      </p>
      <SubTitleAlt>Australian Bureau of Statistics Journey to work data</SubTitleAlt>
      <p>
        Understanding the relationship between where people live and where they work is important for understanding what
        labour resources an economy draws upon. Journey to Work data is created by cross tabulating a person's main
        workplace address (Place of Work Data) with their place of usual residence to create a matrix of home to work.
      </p>
      <p>In economy.id Journey to Work data is used to answer the following questions: </p>
      <TopOrderedList>
        <li>
          Where do the workers come from? This provides the basis for determining the region from which the local area
          draws its labour resources.{' '}
        </li>
        <li>
          Where do our residents work? This provides the basis for understanding the level of employment
          self-containment in a local area. Self containment is expressed as the proportion of people who work locally
          that reside locally.{' '}
        </li>
      </TopOrderedList>
      <p>
        The data is available by industry to enable these questions to be answered for each industry sector in the
        economy. The data is presented at the LGA level. This information is generally not available at the small area
        (suburb / locality) level due to geographic limitations when being coded or processed.
      </p>
      <SubTitleAlt>Australian Bureau of Statistics Business Register </SubTitleAlt>
      <p>
        The ABS Business Register is extracted from the Australian Business Register maintained by the ATO. It is a
        count of businesses with an Australian Business Number (ABN) on the Australian Business Register that are
        actively registered for GST (i.e. actively trading).
      </p>
      <p>The ABS Business Register does not include:</p>
      <TopList>
        <li>
          entities without an ABN - mainly individuals whose business activities fall under the threshold for GST
          compliance and whose taxation obligations can be satisfied under the Personal Income Tax System
        </li>
        <li>
          ABNs without a GST role – mainly businesses with turnover $50,000pa, not-for-profit institutions with turnover
          of $100,000 or entities whose activities does not involve trading in goods or services (eg investment
          vehicles){' '}
        </li>
        <li>Businesses that have ceased trading - no longer actively remitting GST obligations</li>
        <li>Establishment of new locations associated with an existing business</li>
        <li>
          Entities not considered to be actively trading in the market sector, including:
          <TopList>
            <li>Central Bank</li>
            <li>
              General Government – this particularly affects data for Education and Health and Community Services and
              means that institutions such as public universities, public schools, public hospitals and other public
              education and health organisations are not included in this data.{' '}
            </li>
            <li>Non-Profit Institutions Serving Households</li>
            <li>Charitable Institution</li>
            <li>Social and Sporting Clubs</li>
            <li>Trade Unions and Other Associations</li>
            <li>Other Unincorporated Entity</li>
            <li>Diplomatic or Trade Missions, Other Foreign Government</li>
            <li>Private Households Employing Staff</li>
          </TopList>
        </li>
      </TopList>
      <p>The ABS Business Register does include:</p>
      <TopList>
        <li>employing and non-employing businesses</li>
        <li>Single location and multiple location businesses</li>
        <li>
          Entities with complex business structure - the business is assessed and broken up into Type of Activity Units
          (TAUs). The statistical unit referred to as a "business" thus consists of ABNs and TAUs{' '}
        </li>
      </TopList>
      <p>
        Detailed information about this data set, including summary findings from the national dataset by industry
        sector, can be found on the Source: Australian Bureau of Statistics.{' '}
        {LinkBuilder('http://www.abs.gov.au/', 'ABS website')}.
      </p>
      <p>
        The ABS Business Register is published annually and economy.id incorporates the latest release of this data
        which is a snapshot as at 1 June 2011. It presents the number of businesses in each industry sector in the local
        area by turnover and number of employees. This data should not be used in time series due to changes in scope
        and methodology.
      </p>
      <SubTitleAlt>Performance indicators </SubTitleAlt>
      <p>A number of data sets are used to provide performance indicators for the local economy. These include:</p>
      <TopList>
        <li>ABS National Accounts data for presenting Gross Domestic and Gross State Product </li>
        <li>NIEIReconomic modeling and analysis system to present Gross Local Product </li>
        <li>ABS Labour Force Survey to present the National and State unemployment rate </li>
        <li>
          Department of Education, Employment and Workplace Relations Small Area Labour Markets data set to present
          local unemployment figures{' '}
        </li>
        <li>ABS Building Approvals </li>
        <li>ABS Estimated Resident Population (ERP) </li>
        <li>ABS Consumer Price Index </li>
        <li>ABS Retail Business Survey</li>
      </TopList>
      <p>For more details about each of these data sets refer to the specific table notes for each indicator.</p>
    </>
  );
};

export default DataSourcesPage;
