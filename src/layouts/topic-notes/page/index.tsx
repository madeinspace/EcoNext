// #region imports
import { ClientContext, PageContext } from '../../../utils/context';
import { useContext } from 'react';
import { SubTitleAlt, TopList, TopOrderedList, ItemWrapper } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import styled from 'styled-components';
import { LinkBuilder } from '../../../components/ui/links';

// #endregion

const TopicNotesPage = () => {
  const { isLite, clientAlias } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  const Lite = styled.div``;
  const Full = styled.div`
    display: ${isLite ? 'none' : 'block'};
  `;
  return (
    <>
      <Lite>
        <a id="indicators---estimate-resident-population"></a>
        <SubTitleAlt>Indicators - Estimate Resident Population</SubTitleAlt>
        <p>
          Populations are counted and estimated in various ways. The most comprehensive population count available in
          Australia is derived from the Population and Household Census conducted by the Australian Bureau of Statistics
          every 5 years.
        </p>
        <p>
          However the Census count is not the official population of an area. To provide a more accurate population
          figure which is updated more frequently than every 5 years, the Australian Bureau of Statistics also produces
          "Estimated Resident Population" (ERP) numbers. Based on population estimates as at 30 June, ERPs take into
          account people who missed the count on Census night, including people who were temporarily overseas, plus an
          undercount adjustment for those who did not complete a Census form, and an overcount adjustment for anyone who
          was double counted.
        </p>
        <p>
          Estimated Resident Population figures are updated annually taking into account births, deaths, internal and
          overseas migration. In addition, after every Census, ERP figures for the five previous years are "backcast",
          using information from the current Census, to ensure the most accurate figures are available.{' '}
        </p>
      </Lite>
      <Lite>
        <a id="indicators---gross-regional-product-(grp)"></a>
        <SubTitleAlt>Indicators - Gross Regional Product (GRP)</SubTitleAlt>
        <p>
          For the local area this information is synthesized by National Economics using a range of data sources
          (including ABS labour force survey, tax office and Centrelink datasets) to produce an estimate of the Gross
          Regional Product of the local economy. GRP is the equivalent of GDP at the local level for a Local Government
          Area or region, and the calculation method simulates that used for the nation, but is influenced by local
          characteristics such as types of employment and worker productivity. For more information see{' '}
          {LinkBuilder('http://www.nieir.com.au/', 'National Institute of Economic and Industry Research (NIEIR)')}
        </p>
        <p>
          To enable direct comparison between areas of varying size (eg. local, state, national), each year of data is
          divided by the base reference year and multiplied by 100 so that all areas are compared on the same scale. The
          actual size of the economy, and growth is shown in the box at the left. All data are expressed in constant
          dollar terms for the reference year (shown on the chart).
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Lite>
      <Full>
        <a id="industry-composition"></a>
        <SubTitleAlt>Industry composition</SubTitleAlt>
        <TopList>
          <li>
            Household services include: Accommodation and Food Services; Education and Training; Health Care and Social
            Assistance; Arts and Recreation Services; and Other.
          </li>
          <li>
            Business services include: Information Media and Telecommunications; Financial and Insurance Services;
            Rental, Hiring and Real Estate Services; Professional, Scientific and Technical Services; and Administrative
            and Support Services.
          </li>
          <li>
            Goods related include: Manufacturing: Electricity, Gas, Water and Waste Services; Construction; Wholesale
            Trade; Retail Trade; and Transport, Postal and Warehousing.
          </li>
        </TopList>
        <p>
          Industry composition is calculated on Employment (Total) figures, please refer to{' '}
          {LinkBuilder(`http://economy.id.com.au/${clientAlias}/topic-notes?#fte-employment-by-industry`, 'this link')}
          for more information.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Lite>
        <a id="indicators---unemployment"></a>
        <SubTitleAlt>Indicators - Unemployment</SubTitleAlt>
        <p>
          Please note that the local unemployment data are sourced from Small Area Labour Markets, a quarterly
          publication by the Department of Employment and Workplace Relations. State and National figures are sourced
          from the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/6202.0`,
            'ABS Labour Force Survey (Catalogue number 6202.0)',
          )}
          . The Department of Employment data uses the labour force survey as a base and models it to local level using
          Centrelink data. Local unemployment is updated quarterly in this collection, and while state and national
          figures are available monthly, these are also updated on the site quarterly to match the time period of the
          local numbers. These benchmark figures are those widely published by government and media sites but are not
          directly comparable to the LGA estimates as they are not annual averages. For comparison purposes, LGA
          estimates should be compared with data in Table 16b of the publication{' '}
          {LinkBuilder(
            `https://www.abs.gov.au/ausstats/abs@.nsf/mf/6291.0.55.001`,
            'ABS Labour Force, Detailed - Electronic Delivery publication (catalogue number 6291.0.55.001)',
          )}
          which presents 12-month averages of the benchmark regions.
        </p>
        <p>
          All labour force data are subject to sampling error, as they are derived from a sample survey of approximately
          29,000 dwellings nationwide.
        </p>
        <p>All labour force data relate to the civilian population aged 15 years and over.</p>
        <p>
          The definition of unemployment used is the standard ABS and international definition - Unemployed persons are
          defined as all persons aged 15 years and over who were not employed during the reference week, and either had
          actively looked for full-time or part-time work at any time in the four weeks up to the end of the reference
          week and were available for work in the reference week, or were waiting to start a new job within four weeks
          from the end of the reference week and could have started in the reference week if the job had been available
          then.
        </p>
        <p>
          Employed persons are those aged 15 years or over who, during the survey reference week, worked for one hour or
          more for pay, profit or payment in kind in a job or business, or on a farm; or worked for one hour or more
          without pay in a family business or on a farm; or who had a job but were not at work for a number of specified
          reasons; or were employers or self-employed persons who had a job, business or farm, but were not at work.
        </p>
      </Lite>
      <Lite>
        <a id="indicators---building-approvals"></a>
        <SubTitleAlt>Indicators - Building approvals</SubTitleAlt>
        <p>
          Value of building approval data are sourced from the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/8731.0`,
            'Australian Bureau of Statistics, Catalogue number 8731.0 – Building Approvals',
          )}
          , Australia. This is a monthly publication, with the data here presented quarterly. Data may be revised up to
          a year after publication.{' '}
        </p>
        <p>
          The value of approval data includes all approved residential building valued at $10,000 or more and all
          approved non-residential building valued at $50,000 or more. Value of building work excludes the value of
          land, and also excludes landscaping, but includes site preparation costs. Both new dwellings and alterations
          and additions to existing dwellings are included in the residential approvals.
        </p>
        <p>
          Data presented here are the "Original" series, which has not been seasonally adjusted or smoothed to remove
          anomalies. Seasonal adjustment is not available at a local level, so for comparison purposes the state and
          national figures shown here are also "Original". Seasonally adjusted and trend figures are more often reported
          on a national basis by the ABS and the media, so for this reason, the figures shown here may not match those
          often reported.
        </p>
      </Lite>
      <Lite>
        <a id="indicators---retail-trade"></a>
        <SubTitleAlt>Indicators - Retail trade</SubTitleAlt>
        <p>
          <strong> (not available for local area)</strong>
        </p>
        <p>
          Retail Trade trends are based on estimates of turnover compiled from the monthly Retail Business Survey (RBS)
          undertaken by the ABS. It estimates of the value of turnover of retail businesses classified by industry, and
          by state and territory. It is not available for local areas. See{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/8501.0`, 'ABS Retail Trade catalogue number 8501.0')}
          for more details.
        </p>
        <p>
          Data source: Australian Bureau of Statistics.{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/8501.0`, 'ABS Retail Trade catalogue number 8501.0')}
          , (catalogue number 8501.0)
        </p>
      </Lite>
      <Lite>
        <a id="indicators---consumer-price-index-(cpi)"></a>
        <SubTitleAlt>Indicators - Consumer Price Index (CPI)</SubTitleAlt>
        <p>
          <strong> (not available for local area)</strong>
        </p>
        <p>
          The Consumer Price Index (CPI) measures quarterly changes in the price of a 'basket' of goods and services
          which account for a high proportion of expenditure by the CPI population group (i.e. metropolitan households).
          This 'basket' covers a wide range of goods and services, arranged in the following eleven groups:
        </p>
        <TopList>
          <li>Food</li>
          <li>Alcohol and tobacco</li>
          <li>Clothing and footwear</li>
          <li>Housing</li>
          <li>Household contents and services</li>
          <li>Health</li>
          <li>Transportation</li>
          <li>Communication</li>
          <li>Recreation</li>
          <li>Education</li>
          <li>Financial and insurance services.</li>
        </TopList>
        <p>
          The Consumer Price Index is measured for Greater Capital City regions only, so the state capital is used as a
          proxy for the whole state, and the Australia-wide index is correctly termed as the "Weighted average of eight
          capital cities".
        </p>
        <p>
          CPI is an index designed to measure change over time. See{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/6401.0`,
            'ABS Consumer Price Index, (catalogue number 6401.0)',
          )}
          for more details.
        </p>
        <p>
          Data source: Australian Bureau of Statistics,{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/6401.0`, 'Consumer Price Index')}, (catalogue number
          6401.0)
        </p>
      </Lite>
      <Full>
        <a id="gross-regional-product-(grp)"></a>
        <SubTitleAlt>Gross Regional Product (GRP)</SubTitleAlt>
        <p>
          Headline Gross Regional Product is the sum of all industries' estimated{' '}
          {LinkBuilder(`http://economy.id.com.au/${clientAlias}/value-add-by-industry`, 'value added')}, plus a factor
          for ownership of dwellings. The value of accommodation is a part of the economy, but it is not part of any
          industry, so it is included separately. Ownership of dwellings includes actual rents received by landlords,
          and imputed rents representing the ongoing value of owner-occupied housing.
        </p>
        <p>
          Local GRP gives the value of economic activity which accrues to the local area after taxes and dividends are
          paid outside the area. It is normally lower than Headline GRP as it does not reflect those elements of
          economic productivity which accrue to public company shareholders and the federal government outside the area.
        </p>
        <p>
          Comparing headline GRP to local GRP is a good way to see whether the economy in the area mainly comprises
          local businesses or large, multinational companies, and whether this is changing.
        </p>
        <p>
          Residents GRP is the economic value-added generated by the residents of the area, regardless of where they
          work. Residents GRP is best thought of as the income received by people in the LGA. Areas with a high
          Residents GRP and low Local GRP probably export most of their residents (or at least their higher value
          workers) to jobs elsewhere, while areas with a high Local GRP and low Residents GRP mainly import their
          workers, or higher value work.{' '}
        </p>
        <p>
          Local GRP per worker is derived by dividing the Local GRP by the estimate of the number of employed persons in
          the LGA in the relevant time period. This in turn is derived from the ABS Labour Force survey and State
          Accounts data.
        </p>
        <p>
          This dataset forms part of the National Economics microsimulation model of the local economy, updated
          annually, and derived from ABS, ATO, Centrelink and other economic datasets.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="employment-by-industry-(total)"></a>
        <SubTitleAlt>Employment by industry (Total)</SubTitleAlt>
        <p>
          Employment data presented here are estimates based on National Economics modelling from a number of sources.
          They are NOT Census figures, and should not be directly compared to the employment numbers in the "Worker
          Profiles" section of economy.id. They are a more accurate and up-to-date estimate of employment in the LGA
          than the Census figures, and give a clear idea of the employment breakdown by industry, however it is not
          possible to derive the range of worker characteristics from them that are available in Census data, so both
          modelled and Census data on employment are presented as part of economy.id.
        </p>
        <p>The estimates from NIEIR will generally be higher than the Census figures because they adjust for:</p>
        <TopOrderedList>
          <li>Persons missed by the Census</li>
          <li>Persons who didn't state their employment status or place of work</li>
          <li>Persons who reported no fixed place of work</li>
          <li>Persons whose place of work was not a valid address which could be coded by the ABS.</li>
        </TopOrderedList>
        <p>
          <strong>Derivation:</strong>In general, the Census understates employment by 15-20%, including about 12.5% of
          known working population in the Census who could not be coded to a valid workplace.{' '}
        </p>
        <p>
          Estimates of employment by industry from ATO income tax returns are used by postcode of residence and are
          converted to LGA of residence. Tax data is used because it is more timely and accurate than Census income
          data.
        </p>
        <p>
          The Census undercount listed above is identified and allocated to workplace locations in accordance with the
          distribution for similar industry types of residents of the LGA who nominated a workplace. The results are
          then adjusted on a quarterly basis by employment results in the ABS Labour Force Survey. Estimates are also
          checked against commercial and industrial floorspace completion rates by location and industry in intercensal
          years.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <b>Location Quotient:</b>The location quotient is a simple way of seeing which are the main industries in an
          area, relative to the wider region. It is similar to benchmarking, but in this case the percentage of the
          local economy (total employment, FTE or value-added) in a particular industry is divided by the percentage of
          the wider area (region, state, nation) that this industry makes up. A LQ of 1 indicates that the industry is
          about as prevalent in the local area as in the wider area. A LQ of greater than 1.2 indicates a significant
          specialisation of the industry, and an LQ of greater than 2 indicates a major specialisation. An LQ well under
          1 indicates an industry which is more important in the region than the local area.
        </p>
        <p>
          Location quotient is an optional way to display some datasets on economy.id. It can be chosen from the control
          panel.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="employment-by-industry-(fte)"></a>
        <SubTitleAlt>Employment by industry (FTE)</SubTitleAlt>
        <p>
          Full-Time Equivalent employment is actually a representation of Hours Worked estimates from the National
          Economics modelling. It is considered an easier way to look at the aggregate hours worked data, which
          generally involves much larger numbers.
        </p>
        <p>
          FTE employment is simply aggregate hours worked divided by 38 hours per week, as an estimate of the average
          full-time worker hours. Note that this means that workers doing more hours than this count in the data as more
          than one FTE job.
        </p>
        <p>
          The starting point for estimating hours worked is the estimation of hours and dollars per hour reported at the
          1-digit ANZSIC level for States and Territories from the ABS Labour Force Bulletin, which is updated
          quarterly. These are reconciled to the wages and salaries and mixed income series in the ABS Annual State
          Accounts, converted to $/hour by estimates of total hours worked by industry from the Labour Force Bulletin.
          The dataset is a smoothed 7 quarter moving average.
        </p>
        <p>
          Hours of work by industry and dollars per hour by place of work were estimated using the Census journey to
          work matrix, adjusted for the net undercount, as described in more detail in the Employment data notes.
        </p>
        <p>
          The NIEIR modelling uses the ABS Labour Force Survey and ATO data to estimate the number of hours worked in
          each industry in a given quarter. This is divided by 38 hours per week (representing a full-time week) to get
          the Full-Time Equivalent employment
        </p>
        <p>
          As some industries have very high hours of work per individual, in these cases FTE employment can actually be
          higher than total employment. This is often the case in the Agriculture, Forestry and Fishing industry.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <b>Location Quotient:</b>The location quotient is a simple way of seeing which are the main industries in an
          area, relative to the wider region. It is similar to benchmarking, but in this case the percentage of the
          local economy (total employment, FTE or value-added) in a particular industry is divided by the percentage of
          the wider area (region, state, nation) that this industry makes up. A LQ of 1 indicates that the industry is
          about as prevalent in the local area as in the wider area. A LQ of greater than 1.2 indicates a significant
          specialisation of the industry, and an LQ of greater than 2 indicates a major specialisation. An LQ well under
          1 indicates an industry which is more important in the region than the local area.
        </p>
        <p>
          Location quotient is an optional way to display some datasets on economy.id. It can be chosen from the control
          panel.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Lite>
        <a id="employment-by-industry-(census)"></a>
        <SubTitleAlt>Employment by industry (Census)</SubTitleAlt>
        <p>
          Employment data is sourced from the ABS Census, 2016 and 2011. It is the total number of persons employed in
          an industry sector, within the local area. It is based on the ABS coding of workplace addresses, not on
          residential location. This dataset should NOT be compared with National Economics modelled datasets on the
          number of workers, which are a more accurate representation and updated every year. Census counts of
          employment are useful because they can break down to a more detailed level of industry classification than the
          modelled dataset, and can also present various demographic characteristics of the workers. However it needs to
          be remembered that they are an undercount of the true employment and exclude:
        </p>
        <TopOrderedList>
          <li>People who didn't state their employment status</li>
          <li>People who were entirely missed in the Census</li>
          <li>People who had no fixed place of work</li>
        </TopOrderedList>
        <p>
          Based on these differences, in most cases, the Census place of work figures are around a 10-15% undercount
          compared to NIEIR modelling. Modelling also includes Construction workforce on a different basis, where
          workers are allocated to the location of the construction activity, rather than the address of the company.
          Note that in the 2016 Census, people who did not state their place of work were "Imputed' to a place of work.
          So the total undercount should be less than in previous Censuses, but it is still subject to overall Census
          undercount, and people who stated no fixed place of work.
        </p>
        <p>
          This table presents information at the ANZSIC 1-digit (division) level, with sub-categories available at the
          3-digit (group) level. A total of 293 industry categories are available at this level, by clicking on the
          table entries, or exporting the full version of the table. Only division level data appear in the charts.
        </p>
      </Lite>
      <Lite>
        <a id="residential-location-of-workers"></a>
        <SubTitleAlt>Residential location of workers</SubTitleAlt>
        <p>
          This dataset is known as Journey to Work, and is derived from Census question 41 – "For the main job held last
          week, what was the person's workplace address?" With residential address also known, Journey to Work comprises
          a matrix linking origin (residence) and work destination.{' '}
        </p>
        <p>
          The data presented here in table form show the Statistical Local Area of residence for employed persons who
          work within City of Belmont. The map shows the spatial distribution of these workers.{' '}
        </p>
        <p>
          Please note that the workforce in a Local Government Area calculated from Census data is generally considered
          to be an undercount, due to the number of people whose workplace address was not stated, could not be
          accurately coded, or stated a non-permanent workplace address ('no fixed place of work'). These people appear
          in the employment data at their residential location but cannot be coded to a work destination.{' '}
        </p>
        <p>
          <b>
            In 2011, a record number (over 1 million or 10% of employed persons) have been coded to an undefined work
            destination which cannot be mapped, and so these are excluded from the working population. For this reason
            some LGAs may notice an apparent drop in their Census-based workforce numbers between 2006 and 2011. While
            only 2011 data are presented here, this is most likely the reason
          </b>
          .
        </p>
        <p>
          If comparing work destination information with Method of Travel to work, please note the differing time
          periods – Workplace address relates to the week prior to Census, while Method of Travel relates to the morning
          of Census day. This has a negligible effect on the total counts but can explain some of the small numbers of
          strange LGA-LGA pairings which crop up such as people appearing to travel interstate to work. Some of these
          may be genuinely Fly-in/Fly-out workers (likely if the work destination is a known mining area), but others
          may have moved address in the differing timeframes assessed by the two questions.
        </p>
      </Lite>
      <Lite>
        <a id="work-location-of-residents"></a>
        <SubTitleAlt>Work location of residents</SubTitleAlt>
        <p>
          This dataset is known as Journey to Work, and is derived from Census question 41 – "For the main job held last
          week, what was the person's workplace address?" With residential address also known, Journey to Work comprises
          a matrix linking origin (residence) and work destination.{' '}
        </p>
        <p>
          The data presented here in table form show the Statistical Local Area of work destination for employed persons
          who live within City of Belmont. The map shows the spatial distribution of where these residents work.{' '}
        </p>
        <p>
          Please note that not all employed persons can be accurately coded to a workplace address. In 2011, a record
          number (over 1 million or 10% of employed persons) have been coded to an undefined work destination. These
          undefined locations are broken down by state, and shown in the table, but they cannot be mapped, as there is
          no information on the geographic location of work apart from their state.{' '}
        </p>
        <p>
          For this reason, there may be difficulty comparing 2011 work destination data to 2006, and only 2011 data are
          presented here. This very large increase in undefined workplace location is believed to be due to the change
          to the new geography standard (ASGS), and the inefficient coding mechanisms used to code to it.{' '}
        </p>
        <p>
          If comparing work destination information with Method of Travel to work, please note the differing time
          periods – Workplace address relates to the week prior to Census, while Method of Travel relates to the morning
          of Census day. This has a negligible effect on the total counts but can explain some of the small numbers of
          strange LGA-LGA pairings which crop up such as people appearing to travel interstate to work. Some of these
          may be genuinely Fly-in/Fly-out workers (likely if the work destination is a known mining area), but others
          may have moved address in the differing timeframes assessed by the two questions.{' '}
        </p>
        <p>
          For more information please refer to the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/websitedbs/censushome.nsf/home/statementspersonpowp?opendocument&navpos=430`,
            'data quality statement for Place of Work',
          )}
          on the ABS website.{' '}
        </p>
      </Lite>
      <Full>
        <a id="value-added-by-industry"></a>
        <SubTitleAlt>Value added by industry</SubTitleAlt>
        <p>
          Value added is the value of sales generated by each industry, minus the cost of its inputs. Estimates are
          modelled using the NIEIR methodology, and presented in constant dollars (adjusted for inflation). It is
          calculated by subtracting the cost of industry inputs from total sales generated.
        </p>
        <p>
          The total of all industry value added is summed to produce Gross Regional Product figures, which also include
          an estimate for the ongoing value of ownership of dwellings in the area.
        </p>
        <p>
          Value added data are derived from ABS State Accounts, distributed among regions by industry according to
          estimates of industry value added, Census and ABS Labour Force based employment and industry earnings data
          from the Australian Taxation Office. An estimate of labour productivity is derived from ATO data from each
          region and applied to local workers for the industry .
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <b>Location Quotient:</b>The location quotient is a simple way of seeing which are the main industries in an
          area, relative to the wider region. It is similar to benchmarking, but in this case the percentage of the
          local economy (total employment, FTE or value added) in a particular industry is divided by the percentage of
          the wider area (region, state, nation) that this industry makes up. A LQ of 1 indicates that the industry is
          about as prevalent in the local area as in the wider area. A LQ of greater than 1.2 indicates a significant
          specialisation of the industry, and an LQ of greater than 2 indicates a major specialisation. An LQ well under
          1 indicates an industry which is more important in the region than the local area.
        </p>
        <p>
          Location quotient is an optional way to display some datasets on economy.id. It can be chosen from the control
          panel.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
        <a id="output"></a>
        <SubTitleAlt>Output</SubTitleAlt>
        <p>
          Output is the gross sales of an industry, which includes the cost of inputs to that industry. To the extent
          that outputs from one industry are used as inputs to another, the economic productivity of an industry may be
          counted multiple times in output, which is why output totals generally appear much higher than value add or
          GRP.
        </p>
        <p>
          Output data are derived from ABS State Accounts, distributed among regions by industry according to estimates
          of industry value-added, Census and ABS Labour Force based employment and industry earnings data from the
          Australian Taxation Office. An estimate of labour productivity is derived from ATO data from each region and
          applied to to local workers for the industry.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <b>Location Quotient:</b>The location quotient is a simple way of seeing which are the main industries in an
          area, relative to the wider region. It is similar to benchmarking, but in this case the percentage of the
          local economy (total employment, FTE or value-added) in a particular industry is divided by the percentage of
          the wider area (region, state, nation) that this industry makes up. A LQ of 1 indicates that the industry is
          about as prevalent in the local area as in the wider area. A LQ of greater than 1.2 indicates a significant
          specialisation of the industry, and an LQ of greater than 2 indicates a major specialisation. An LQ well under
          1 indicates an industry which is more important in the region than the local area.
        </p>
        <p>
          Location quotient is an optional way to display some datasets on economy.id. It can be chosen from the control
          panel.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="local-sales"></a>
        <SubTitleAlt>Local sales</SubTitleAlt>
        <p>
          Local sales includes the gross economic output (sales) which are purchased by local consumers, businesses and
          government. Local sales is equal to total output minus total exports.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        {' '}
        <a id="domestic-exports"></a>
        <SubTitleAlt>Domestic exports</SubTitleAlt>
        <p>
          Exports are sales of goods and services to non-resident households, businesses and other organisations,
          outside the LGA boundaries. These sales include both local value added and the value of inputs, i.e. they are
          equivalent in magnitude to total sales, not just value added. Exports (domestic) includes all exports from the
          LGA or region to other parts of Australia.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        {' '}
        <a id="international-exports"></a>
        <SubTitleAlt>International exports</SubTitleAlt>
        <p>
          Exports are sales of goods and services to non-resident households, businesses and other organisations,
          outside the LGA boundaries. These sales include both local value added and the value of inputs, i.e. they are
          equivalent in magnitude to total sales, not just value added. Exports (international) includes all exports
          from the LGA or region to countries outside Australia.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="domestic-imports"></a>
        <SubTitleAlt>Domestic imports</SubTitleAlt>
        <p>
          Imports are purchases of goods and services from industries located outside the LGA boundaries, for use in the
          production function of that industry. Domestic imports are those which originate from other areas within
          Australia.
        </p>
        <p>
          Imports of goods for direct on-sale is not included in the imports figure if they are not used directly in the
          goods and service production of that industry. Eg. Retail Trade is a service industry whose production is
          based on selling goods to consumers. The value of the goods themselves is not included in the imports total,
          only the value of goods and services used in providing this service – e.g. an accounting service, inventory
          management software, shop furnishings etc.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="imports"></a>
        <SubTitleAlt>Imports</SubTitleAlt>
        <p>
          Imports are purchases of goods and services from industries located outside the LGA boundaries, for use in the
          production function of that industry. International imports are those originating outside Australia.
        </p>
        <p>
          Imports of goods for direct on-sale is not included in the imports figure if they are not used directly in the
          goods and service production of that industry. Eg. Retail Trade is a service industry whose production is
          based on selling goods to consumers. The value of the goods themselves is not included in the imports total,
          only the value of goods and services used in providing this service – e.g. an accounting service, inventory
          management software, shop furnishings etc.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="international-imports"></a>
        <SubTitleAlt>International imports</SubTitleAlt>
        <p>
          Imports are purchases of goods and services from industries located outside the LGA boundaries, for use in the
          production function of that industry. International imports are those originating outside Australia.
        </p>
        <p>
          Imports of goods for direct on-sale is not included in the imports figure if they are not used directly in the
          goods and service production of that industry. Eg. Retail Trade is a service industry whose production is
          based on selling goods to consumers. The value of the goods themselves is not included in the imports total,
          only the value of goods and services used in providing this service – e.g. an accounting service, inventory
          management software, shop furnishings etc.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="worker-productivity"></a>
        <SubTitleAlt>Worker productivity</SubTitleAlt>
        <p>
          Worker productivity is calculated by dividing the industry value added by the average (mean) number of persons
          employed over the four quarters of the financial year. Regional differences in the worker productivity are
          inherent in the model, which is based on income tax return information from the ATO, relativities between
          industries calculated from Census data, and labour force survey information updated annually.
        </p>
        <p>
          High worker productivity figures mean that fewer workers in that industry may produce a greater output. Mining
          and financial services industries tend to have high worker productivity figures. Please note that worker
          productivity figures will be generated if you have at least one worker in that industry in your area. Some
          areas may have very low numbers of workers in particular sectors, and therefore have highly variable worker
          productivity in those sectors. While the figures can give a guide as to which sectors could add the most value
          to the economy if grown, care should be taken in interpreting the figures for industries with very low current
          numbers of workers.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="worker-productivity-per-hour"></a>
        <SubTitleAlt>Worker productivity per hour</SubTitleAlt>
        <p>
          Worker productivity per hour is calculated by dividing the total value added in an industry by the total
          number of hours worked over the four quarters of the financial year. Regional differences in the worker
          productivity are inherent in the model, which is based on income tax return information from the ATO,
          relativities between industries calculated from Census data, and labour force survey information updated
          annually.
        </p>
        <p>
          High worker productivity figures mean that fewer workers in that industry may produce a greater output. Mining
          and financial services industries tend to have high worker productivity figures. Please note that worker
          productivity figures will be generated if you have at least one worker in that industry in your area. Some
          areas may have very low numbers of workers in particular sectors, and therefore have highly variable worker
          productivity in those sectors. While the figures can give a guide as to which sectors could add the most value
          to the economy if grown, care should be taken in interpreting the figures for industries with very low current
          numbers of workers.
        </p>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="business-by-industry"></a>
        <SubTitleAlt>Business by industry</SubTitleAlt>
        <p>
          The ABS Business Register is extracted from the Australian Business Register maintained by the ATO. It is a
          count of businesses with an Australian Business Number (ABN) on the Australian Business Register (i.e.
          actively trading).
        </p>
        <p>The ABS Business Register does not include:</p>
        <TopList>
          <li>
            entities without an ABN - mainly individuals whose business activities fall under the threshold for GST
            compliance and whose taxation obligations can be satisfied under the Personal Income Tax System
          </li>
          <li>
            ABNs without a GST role – mainly businesses with turnover &lt;$50,000pa, not-for-profit institutions with
            turnover of &lt;$100,000 or entities whose activities do not involve trading in goods or services (eg
            investment vehicles)
          </li>
          <li>Businesses that have ceased trading - no longer actively remitting GST obligations</li>
          <li>Establishment of new locations associated with an existing business</li>
          <li>Entities not considered to be actively trading in the market sector, including:</li>
          <TopList>
            <li>Central Bank</li>
            <li>
              General Government – this particularly affects data for Education and Health and Community Services and
              means that institutions such as public universities, public schools, public hospitals and other public
              education and health organisations are not included in this data.
            </li>
          </TopList>
          <li>Non-Profit Institutions Serving Households</li>
          <li>Charitable Institution</li>
          <li>Social and Sporting Clubs</li>
          <li>Trade Unions and Other Associations</li>
          <li>Other Unincorporated Entity</li>
          <li>Diplomatic or Trade Missions, Other Foreign Government</li>
          <li>Private Households Employing Staff</li>
        </TopList>
        <p>The ABS Business Register does include:</p>
        <TopList>
          <li>employing and non-employing businesses</li>
          <li>Single location and multiple location businesses</li>
          <li>
            Entities with complex business structure - the business is assessed and broken up into Type of Activity
            Units (TAUs). The statistical unit referred to as a "business" thus consists of ABNs and TAUs
          </li>
        </TopList>
        <p>
          Detailed information about this data set, including summary findings from the national dataset by industry
          sector, can be found in{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/8165.0`,
            'Counts of Australian Businesses, including Entries and Exits',
          )}
          .
        </p>
        <p>
          The ABS Business Register dataset is published annually and incorporates the latest release of this data which
          is a snapshot as at June 2017, with a time series comparison to June 2015 numbers.
        </p>
        <p>
          Data source:{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/8165.0`,
            'Australian Bureau of Statistics, Counts of Australian Businesses, including Entries and Exits, 2015 to 2017',
          )}
          Cat. No. 8165.0
        </p>
        <p>
          <em>IMPORTANT NOTE ABOUT GEOGRAPHIC AREAS:</em>Business Register counts are published by the ABS on SA2
          (Statistical Area level 2) boundaries, not Local Government Area boundaries. The data presented in economy.id
          aggregates SA2 level data to Local Government Areas. However, in some cases, SA2s do not align to LGA
          boundaries. Where an SA2 crosses an LGA boundary, an estimate has been made to apportion the businesses in an
          SA2 across two or more LGAs. The estimate is done on the basis of the proportion of commercial, industrial and
          agricultural land use falling on either side of a boundary but please be aware that this is an approximation
          only, and doesn’t take account of the differing distributions of different industry sectors, nor is it an
          accurate count of individual businesses on either side of a boundary. For this reason, the business counts
          used in economy.id may not be an exact match to counts sourced directly from the Australian Taxation Office.
          Some areas are more affected by this issue than others. For more information on whether your area is affected,
          please contact .id.
        </p>
      </Full>
      <Full>
        <a id="industry-sector-analysis"></a>
        <SubTitleAlt>Industry sector analysis</SubTitleAlt>
        <p>
          For detailed definitions of each of the parameters included in the table, please see the information box
          located to the left of the listed item.
        </p>
        <p>
          This section presents the characteristics of a single industry (1 or 2 digit) within the area, based on the
          NIEIR microsimulation modelling.
        </p>
        <p>
          Total employment, FTE employment, total output, value added, imports and exports are presented, both in raw
          number terms, and as a percentage of the same industry in the benchmark.
        </p>
        <p>
          The idea behind this section is to show all the key characteristics of an industry sector in one place, to
          show a comparison of the local or export focus of an industry compared to the benchmark, and to show what
          percentage of the regional benchmark an industry makes up, in terms of different parameters.
        </p>
        <p>
          Please note that Local Sales, Domestic Imports and Domestic Exports relate to the boundaries of the LGA – ie.
          Local Sales are those within the LGA, domestic exports are those going outside the LGA boundaries to other
          parts of Australia etc. For the benchmark area, these figures don’t relate to the boundaries of the state or
          region, but are best envisaged as the weighted average of the local sales, exports or imports for all LGAs in
          that state or region
        </p>
        <p>
          Value-added is the value of sales generated by each industry, minus the cost of its inputs. Estimates are
          modelled using the NIEIR methodology, and presented in constant dollars (adjusted for inflation). It is
          calculated by subtracting the cost of industry inputs from total sales generated.
        </p>
        <p>
          The total of all industry value-adds are summed to produce Gross Regional Product figures, which also include
          an estimate for the ongoing value of ownership of dwellings in the area.
        </p>
        <p>The inputs to the microsimulation model used to derive this dataset include:</p>
        <TopList>
          <li>ABS National and state accounts</li>
          <li>ABS Labour Force survey (employment) </li>
          <li>ATO earnings data by industry</li>
          <li>Building approvals by floorspace</li>
          <li>Dun &amp; Bradstreet business startup information. </li>
          <li>Centrelink employment estimates (for the most recent year). </li>
        </TopList>
        <p>
          Please note that these modelled estimates are subject to change. Estimates are reviewed when more recent and
          robust data becomes available, particularly when new National or State Accounts data are released by the ABS,
          or new tax office income data are released. Most recent financial year estimates are based on a combination of
          factors including Centrelink and Labour Force Survey data, which is replaced by ATO income data when it
          becomes available. As a result of this, revisions to the model for all years may be expected, and large
          revisions for the last two financial years are possible, when the new data are released each November, for the
          previous financial year. These revisions could change the statistical outcomes, so please treat the most
          recent years’ data with caution.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="employment-locations"></a>
        <SubTitleAlt>Employment locations</SubTitleAlt>
        <p>
          Work Destination Zones (DZNs) are defined by the Road Traffic Authority in each state (eg. Vicroads, Main
          Roads WA etc). Work destinations in the Census are coded to these zones as the lowest level datasets available
          for workers by place of work.
        </p>
        <p>
          The zones are defined with more detail in high employment areas, with the aim of being most useful for
          transport planning, particularly in areas where large numbers of people need to be moved from place of
          residence to place of work.
        </p>
        For this reason the size and density of zones vary enormously from place to place. For example, the CBD of
        Sydney might have a hundred or more separate zones, covering every street block. While a rural Local Government
        Area might all be covered by one or two destination zones. Generally in urban areas there are at least a few
        zones for each suburb, with more in major employment centres. In rural areas, there is usually at least a zone
        covering each small town, and one or more covering a large rural area.
        <p>The data presented here shows, by industry, the work destination of workers in by destination zone.</p>
        <p>
          Please note that a new, experimental dataset has been used for this section of economy.id. This dataset
          eliminates all "Not stated", "Zone undefined", and "Place of work undefined" categories in the Census, and
          allocates all workers to a zone. This is done by imputing records to a zone even where workers did not state
          an address. The methodology involves looking at the work destinations of similar combinations of detailed
          industry, occupation and method of travel and making an "educated guess" (via an algorithm) at the likely work
          locations of populations where the exact address couldn’t be coded from the response.
        </p>
        <p>
          This imputation was done by the ABS, in consultation with the Bureau of Transport Statistics, NSW (but the
          work was done for the whole country). For more information, please see the{' '}
          {LinkBuilder(
            `http://www.bts.nsw.gov.au/Statistics/Journey-to-Work/default.aspx?FolderID=217`,
            'Journey to Work methodology on the BTS page',
          )}
          .
        </p>
        <p>
          As this methodology has not been rolled out on the rest of the economy.id site at present, there will be some
          small differences between the calculation of percentages of total on the spatial economy page, and that which
          would be derived by using a total from one of the other Census worker population pages. There will also be
          differences due to the allocation of DZNs to local government areas. In some cases these zones cross LGA
          boundaries, and a best fit which encompasses all the major employment areas in has been used here.
        </p>
        <p>
          Value-added data is presented in millions of dollars ($m) and represents an approximation of the value of
          economic activity occurring within the boundaries of each destination zone. The estimate is based on
        </p>
        <TopList>
          <li>The imputed Census worker count within that zone.</li>
          <li>The worker productivity estimate per worker from the NIEIR modelled dataset.</li>
          <li>The distribution of industries within that zone.</li>
        </TopList>
        <p>
          Workers with no usual address don’t contribute directly to any one zone and so are excluded from this
          calculation, but they are included in overall worker numbers in the modelling and therefore in total value
          added. For this reason, and the fact that even imputed Census worker numbers don’t exactly match workers in
          the model, the sum of destination zone value-added will not equal the total value-added for the LGA, as found
          in the industry structure page.
        </p>
        <p>
          This dataset also makes the assumption that worker productivity in a particular industry sector is the same
          for workers in different parts of the LGA. This is a generalisation of reality. The calculation also doesn’t
          take into account the geographic interactions between zones which generate value as well.
        </p>
        <p>Please use the value-added estimates as a guide only.</p>
      </Full>
      <Full>
        <a id="business-locations"></a>
        <SubTitleAlt>Business locations</SubTitleAlt>
        <p>
          The Australian Business Register came into existence on 1 July 2000, as a method of GST registration. It has
          since then become an increasingly important source of statistical information about Australia's businesses, as
          every trading business with a turnover of $75,000 or more per year must register, with optional registration
          for smaller businesses.
        </p>
        <p>
          Individual ABN lookup is available to the public. Detailed unit record information is available for Local
          Government users in pursuit of legitimate local government activities. More information is available from the{' '}
          {LinkBuilder(
            `https://abr.gov.au/For-Government-agencies/Accessing-ABR-data/ABR-data-explained/ABR-data/`,
            'Australian Business Register',
          )}
          .
        </p>
        <p>
          This page on economy.id is only enabled where the client has given .id permission to extract the ABR
          information on behalf of the LGA. This is done on a quarterly basis, and a set of filters is applied.
        </p>
        <p>
          These filters take the very large list of all businesses which have ever been registered in the LGA and create
          a current set of businesses registered for GST. This dataset filters out all businesses which:
        </p>
        <TopList>
          <li>have ceased operation</li>
          <li>have no industry details available</li>
          <li>have never or are no longer registered for GST</li>
          <li>
            are in one of the "pseudo-business" categories, including Family Trusts, Self-Managed Superannuation Funds,
            Deceased Estates and Strata Title units. While these are legitimate entities to hold an ABN, they cannot be
            considered businesses which are relevant to economic development goals and are therefore excluded
          </li>
        </TopList>
        <p>
          Businesses not registered for GST are very small, often hobby businesses. Nevertheless they may be relevant to
          local government economic development. The sheer number of them, however, makes statistical analysis difficult
          and not very meaningful as these businesses are usually home-based with many individuals holding multiple
          ABNs. They show very little spatial pattern. So they are not suitable for presentation in the economy.id
          mapping component. However a list of these businesses (with the other categories filtered out) is available
          from .id, and can be provided to legitimate Local Government users who are registered with the ABR. Contact
          .id for more information.
        </p>
        <p>
          <b>Businesses with multiple locations</b>
        </p>
        <p>
          The ABR primarily codes the main business address of the registered entity. However, individual trading
          locations are now available. Where a secondary business address is listed, this is included in this dataset as
          a separate business. However this does not necessarily imply that all branches of a larger business are
          included. Their inclusion will depend whether they are registered with the ABR, which is not a requirement for
          additional business locations (eg. branch stores).
        </p>
        <p>
          <b>Comparison with ABS business register</b>
        </p>
        <p>
          The ABS business register data found is ultimately sourced from the same ABR dataset. .id's filtering
          methodology is intended to give a business count broadly similar to the ABS but there are some inherent
          differences. The ABS methodology is designed to provide a sample frame for business surveys. They collect
          employment and turnover information which is not in the raw ABR data. They also exclude public sector business
          entities such as schools and hospitals from the dataset, whereas it is included here. The ABS also examine
          each business to determine if it is actively trading, rather than relying purely on a categorical filter as is
          used here. .id's filtering mechanism may exclude some legitimate finance businesses which the ABS includes.
          For more information on the ABS Business Register dataset, please see the{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/8165.0`, 'ABS website')}.
        </p>
      </Full>
      <Full>
        <a id="workers-place-of-residence"></a>
        <SubTitleAlt>Workers place of residence</SubTitleAlt>
        <p>
          This dataset describes the place of usual residence of employed persons in the selected industry or
          occupation. Journey to Work data is created by cross tabulating a person’s main workplace address (Place of
          Work Data) with their place of usual residence to create a matrix of home to work.
        </p>
        <p>
          The dataset is presented at the Local Government Area (LGA) level. This information is generally not available
          at the small area (suburb/locality) level due to geographic limitations when being coded or processed.{' '}
        </p>
        <p>
          Also please note that the number of workers in this section is subject to Census undercount, and is generally
          less than that found in the modelled dataset from National Economics.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2016.
        </p>
      </Full>
      <Lite>
        <a id="residents-place-of-work"></a>
        <SubTitleAlt>Residents place of work</SubTitleAlt>
        <p>
          This data describes the work location (LGA/SLA) of employed residents of the local area in the selected
          industry or occupation. Journey to Work data is created by cross tabulating a person’s main workplace address
          (Place of Work Data) with their place of usual residence to create a matrix of home to work.
        </p>
        <p>
          The dataset is presented at the Statistical Local Area (SLA) level. SLAs are either whole LGAs or parts of
          LGAs and presenting the data at this level can show movements within the LGA for larger councils, as well as
          movement outside the LGA. This information is generally not available at the small area (suburb/locality)
          level due to geographic limitations when being coded or processed.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2016.
        </p>
      </Lite>
      <Full>
        <a id="jobs-to-workers-ratio"></a>
        <SubTitleAlt>Jobs to workers ratio</SubTitleAlt>
        <p>
          This dataset describes the residential location (LGA) of people who work in the local area. It differs from
          the main journey to work dataset in that it shows simply the number and proportion of workers in each broad
          occupation category who also live within the local area.
        </p>
        <p>
          Journey to Work data is created by cross tabulating a person’s main workplace address (Place of Work Data)
          with their place of usual residence to create a matrix of home to work. This information is generally not
          available at the small area (suburb/locality) level due to geographic limitations when being coded or
          processed.
        </p>
        <p>
          Self-sufficiency in economy.id is defined as the percentage of the local resident workers employed within the
          local LGA or region. The data presented here shows a time series, allowing the user to see whether the level
          of self-sufficiency in a particular industry has increased or decreased over time. The change over time is
          presented as a change in percentage rather than absolute number, so that self-sufficiency can be assessed
          independently from changes in the overall workforce in that industry.
        </p>
        <p>
          Please note that the quality of Journey to Work coding has varied from Census to Census. The 2011 coding was
          particularly poor, with a large percentage of employed people being coded to "Place of Work undefined"
          categories. As people in these categories do feature in the theoretical working population of any area, this
          can affect the comparison of self-sufficiency over time.
        </p>
        <p>
          <em>ALTERNATE DEFINITION:</em> Some state governments, for example, Western Australia, mandate a different
          (and equally valid) definition of self-sufficiency. This is the total number of jobs in the area divided by
          the total number of employed residents, regardless of where those residents work. This definition is
          equivalent in economy.id to our definition of "Employment Capacity', so Western Australian users looking for
          "self-sufficiency" should see this topic instead.{' '}
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2011 and 2006.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}.
        </p>
      </Full>
      <Full>
        <a id="self-containment--occupation"></a>
        <SubTitleAlt>Self-containment- Occupation</SubTitleAlt>
        <p>
          This dataset describes the work location (LGA) of employed residents of the local area. It differs from the
          main journey to work dataset in that it shows simply the number and proportion of residents in each broad
          occupation group who work within the local area and working outside it, rather than detailed destination
          information. Journey to Work data is created by cross-tabulating a person’s main workplace address (Place of
          Work Data) with their place of usual residence to create a matrix of home to work. This information is
          generally not available at the small area (suburb/locality) level due to geographic limitations when being
          coded or processed.
        </p>
        <p>
          {' '}
          Self-containment is defined in economy.id as the percentage of local resident workers who work within the
          local LGA or region.
        </p>
        <p>
          Please note that the quality of Journey to Work coding has varied from Census to Census. The 2011 coding was
          particularly poor, with a large percentage of employed people being coded to "Place of Work undefined" and
          "Not Stated" categories. The 2016 Census used a different methodology to impute workplace location where it
          was not provided by the respondent. For this reason, care should be taken when comparing 2016 to earlier years
          – when using raw 2011 data, there will be an apparent increase which may not reflect reality, but simply the
          coding methods. .id have sourced 2011 data which reduces this issue, but users should still be aware that
          these are different datasets with different methodologies.
        </p>
        <p>
          Even with this updated methodology, although you will find no workers with "Not stated" place of work, there
          are still some who genuinely have "No fixed place of work" but travel around to work. These are NOT regarded
          as self-contained and so don’t form part of the self-containment percentage. Even a fully self-contained
          economy would therefore not show 100% self-containment due to this category, which often numbers around 4-5%
          of all employed residents.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2011 and 2016.
        </p>
      </Full>
      <Full>
        <a id="self-containment---industry"></a>
        <SubTitleAlt>Self-containment - Industry</SubTitleAlt>
        <p>
          This dataset describes the work location (LGA) of employed residents of the local area. It differs from the
          main journey to work dataset in that it shows simply the number and proportion of residents working in each
          industry who work within the local area and working outside it, rather than detailed destination information.
          Journey to Work data is created by cross-tabulating a person’s main workplace address (Place of Work Data)
          with their place of usual residence to create a matrix of home to work. This information is generally not
          available at the small area (suburb/locality) level due to geographic limitations when being coded or
          processed.
        </p>
        <p>
          {' '}
          Self-containment is defined in economy.id as the percentage of local resident workers who work within the
          local LGA or region.
        </p>
        <p>
          Please note that the quality of Journey to Work coding has varied from Census to Census. The 2011 coding was
          particularly poor, with a large percentage of employed people being coded to "Place of Work undefined" and
          "Not Stated" categories. The 2016 Census used a different methodology to impute workplace location where it
          was not provided by the respondent. For this reason, care should be taken when comparing 2016 to earlier years
          – when using raw 2011 data, there will be an apparent increase which may not reflect reality, but simply the
          coding methods. .id have sourced 2011 data which reduces this issue, but users should still be aware that
          these are different datasets with different methodologies.
        </p>
        <p>
          Even with this updated methodology, although you will find no workers with "Not stated" place of work, there
          are still some who genuinely have "No fixed place of work" but travel around to work. These are NOT regarded
          as self-contained and so don’t form part of the self-containment percentage. Even a fully self-contained
          economy would therefore not show 100% self-containment due to this category, which often numbers around 4-5%
          of all employed residents.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2011 and 2016.
        </p>
      </Full>
      <Full>
        <a id="self-sufficiency---industry"></a>
        <SubTitleAlt>Self-sufficiency - Industry</SubTitleAlt>
        <p>
          This dataset describes the residential location (LGA) of people who work in the local area. It differs from
          the main journey to work dataset in that it shows simply the number and proportion of workers in each broad
          industry category who also live within the local area.
        </p>
        <p>
          Journey to Work data is created by cross-tabulating a person’s main workplace address (Place of Work Data)
          with their place of usual residence to create a matrix of home to work. This information is generally not
          available at the small area (suburb/locality) level due to geographic limitations when being coded or
          processed.
        </p>
        <p>
          Self-sufficiency in economy.id is defined as the percentage of the local workers employed in the area who also
          live within the local LGA or region.
        </p>
        <p>
          Please note that the quality of Journey to Work coding has varied from Census to Census. The 2011 coding was
          particularly poor, with a large percentage of employed people being coded to "Place of Work undefined" and
          “Not Stated” categories. The 2016 Census used a different methodology to impute workplace location where it
          was not provided by the respondent. For this reason, care should be taken when comparing 2016 to earlier years
          – when using raw 2011 data, there will be an apparent increase which may not reflect reality, but simply the
          coding methods. .id have sourced 2011 data which reduces this issue, but users should still be aware that
          these are different datasets with different methodologies.
        </p>
        <p>
          <i>ALTERNATE DEFINITION:</i> Some state governments, for example, Western Australia, mandate a different (and
          equally valid) definition of self-sufficiency. This is the total number of jobs in the area divided by the
          total number of employed residents, regardless of where those residents work. This definition is equivalent in
          economy.id to our definition of “Jobs to Workers ratio”, so Western Australian users looking for
          “self-sufficiency” should see this topic instead.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2011 and 2016.
        </p>
      </Full>
      <Full>
        <a id="self-sufficiency---occupation"></a>
        <SubTitleAlt>Self-sufficiency - Occupation</SubTitleAlt>
        <p>
          This dataset describes the residential location (LGA) of people who work in the local area. It differs from
          the main journey to work dataset in that it shows simply the number and proportion of workers in each broad
          occupation category who also live within the local area.
        </p>
        <p>
          Journey to Work data is created by cross-tabulating a person’s main workplace address (Place of Work Data)
          with their place of usual residence to create a matrix of home to work. This information is generally not
          available at the small area (suburb/locality) level due to geographic limitations when being coded or
          processed.
        </p>
        <p>
          Self-sufficiency in economy.id is defined as the percentage of the local workers employed in the area who also
          live within the local LGA or region.
        </p>
        <p>
          Please note that the quality of Journey to Work coding has varied from Census to Census. The 2011 coding was
          particularly poor, with a large percentage of employed people being coded to "Place of Work undefined" and
          "Not Stated" categories. The 2016 Census used a different methodology to impute workplace location where it
          was not provided by the respondent. For this reason, care should be taken when comparing 2016 to earlier years
          – when using raw 2011 data, there will be an apparent increase which may not reflect reality, but simply the
          coding methods. .id have sourced 2011 data which reduces this issue, but users should still be aware that
          these are different datasets with different methodologies.
        </p>
        <p>
          <i>ALTERNATE DEFINITION:</i> Some state governments, for example, Western Australia, mandate a different (and
          equally valid) definition of self-sufficiency. This is the total number of jobs in the area divided by the
          total number of employed residents, regardless of where those residents work. This definition is equivalent in
          economy.id to our definition of "Jobs to Workers ratio", so Western Australian users looking for
          "self-sufficiency' should see this topic instead.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Journey to work data
          2011 and 2016.
        </p>
      </Full>
      <Lite>
        <a id="local-workers--key-statistics"></a>
        <SubTitleAlt>Local workers- Key statistics</SubTitleAlt>
        <p>
          This data summarises the demographic characteristics of people employed in the selected industry division (or
          all industries). Includes all persons working in the area regardless of where they live. Some of the figures
          in the summary table are taken from other topics. For those which don’t appear elsewhere, the following notes
          apply:
        </p>
        <TopList>
          <li>Persons – people aged 15 and over who were employed in the week prior to Census</li>
          <li>Individual income – Median income is the midpoint of incomes for all employed people.</li>
        </TopList>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Census of Population
          and Housing 2006 and 2011.
        </p>
      </Lite>
      <Full>
        <a id="local-workers---age"></a>
        <SubTitleAlt>Local workers - Age</SubTitleAlt>
        <p>
          This dataset describes the age (by sex) of people employed in the selected industry (or all industries if
          selected). It includes all persons working in the area regardless of where they live.
        </p>
        <p>
          Employment is applicable to all persons over the age of 15. Generally, relatively few workers are over the
          traditional retirement age of 65, but some industries (eg. Agriculture) have a high proportion in this cohort.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Census of Population
          and Housing 2016 and 2011.
        </p>
        <p>
          For more information please refer to the{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/2901.0`, 'Census Dictionary 2016')}.
        </p>
      </Full>
      <Full>
        <a id="local-workers---hours-worked"></a>
        <SubTitleAlt>Local workers - Hours Worked</SubTitleAlt>
        <p>
          This data describes the working hours (by sex) of employed persons employed in the selected industry. It
          includes all persons working in the local area regardless of where they live, and relates specifically to
          hours worked the week prior to the Census. It is therefore specific to a time period and does not necessarily
          reflect the number of hours worked in an average week. If employed persons were away from work during Census
          week, hours worked will be lower. This dataset relates to all jobs the worker holds, not just the main job
          referred to in the industry classification.
        </p>
        <p>
          Workers are classified as full-time if they worked 35 hours or more in the week prior to Census, and part time
          if they worked less than this.
        </p>
        <p>
          Note that the hours worked data relates to "all jobs", while the industry counted is what the respondent
          stated as their "main job".
        </p>
        <p>
          For more information please refer to the{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/2901.0`, 'Census Dictionary 2011')}.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Census of Population
          and Housing 2016 and 2011.
        </p>
      </Full>
      <Full>
        <a id="local-workers---occupations"></a>
        <SubTitleAlt>Local workers - Occupations</SubTitleAlt>
        <p>
          This data describes the occupations (by sex) of people employed in the selected industry. It includes all
          persons working in the local area regardless of where they live. Relates to the main job held in the week
          prior to Census. Data for occupations are coded using the Australian and New Zealand Standard Classification
          of Occupations (ANZSCO). The occupation classification is updated periodically to take account of emerging
          occupation groups and changes to the structure of the labour force.
        </p>
        <p>
          Data are presented for the broad occupation groupings, which are broadly based on the education or skill level
          required to do a particular job
        </p>
        <p>
          For more information please refer to the 2011 Census Dictionary, and the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1220.0`,
            '2006 Australian and New Zealand Standard Classification of Occupations (ANZSCO)',
          )}
          .
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/`, 'Australian Bureau of Statistics')}, Census of Population
          and Housing 2016 and 2011.
        </p>
      </Full>
      <Full>
        <a id="local-workers---qualifications"></a>
        <SubTitleAlt>Local workers - Qualifications</SubTitleAlt>
        <p>
          This data describes the level of the highest qualification (by sex) of employed persons in the selected
          industry. It includes all persons working in the local area regardless of where they live.
        </p>
        <p>
          Qualifications are broken down by skill level, according to the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1272.0`,
            'Australian Standard Classification of Education (ASCED)',
          )}
          , (catalogue number 1272.0). Bachelor degree and higher level qualifications are generally provided by
          universities, while diploma level qualifications can be gained through universities or TAFE colleges.
          Certificate level qualifications are vocational based qualifications usually gained through TAFE and
          apprenticeships. Examples of particular occupations requiring certificate level qualifications are shown
          below:
        </p>
        <TopList>
          <li>With a Certificate I qualification, employment may be gained as:</li>
          <TopList>
            <li>a computer service technician;</li>
            <li>a council worker (outdoors);</li>
            <li>a dry cleaner;</li>
            <li>a factory hand;</li>
            <li>a florist;</li>
            <li>a kitchenhand;</li>
            <li>a polymer processor; and</li>
            <li>a stablehand.</li>
          </TopList>
          <li>With a Certificate II qualification, employment may be gained as:</li>
          <TopList>
            <li>a bank officer;</li>
            <li>a bushland regenerator;</li>
            <li>a cleaner;</li>
            <li>a farmer;</li>
            <li>a film and video production technician;</li>
            <li>a funeral attendant;</li>
            <li>a hospitality operator;</li>
            <li>a receptionist;</li>
            <li>a sales assistant;</li>
            <li>a screen printer</li>
            <li>a shearer;</li>
            <li>a tourist operator; and</li>
            <li>a vehicle detailer.</li>
          </TopList>
          <li>With a Certificate III qualification, employment may be gained as:</li>
          <TopList>
            <li>an animal attendant;</li>
            <li>a baker;</li>
            <li>a beauty therapist;</li>
            <li>a credit officer;</li>
            <li>an electrician;</li>
            <li>a homecare worker;</li>
            <li>a milliner;</li>
            <li>a motor mechanic;</li>
            <li>a network administrator;</li>
            <li>a painter and decorator;</li>
            <li>a pastry cook;</li>
            <li>a plumber;</li>
            <li>a signwriter;</li>
            <li>a sound technician;</li>
            <li>a stonemason;</li>
            <li>a tailor;</li>
            <li>a tiler; and</li>
            <li>a woodmachinist.</li>
          </TopList>
          <li>With a Certificate IV qualification, employment may be gained as:</li>
          <TopList>
            <li>an accounts clerk;</li>
            <li>an architectural drafter;</li>
            <li>a professional builder;</li>
            <li>a community services worker;</li>
            <li>a computer operator;</li>
            <li>a fitness instructor;</li>
            <li>a graphic designer;</li>
            <li>an interior decorator;</li>
            <li>a mechanical engineering technician;</li>
            <li>a systems analyst; and</li>
            <li>a visual merchandiser (please note this is now Diploma level, 2006)</li>
          </TopList>
        </TopList>
        <p>
          For a complete listing of the occupations and qualifications available, please refer to the{' '}
          {LinkBuilder(`http://www.ntis.gov.au/`, 'National Training Information Service')}.
        </p>
        <p>
          For more information about Australian qualifications please refer to the{' '}
          {LinkBuilder(`http://www.aqf.edu.au/cert.htm`, 'Australian Qualifications Network')}.
          <p>Australian Bureau of Statistics, Census of Population and Housing 2016 and 2011. </p>
          <p>Data source: Australian Bureau of Statistics, Census of Population and Housing 2006 and 2011.</p>
        </p>
      </Full>
      <Full>
        <a id="local-workers---field-of-qualifications"></a>
        <SubTitleAlt>Local workers - Field of qualifications</SubTitleAlt>
        <p>
          This dataset describes the field of study of the highest qualification completed of employed persons in the
          selected industry. The dataset includes all persons working in the local area regardless of where they live.
        </p>
        <p>
          Qualifications are broken down by skill level, according to the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1272.0`,
            'Australian Standard Classification of Education (ASCED), (catalogue number 1272.0)',
          )}
          . Field of education is defined as the subject matter of an educational activity. Field of education is
          measured in terms of:
        </p>
        <TopList>
          <li>Theoretical content</li>
          <li>Purpose of learning</li>
          <li>Objects of interest</li>
          <li>Methods and techniques</li>
          <li>Tools and equipment</li>
        </TopList>
        <p>
          At the broad (1-digit) level, presented on the site, categories in field of study are distinguished from each
          other on the basis of the theoretical content of the course and the broad purpose for which the study is
          undertaken.
        </p>
        <p>
          At the narrow (4-digit) level, presented on the site through drill-down, fields of study are distinguished
          from other narrow fields within the same broad field of study on the basis of the objects of interest and the
          purpose for which the study is undertaken.
        </p>
        <p>
          Note that the field of qualification relates only to the <strong>highest</strong> qualification the person has
          received. For example, a person with a bachelor degree in engineering and a graduate diploma in education,
          would have only the education qualification recorded in the Census.
        </p>
        <p>
          For a complete listing of the occupations and qualifications available, please refer to the{' '}
          {LinkBuilder(`http://training.gov.au/`, 'training.gov.au')}.
        </p>
        <p>
          For more information about Australian qualifications please refer to the{' '}
          {LinkBuilder(`http://www.aqf.edu.au/`, 'Australian Qualifications Framework')}.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2016 and 2011.
        </p>
      </Full>
      <Full>
        <a id="local-workers---weekly-income"></a>
        <SubTitleAlt>Local workers - Weekly income</SubTitleAlt>
        <p>
          This data describes the total gross weekly income by sex (including pensions and allowances) of employed
          persons employed in the selected industry. It includes all persons working in the local area regardless of
          where they live. It should not be assumed that wages and salaries are a person’s only source of income.
        </p>
        <p>Individual incomes are collected as ranges in the Census.</p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2016.
        </p>
      </Full>
      <Full>
        <a id="local-workers---weekly-income-quartiles"></a>
        <SubTitleAlt>Local workers - Weekly income quartiles</SubTitleAlt>
        <p>
          Incomes of workers are not comparable over time because of the influences of economic change such as wage
          level fluctuations and inflation. In addition, the ABS uses different ranges to collect income data every
          Census. The income quartile method has been adopted as the most objective method of comparing change in the
          income profile of local workers over time, relative to a benchmark area.
        </p>
        <p>
          Individual income quartiles look at the distribution of incomes for workers in the selected industry within{' '}
          {prefixedAreaName} relative to the state average. Quartiles split the total number of workers into four equal
          parts for the total local workers(all industries) in Victoria. The table shows the number and proportion of
          workers in the selected industry in {prefixedAreaName} falling into each segment, with a comparison to a
          benchmark industry, or the same industry in a different region.
        </p>
        Benchmarks are recalculated for each industry, so that 25% of that industry's workers fall into each quartile
        across the state. For example, if the retail trade industry has 30% of workers in the lowest category and only
        10% in the highest category, this indicates that the incomes in retail in {prefixedAreaName} are generally lower
        than the retail local workers across Victoria. The total of workers in all industries is only used to calculate
        the four quartiles. Once the dollar values have been established for these quartiles, it is possible to make
        meaningful comparisons to any industry or area, based on the inflation adjusted parameters.
      </Full>
      <Full>
        <a id="local-workers---method-of-travel-to-work"></a>
        <SubTitleAlt>Local workers - Method of travel to work</SubTitleAlt>
        <p>
          This dataset describes the method of travel to work of people employed in the selected industry. It includes
          all persons working in the local area regardless of where they live.
        </p>
        <p>
          Method of travel relates specifically to the journey to work on the morning of Census day. Respondents can
          nominate up to three modes of travel, resulting in 234 separate categories in the full classification, being
          all combinations of 1,2 and 3 methods. Most people take only one or two methods of travel, and the table
          presented aggregates the most popular multiple methods when combined with public transport use. Other
          combinations of 2 and 3 methods, not involving train or bus, are aggregated in the “Other”.
        </p>
        <p>
          While this has most of the categories in the full classification, it only includes 0.7% of workers in
          Australia. The methods of travel “Walked only” and “Worked at home” are exclusive and not combined with any
          other methods. “Did not go to work” relates to the day of Census only.
        </p>
      </Full>
      <Lite>
        <a id="resident-workers---key-statistics"></a>
        <SubTitleAlt>Resident workers - Key statistics</SubTitleAlt>
        <p>
          This dataset summarises the demographic characteristics of people in the local labour force. It includes
          people in the labour force who usually reside in the local area regardless of where they work (if working).
        </p>
        <p>
          Some of the figures in the summary table are taken from other topics in the worker and labour force profiles
          sections of economy.id - please refer to the relevant data notes for those topics. For those which don’t
          appear elsewhere, the following notes apply:
        </p>
        <TopList>
          <li>
            Persons – persons in the labour force (persons aged 15 years and over who are looking for work, or are
            employed, full time, part-time or casually) who reside in the local area.
          </li>
          <li>
            Individual income – low and high quartiles relate to those people earning in the lowest and highest 25% of
            incomes in the state respectively
          </li>
        </TopList>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2011 and 2006<span>(opens a new window)</span>
        </p>
      </Lite>
      <Full>
        <a id="resident-workers---industry"></a>
        <SubTitleAlt>Resident workers - Industry</SubTitleAlt>
        <p>
          This dataset describes the industries (by sex) in which employed residents work. It applies only to people
          aged 15 and over who were employed in the week prior to Census and includes employed people who usually reside
          in the local area regardless of where they work.
        </p>
        <p>
          Data for industry are coded using the Australia and New Zealand Standard Industrial Classification (ANZSIC).
          The industry classification is updated periodically to take account of emerging industries and changes in the
          structure of the economy.
        </p>
        <p>
          This table presents information at the ANZSIC 1-digit (division) level, with sub-categories available at the
          3-digit (group) level. A total of 293 industry categories are available at this level, by clicking on the
          table entries, or exporting the full version of the table. Only division level data appear in the charts.
        </p>
        <p>The industry classification was last updated in 2006 (ANZSIC06).</p>
        <p>
          For more information please refer to the{' '}
          {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/2901.0`, '2006 Census Dictionary')} and the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1292.0`,
            'Australian and New Zealand Standard Industrial Classification, 2006',
          )}
          .
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2011 and 2006.
        </p>
      </Full>
      <Full>
        {' '}
        <a id="resident-workers---age"></a>
        <SubTitleAlt>Resident workers - Age</SubTitleAlt>
        <p>
          This dataset describes the age (by sex) of people in the local labour force. It includes people in the labour
          force who usually reside in the local area regardless of where they work.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2016 and 2011.
        </p>
      </Full>
      <Full>
        {' '}
        <a id="resident-workers---hours-worked"></a>
        <SubTitleAlt>Resident workers - Hours worked</SubTitleAlt>
        <p>
          This dataset describes the working hours (by sex) of employed residents. It applies only to people aged 15 and
          over who were employed in the week prior to Census. It includes employed people who usually reside in the
          local area regardless of where they work, and relates specifically to hours worked the week prior to the
          Census. It is therefore only an indicator of full/part time status and does not necessarily reflect the number
          of hours worked in an average week. If employed persons were away from work during Census week, hours worked
          will be lower. Hours worked relates to all jobs the worker holds, not just the main job referred to in the
          industry classification.
        </p>
        <p>
          Workers are classified as full-time if they worked 35 hours or more in the week prior to Census, and part time
          if they worked less than this.
        </p>
        <p>For more information please refer to the Census Dictionary 2011.</p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2011 and 2006.
        </p>
      </Full>
      <Full>
        <a id="resident-workers---occupation"></a>
        <SubTitleAlt>Resident workers - Occupation</SubTitleAlt>
        <p>
          This data describes the occupations (by sex) in which employed residents work. It applies only to people aged
          15 and over who were employed in the week prior to Census and includes employed people who usually reside in
          the local area regardless of where they work. Relates to the main job held in the week prior to Census.
        </p>
        <p>
          Data for occupations are coded using the Australian and New Zealand Standard Classification of Occupations
          (ANZSCO). The occupation classification is updated periodically to take account of emerging occupation groups
          and changes to the structure of the labour force.
        </p>
        <p>
          Data are presented for the broad occupation groupings. Occupations are ranked in descending order of the
          approximate level of skill or education required.
        </p>
        <p>
          For more information please refer to the 2006 Census Dictionary, and the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1220.0`,
            '2006 Australian and New Zealand Standard Classification of Occupations (ANZSCO)',
          )}
          .
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2011 and 2006.
        </p>
      </Full>
      <Full>
        <a id="resident-workers---qualification"></a>
        <SubTitleAlt>Resident workers - Qualification</SubTitleAlt>
        <p>
          This dataset describes the level of the highest qualification (by sex) of persons in the local labour force.
          It includes people in the labour force who usually reside in the local area regardless of where they work (if
          working).
        </p>
        <p>
          Qualifications are broken down by skill level, according to the{' '}
          {LinkBuilder(
            `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1272.0`,
            'Australian Standard Classification of Education (ASCED)',
          )}
          , (catalogue number 1272.0). Bachelor degree and higher level qualifications are generally provided by
          universities, while diploma level qualifications can be gained through universities or TAFE colleges.
          Certificate level qualifications are vocational based qualifications usually gained through TAFE and
          apprenticeships. Examples of particular occupations requiring certificate level qualifications are shown
          below:
        </p>
        <TopList>
          <li>With a Certificate I qualification, employment may be gained as:</li>
          <TopList>
            <li>a computer service technician;</li>
            <li>a council worker (outdoors);</li>
            <li>a dry cleaner;</li>
            <li>a factory hand;</li>
            <li>a florist;</li>
            <li>a kitchenhand;</li>
            <li>a polymer processor; and</li>
            <li>a stablehand.</li>
          </TopList>
          <li>With a Certificate II qualification, employment may be gained as:</li>
          <TopList>
            <li>a bank officer;</li>
            <li>a bushland regenerator;</li>
            <li>a cleaner;</li>
            <li>a farmer;</li>
            <li>a film and video production technician;</li>
            <li>a funeral attendant;</li>
            <li>a hospitality operator;</li>
            <li>a receptionist;</li>
            <li>a sales assistant;</li>
            <li>a screen printer</li>
            <li>a shearer;</li>
            <li>a tourist operator; and</li>
            <li>a vehicle detailer.</li>
          </TopList>
          <li>With a Certificate III qualification, employment may be gained as:</li>
          <TopList>
            <li>an animal attendant;</li>
            <li>a baker;</li>
            <li>a beauty therapist;</li>
            <li>a credit officer;</li>
            <li>an electrician;</li>
            <li>a homecare worker;</li>
            <li>a milliner;</li>
            <li>a motor mechanic;</li>
            <li>a network administrator;</li>
            <li>a painter and decorator;</li>
            <li>a pastry cook;</li>
            <li>a plumber;</li>
            <li>a signwriter;</li>
            <li>a sound technician;</li>
            <li>a stonemason;</li>
            <li>a tailor;</li>
            <li>a tiler; and</li>
            <li>a woodmachinist.</li>
          </TopList>
          <li>With a Certificate IV qualification, employment may be gained as:</li>
          <TopList>
            <li>an accounts clerk;</li>
            <li>an architectural drafter;</li>
            <li>a professional builder;</li>
            <li>a community services worker;</li>
            <li>a computer operator;</li>
            <li>a fitness instructor;</li>
            <li>a graphic designer;</li>
            <li>an interior decorator;</li>
            <li>a mechanical engineering technician;</li>
            <li>a systems analyst; and</li>
            <li>a visual merchandiser (please note this is now Diploma level, 2006)</li>
          </TopList>
        </TopList>
        <p>
          For a complete listing of the occupations and qualifications available, please refer to{' '}
          {LinkBuilder(`http://training.gov.au/`, 'training.gov.au')}.
        </p>
        <p>
          For more information about Australian qualifications please refer to the{' '}
          {LinkBuilder(`http://www.aqf.edu.au/cert.htm`, 'Australian Qualifications Network')}.
        </p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2011.
        </p>
      </Full>
      <Full>
        <a id="resident-workers---field-of-qualification"></a>
        <SubTitleAlt>Resident workers - Field of qualification</SubTitleAlt>
        <div>
          <p>
            Qualifications are broken down by skill level, according to the{' '}
            {LinkBuilder(
              `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1272.0`,
              'Australian Standard Classification of Education (ASCED), (catalogue number 1272.0)',
            )}
            . Field of education is defined as the subject matter of an educational activity. Field of education is
            measured in terms of:
          </p>
          <TopList>
            <li>Theoretical content</li>
            <li>Purpose of learning</li>
            <li>Objects of interest</li>
            <li>Methods and techniques</li>
            <li>Tools and equipment</li>
          </TopList>
          <p>
            At the broad (1-digit) level, presented on the site, categories in field of study are distinguished from
            each other on the basis of the theoretical content of the course and the broad purpose for which the study
            is undertaken.
          </p>
          <p>
            At the narrow (4-digit) level, presented on the site through drill-down, fields of study are distinguished
            from other narrow fields within the same broad field of study on the basis of the objects of interest and
            the purpose for which the study is undertaken.
          </p>
          <p>
            Note that the field of qualification relates only to the <strong>highest</strong> qualification the person
            has received. For example, a person with a bachelor degree in engineering and a graduate diploma in
            education, would have only the education qualification recorded in the Census.
          </p>
          <p>
            For a complete listing of the occupations and qualifications available, please refer to{' '}
            {LinkBuilder(`http://training.gov.au/`, 'training.gov.au')}.
          </p>
          <p>
            For more information about Australian qualifications please refer to the{' '}
            {LinkBuilder(`http://www.aqf.edu.au/`, 'training.gov.au')}.
          </p>
          <p>
            Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
            Population and Housing 2011 and 2006.
          </p>
        </div>
      </Full>
      <Full>
        {' '}
        <a id="resident-workers---income"></a>
        <SubTitleAlt>Resident workers - Income</SubTitleAlt>
        <p>
          This data describes the total gross weekly income by sex (including pensions and allowances) of persons in the
          local labour force. It includes people in the labour force who usually reside in the local area regardless of
          where they work (if working). It should not be assumed that wages and salaries are a person’s only source of
          income.
        </p>
        <p>Individual incomes are collected as ranges in the Census.</p>
        <p>
          Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
          Population and Housing 2011.
        </p>
        <p>
          Incomes of employed people are not comparable over time because of the influences of economic change such as
          wage level fluctuations and inflation. In addition, the ABS uses different ranges to collect income data every
          Census. The income quartile method has been adopted as the most objective method of comparing change in the
          income profile of a labour force over time, relative to a benchmark area.
        </p>
        <p>
          Individual income quartiles look at the distribution of incomes for employed residents of {prefixedAreaName}{' '}
          relative to the state average. Quartiles split the total number of employed residents into four equal parts
          for Greater Melbourne. The table shows the number and proportion of workers in {prefixedAreaName} falling into
          each segment, with a comparison to the benchmark area. If the benchmark chosen is Greater Melbourne, by
          definition, there are 25% in each quartile for this area. If a different benchmark is chosen, benchmark
          percentages may vary.
        </p>
        For example, the income profile of residents in an area may show 40% in the lowest income quartile, which
        indicates that the area has a higher proportion of low income residents than the Greater Melbourne average.
        However if a comparison to the region showed 50% in the lowest income quartile, then the employed residents of
        the area are higher income than the benchmark.
      </Full>
      <Full>
        <a id="resident-workers---method-of-travel-to-work"></a>
        <SubTitleAlt>Resident workers - Method of travel to work</SubTitleAlt>
        <p>
          This dataset describes the method of travel to work of people employed in the selected industry. It includes
          all persons working in the local area regardless of where they live.
        </p>
        <p>
          Method of travel relates specifically to the journey to work on the morning of Census day. Respondents can
          nominate up to three modes of travel, resulting in 234 separate categories in the full classification, being
          all combinations of 1,2 and 3 methods. Most people take only one or two methods of travel, and the table
          presented aggregates the most popular multiple methods when combined with public transport use. Other
          combinations of 2 and 3 methods, not involving train or bus, are aggregated in the “Other”.
        </p>
        <p>
          While this has most of the categories in the full classification, it only includes 0.7% of workers in
          Australia. The methods of travel “Walked only” and “Worked at home” are exclusive and not combined with any
          other methods. “Did not go to work” relates to the day of Census only.
        </p>
      </Full>
      <Full>
        <a id="resident-workers---unemployed-key-statistics"></a>
        <SubTitleAlt>Resident workers - Unemployed key statistics</SubTitleAlt>
        <p>
          This dataset summarises the demographic characteristics of unemployed people in the local labour force. It
          includes only unemployed people who usually reside in the local area.
        </p>
        <p>
          Data notes for many of the topics are the same as those found elsewhere in the worker profiles and local
          labour force. The following specific notes relate to the unemployed key statistics only.
        </p>
        <TopList>
          <li>
            To be classified as unemployed, a person must have been not working in the week prior to Census, actively
            looking for work and available to start work in the next 4 weeks.
          </li>
          <li>
            Unemployment relates to persons over the age of 15, but for “Highest level of schooling” it has been further
            restricted to persons over the age of 18, the age at which most people leave school. The category “Still
            attending” covers those who are still at school but also looking for work.
          </li>
          <li>
            Speaks a language other than English at home – this is a measure of the population (unemployed population in
            this case) who have a first or primary language other than English. It does not imply anything about English
            proficiency, only that a different language is spoken by the person in their household.
          </li>
          <li>
            Has broadband internet access at home – relates to the dwelling in which the person was counted. This may be
            a multiple count for some dwellings with multiple unemployed people in them.{' '}
          </li>
          <li>
            Has child care responsibilities – this is a count of unemployed people who answered the question “In the
            last two weeks did the person spend time looking after a child, without pay?”, with “Yes, own children”,
            “Yes, others’ children” or “Yes, own and others’ children”.
          </li>
        </TopList>
      </Full>
      <Lite>
        <a id="local-market---key-statistics"></a>
        <SubTitleAlt>Local market - Key statistics</SubTitleAlt>
        <div>
          <strong>Age structure</strong>
          <p>
            Describes the age structure (by sex) of people who usually reside in the local area. Includes all persons
            except 'overseas visitors'.
          </p>
          <strong>Education institute attending</strong>
          <p>
            Describes the education institutions attended (by sex) by people who usually reside in the local area.
            Excludes 'overseas visitors'.
          </p>
          <TopList>
            <li>
              'Catholic' refers to infant, primary and secondary schools run independently by the Catholic Church.
            </li>
            <li>'Independent' refers to private and other non-Government schools.</li>
            <li>'TAFE' refers to 'Technical and Further Education' institutions.</li>
          </TopList>
          <strong>Proficiency in English</strong>
          <p>
            English proficiency aims to measure the ability of persons who speak ‘English as a Second Language’ to also
            speak English. The data, when viewed with other ethnic and cultural indicators, tends to reflect the ethnic
            composition of the population and the number of years of residence in Australia. In general, an area with a
            higher proportion of persons born in English-speaking countries or who emigrated from non-English speaking
            countries several decades ago is likely to have greater English-speaking proficiency.
          </p>
          <p>
            <em>
              Note: A person’s English proficiency is based on a subjective assessment and should therefore be treated
              with caution.
            </em>
          </p>
          <p>
            Responses to the question on Proficiency in English in the Census are subjective. For example, one
            respondent may consider that a response of 'Well' is appropriate if they can communicate well enough to do
            the shopping, while another respondent may consider such a response appropriate only for people who can hold
            a social conversation. Proficiency in English should be considered as an indicator of a person's ability to
            speak English and not a definitive measure of this ability.
          </p>
          <strong>Employment status (hours worked)</strong>
          <p>
            Describes the employment status (by sex) of people who usually reside in the local area. Excludes 'overseas
            vsitors'.
          </p>
          <TopList>
            <li>Includes persons aged 15 years and over.</li>
            <li>
              'Employed full time' is defined as having worked 35 hours or more in all jobs during the week prior to
              Census night. 'Unemployed' includes those not employed and actively looking for work, while 'Not in the
              labour force' includes all those people not employed and not looking for work, including retirees,
              students, home duties, discouraged jobseekers etc.
            </li>
          </TopList>
          <strong>Qualifications</strong>
          <p>
            Describes the qualifications (by sex) of people who usually reside in the local area. Includes persons aged
            15 years and over.
          </p>
          <TopList>
            <li>Excludes 'overseas visitors'.</li>
            <li>Excludes schooling up to Year 12.</li>
          </TopList>
          <p></p>
          <p>
            'No qualifications' refers to persons still studying for their first qualification, persons who do not have
            a qualification, and persons who have a qualification out of the scope of the Census version of the{' '}
            {LinkBuilder(
              `http://www.abs.gov.au/ausstats/abs@.nsf/mf/1272.0`,
              'Census version of the Australian Standard Classification of Education (ASCED), 2001',
            )}
            .
          </p>
          <strong>Household income</strong>
          <p>Describes the household income (by sex) of people who usually reside in the local area.</p>
          <p>
            Household income comprises the total of incomes of all persons in the household who stated an income.
            Excludes ‘visitor only households’ and ‘other non classifiable households’.
          </p>
          <TopList>
            <li>'Not stated' includes 'partial income not stated' and 'all incomes not stated'.</li>
            <li>
              'Partial income not stated' includes households where at least one, but not all, member(s) aged 15 years
              and over did not state an income and / or at least one household member aged 15 years and over was
              temporarily absent. In these cases, the aggregate of all stated individual incomes would be less than the
              true household income so these households are excluded from the classification.
            </li>
            <li>'All incomes not stated' includes households where no members present stated an income.</li>
          </TopList>
          <strong>Housing tenure</strong>
          <p>
            Describes the housing tenure of occupied private dwellings in the local area. ‘Purchasing’ includes
            dwellings with a mortgage and those being purchased under a rent/buy scheme.
          </p>
          <TopList>
            <li>
              'Renting' includes both public and private rental, and people renting from an employer. Other categories
              including rent-free occupancy and life tenure schemes are not shown in this summary.
            </li>
          </TopList>
          <strong>Dwelling structure</strong>
          <p>
            Describes the dwelling structure of all occupied private dwellings in the local area. This data is
            classified by the Census collector on visiting the household, and the categories are broadly based on the
            density of the housing types.
          </p>
          <TopList>
            <li>
              'Separate house' includes all free-standing dwellings separated from neighboring dwellings by a gap of at
              least half a metre.
            </li>
            <li>
              'Medium density' includes all semi-detached, row, terrace or townhouses and flats in a one or two storey
              block.
            </li>
            <li>'High density' includes all flats/apartments in a 3 or more storey block.</li>
          </TopList>

          <p>
            Data source: {LinkBuilder(`http://www.abs.gov.au/census`, 'Australian Bureau of Statistics')}, Census of
            Population and Housing 2011.
          </p>
        </div>
      </Lite>
      <Full>
        <a id="household-expenditure"></a>
        <SubTitleAlt>Household expenditure</SubTitleAlt>
        <div>
          <p>
            The Household Expenditure Survey is run by the ABS every 5 years, and measures, by income level, the
            expenditure of households on various expenditure items. The NIEIR economic model adjusts the expenditure
            based on the economic and household characteristics of the local area to provide an estimate of local
            expenditure.
          </p>
          <p>
            For more information, please see the{' '}
            {LinkBuilder(
              `http://www.abs.gov.au/AUSSTATS/abs@.nsf/Lookup/6530.0Explanatory%20Notes12009-10?OpenDocument`,
              'ABS Household Expenditure Survey',
            )}
            .
          </p>
          <p>
            Please note that the calculation of net savings presented here is a broad indicator only. Disposable income
            includes components for the value of owned dwellings and also includes Superannuation which is forced
            saving. The measure is useful for comparing between geographic areas, but should not be taken as an exact
            measure of the amount of money the average household saves outside the superannuation system.
          </p>
        </div>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}
          .
        </p>
      </Full>
      <Full>
        <a id="sources-of-income"></a>
        <SubTitleAlt>Sources of income</SubTitleAlt>
        <p>
          Household Disposable income data is based on the National Institute for Economic and Industry Research
          micro-simulation modelling.
        </p>
        <p>
          The base data source is the ABS Household Expenditure Survey (HES), (6535.0) conducted every 5 years. These
          are adjusted based on quarterly estimates of the relative composition of household types within the LGA
          derived from the ABS Labour Force Monthly Survey (and expenditure profiles of those household types in the
          HES).
        </p>
        <p>
          The derived figures are updated by total LGA household disposable income derived from the other models, and
          updated quarterly based on changes in state level household consumption figures in the ABS State Accounts
          data.
        </p>
        <p>
          Household Disposable income is an assessment of the average income available to each household, based on
          economic activity undertaken by the residents.
        </p>
        <p>It should not be directly compared to Census data, and is usually considerably higher because:</p>
        <TopList>
          <li>
            Census data is collected in ranges, and underestimates the incomes at the top end of the scale, which are
            factored in to data derived from the Labour Force Survey and ATO.{' '}
          </li>
          <li>
            Household Disposable income includes an estimate for the imputed value of ownership of dwellings, which
            forms part of the wealth of households but isn’t factored into their Census income.{' '}
          </li>
          <li>
            Household Disposable income also includes superannuation payments which are often not included in Census
            stated income.
          </li>
          <li>
            Over 10% of households in Census don’t state an income, and these incomes are included in the modelled data
            derived from the ATO and ABS Labour Force Survey data.
          </li>
        </TopList>
        <p>
          Household disposable income can, however be directly compared between areas and over time, which is presented
          on this site.
        </p>
        <p>Sources used in the model:</p>
        <TopList>
          <li>ABS Household Expenditure Survey</li>
          <li>ABS Labour Force Survey</li>
          <li>ABS State Accounts</li>
          <li>Census of Population and Housing</li>
        </TopList>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}
          .
        </p>
      </Full>
      <Full>
        <a id="housing-values-and-rentals"></a>
        <SubTitleAlt>Housing values and rentals</SubTitleAlt>
        <div>
          <p>
            Hometrack's property database is processed from a range of different sources. All data is externally
            sourced. Data sources include government sources, advertised listings and rents, geospatial data sets,
            surveys and valuations.
          </p>
          <p>
            Rents are defined as advertised rents, and value is defined as the value of properties according to
            Hometrack’s automated valuation model (AVM). The statistics shown on this site are calculated bottoms-up
            using Hometrack’s address-level baseline data. For example, the median value for a unit in a local
            government area is the value for which half the units have a valuation above and half below that value, the
            75th percentile having a quarter above and three-quarters below, and so on.
          </p>
          <p>
            This dataset is based on Hometrack's valuation database - which uses sales data and a proprietary algorithm
            to estimate housing values for all dwellings in an area.
          </p>
          <p>
            Rental values represent weekly rates, derived from published rental listings, and yield is calculated based
            on the estimated value of each rental listing, and provided as a first quartile, median and third quartile
            here.
          </p>
          <p>
            {' '}
            Housing sales and rental data are presented on an annual basis, at June of each year, based on automated
            valuation of all dwellings during that month, and rental listings for the June quarter (April/May/June of
            the reference year).
          </p>
          <p>
            For more information, or more detailed housing cost data, please contact{' '}
            {LinkBuilder(`http://www.hometrack.com.au/`, 'Hometrack')}.
          </p>
          <p>
            For some small local government areas, there may not be enough sales in a month, or enough rental listings
            to provide a reasonable valuation. In this case, data are not available.
          </p>
          <p>
            {' '}
            These data relate to private rentals listed in April-June quarter in the reference year only. They exclude
            public and community housing, and exclude current rents being paid by tenants not advertised, and so the
            rental figures derived will differ from those sourced from Census.
          </p>
        </div>
      </Full>
      <Full>
        <a id="economic-impact-model"></a>
        <SubTitleAlt>Economic impact model</SubTitleAlt>
        <p>
          Economic impact modelling is based on Input-Output tables, a component of the NIEIR microsimulation model
          derived from local differences between industries and Census journey to work data in the local economy. An
          input-output matrix describes how the different industries in an economy interrelate, and how supply chains
          operate in the local area. The microsimulation economic modelling reproduces the National Accounts data for
          local areas. Data sources in the model include:
        </p>
        <TopList>
          <li>Census Journey to Work data</li>
          <li>ABS Labour Force Survey</li>
          <li>Centrelink employment estimates</li>
          <li>ABS building approvals – commercial floorspace estimates.</li>
          <li>Dun &amp; Bradstreet Business Startups</li>
          <li>Australian Taxation Office worker income data</li>
          <li>Microsimulation of known large employers.</li>
        </TopList>
        <p>
          The modelling produces a factor, which shows the flow-on effects of economic productivity in an industry
          sector, to other sectors and the total economy. The impact of local production on areas outside the local area
          is also modelled, based on Journey to Work information from the Census, updated for known more recent
          employment projects.
        </p>
        <p>
          Please note that these results are theoretical only, and is meant to give a broad indication of the type of
          flow-on effects which may apply in the economy if certain industries are expanded or reduced. Where an
          industry currently has a very small number of jobs or output in the local economy, the results from this model
          should be treated with caution, as very little data is available. Where there is currently no employment or
          output in a particular industry, a result cannot be calculated.
        </p>
        <p>
          While the model will accept any input, no checking is done to see how reasonable this input assumption is. It
          is also really intended only to model relatively minor changes in jobs and size of industries in the short
          term (less than 10% of total economy). Where economic impacts occur between industries it should not be
          assumed that any impact is immediate as it will take some time for the impact to be integrated into the
          existing economy.
        </p>
        <p>
          As this is only a model of the real world, it is likely that real-world results would differ from what is
          shown in this table. <b>.id and NIEIR take no responsibility for the use of this information.</b>
        </p>
        <p>
          <b>Definitions</b>
        </p>
        <p>
          <b>Direct impacts:</b> represent the initial change in the industry selected. This refers to expenditure
          associated with the industry (e.g. labour, material, supplies, capital).
        </p>
        <p>
          <b>Indirect impacts (Industrial):</b> The direct impacts from the initial expenditure creates additional
          activity in the local economy (‘ripple effect’. Indirect effects are the results of business-to-business
          transactions indirectly caused by the direct impacts.
        </p>
        <p>
          <b>Induced impacts (Consumption):</b> An increase in revenue (from direct and indirect impacts) means that
          businesses increase wages and salaries by hiring more employees, increasing hours worked and raising wages.
          Households will then increase spending at local businesses.{' '}
        </p>
      </Full>
      <Full>
        <a id="event-impact-model"></a>
        <SubTitleAlt>Event impact model</SubTitleAlt>
        <p>
          The event calculator works by estimating the impact a user defined level of spend has across a range of event
          related industries. The industries included in the calculator are those that research shows have the highest
          level of direct economic impact that can be attributed to the running of an event in {prefixedAreaName}. The
          estimated total spend of an event is broken down across the following industries based on the proportion of
          spend that can be attributed to each industry.{' '}
        </p>
        <p>
          <strong>Industries included in the calculator: </strong>
        </p>
        <TopList>
          <li>Food Retailing</li>
          <li>Other Retailing</li>
          <li>Accommodation</li>
          <li>Food and Beverage Services</li>
          <li>Road Transport</li>
          <li>Arts and Heritage</li>
          <li>Sports and Recreation Activities</li>
        </TopList>
        <p>
          The proportion of spend allocated to each industry is dependent on the significance of the event, and they
          type of event which is determine by the user.
        </p>
        <p>
          <strong>Event Significance</strong>
        </p>
        <p>
          The significance of event is based on how far participants are prepared to travel to attend an event. An event
          can be classified into one of the following three significance levels.
        </p>
        <TopList>
          <li>
            <strong>Local</strong> - An event of local significance is assumed to attract attendance primarily from
            people who reside in {prefixedAreaName} and the neighbouring local government areas.{' '}
          </li>
          <li>
            <strong>Region</strong> - An event of regional significance is assumed to attract attendance primarily from
            people who reside within 300-500 km of the location of the event.
          </li>
          <li>
            <strong>State</strong> - an event of state significance is assumed to draw attendance from people across the
            state and the rest of Australia.
          </li>
        </TopList>
        <p>
          <strong>Event type</strong>
        </p>
        <p>
          The event type is determined by the primary focus of the event. An event can be classified as one of two types
          of events, Arts and Heritage events (.e.g. music concert, market) or Sports and Recreation events (e.g. cycle
          race, fun run)
        </p>
        <p>
          The Event Calculator has been designed primarily to give an indication of the potential impact of a small to
          medium size event that generates a total of between $25,000 and $250,000 of spend by the participants.
          Significant related costs that can be assumed would not occur within {prefixedAreaName}, such as domestic
          airfares, should not be included in the average daily spend figure. A small proportion of leakage of spend out
          of the local area is assumed in the calculation.
        </p>
      </Full>
      <Full>
        {' '}
        <a id="location-quotient"></a>
        <SubTitleAlt>Location Quotient</SubTitleAlt>
        <p>
          The location quotient is a simple way of seeing which are the main industries in an area, relative to the
          wider region. LQ shows the percentage of the local economy characteristic (eg. employment, value add) in a
          particular industry divided by the percentage of the wider area (region, state, nation) that this industry
          makes up. It is derived as follows:
        </p>
        <TopList>
          <li>Local industry share = Industry value local area / Total Industries value local area </li>
          <li>Benchmark industry share = Industry value benchmark area / Total Industries value benchmark area </li>
          <li>LQ = Local industry share / Benchmark industry share </li>
        </TopList>
        <p>
          An LQ of exactly 1 means that industry is exactly as prevalent as in the benchmark region. An LQ above or
          below 1 highlights specialisations or lack thereof.
        </p>
        <TopList>
          <li>
            <b>LQ &lt; 0.8</b> - Indicates an industry which is more important in the benchmark region than the local
            area, and may represent an economic weakness or opportunity for growth.
          </li>
          <li>
            <b>0.8 &lt; LQ &lt; 1.2</b> - Indicates the industry is broadly similar in importance in the local area
            compared to the benchmark region.
          </li>
          <li>
            <b>LQ &gt; 1.2</b> - Indicates the industry is a significant specialisation in the local area – possibly a
            key economic strength. Higher numbers mean greater specialisations. Anything over 2 is a major
            specialisation.
          </li>
        </TopList>
        <p>
          LQs should be analysed in combination with the proportional economic share that industry represents. For
          example, an industry with an LQ of 2 reveals a specialisation but if that industry only represents 3% of the
          local economy, it may not be significant.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}
          .
        </p>
      </Full>
      <Full>
        <a id="value-of-tourism"></a>
        <SubTitleAlt>Value of tourism</SubTitleAlt>
        <p>
          The tourism and hospitality industries are estimated from the NIEIR microsimulation model by looking at the
          level of exports from specific industries which have a significant direct tourism and hospitality component.
          By measuring the level of export activity (i.e. goods and services purchased by individuals or business from
          outside the local area) for those industries that form part of a Tourism and hospitality cluster, the value of
          the tourism and hospitality industry can be estimated.{' '}
        </p>
        <p>
          Of the 86 industries at the 2 digit ANZSIC code, 11 industries have a signification direct tourism output.
          There are also many other industries that contribute to tourism indirectly such as transport and education.
          The value of these industries to the economy is taken into account through the calculation of their indirect
          impact tourism spend flows through the local economy.{' '}
        </p>
        <p>
          Using this methodology the total sum of all regional Tourism output comes to within 5% of the ABS Tourism
          Satellite account. Using a regional methodology such as this applied nationally reduces the likelihood of over
          estimating the impact of tourisms to local areas, as the sum of all regional tourism output cannot exceed the
          established national benchmark.
        </p>
        <div id="idc-entity-table-8001-wrapper">
          <ItemWrapper>
            <EntityTable
              data={tableBuilder({
                title: 'Direct Tourism industries',
                data: tableData,
                source: <TableSource />,
              })}
            />
          </ItemWrapper>

          <ItemWrapper>
            <EntityTable
              data={tableBuilder({
                title: 'Other industries that contribute to tourism',
                data: tableData2,
                source: <TableSource2 />,
              })}
            />
          </ItemWrapper>
        </div>
      </Full>
      <Full>
        <a id="shift-share-analysis"></a>
        <SubTitleAlt>Shift-share analysis</SubTitleAlt>
        <p>
          Shift Share Analysis provides a useful mechanism for better interpreting changes in economic variables between
          different time periods. It is a way of breaking the growth or decline in an industry into three components to
          help understand what is driving the change. These three change components are commonly known as:
        </p>
        <p>
          <strong>National/State growth effect (NS)</strong> - the amount of growth or decline in an industry that could
          be attributed to the overall growth of a larger area that encompasses the region's economy, usually state or
          national.
        </p>
        <p>
          <strong>Industry mix effect (IM)</strong> - the amount of growth or decline in an industry that could be
          attributed to the performance of the specific industry at the national/state level
        </p>
        <p>
          <strong>Regional competitive effect (RS)</strong> - the amount of growth or decline in a specific industry
          that could be attributed to a local advantage or disadvantage. This is generally the most interesting
          component as it clearly quantifies the level of advantage or disadvantage an industry has in the local area.
        </p>
        <p>
          The three components for a time period Year 1 to Year 2 for a given local area within a larger benchmark area
          are simply derived as follows:
        </p>
        <TopList>
          <li>
            <strong>NS</strong> = Industry value local area (starting year) x Change in Total Economy value benchmark
            area (% change)
          </li>
          <li>
            <strong>IM</strong> = Industry value local area (starting year) x Change in Industry value benchmark area (%
            change) – NS
          </li>
          <li>
            <strong>RS</strong> = Industry value local area (ending year) – Industry value local area (starting year) –
            NS – IM
          </li>
        </TopList>
        <p>
          A positive regional competitive effect for an industry generally indicates the local industry is outperforming
          benchmark state/national trends (both overall economic trends and trends in that specific industry). A
          negative effect means that the industry is under performing compared to benchmark trends.
        </p>
        <p>
          The sign (+/-) of a regional competitive effect does not necessarily match the sign of the net change in the
          variable being measured over the given time period. For example, a local area may have a positive net change
          in an industry value (output, value add, jobs) but record a negative regional competitive effect. This means
          that the industry is growing strongly at the national/state level, stronger than in the given local area, and
          this is then the main cause of the local industry growth.
        </p>
        <p>
          Shift-share analysis needs to be combined with other local area data (e.g. population growth, building
          approvals) and specific area knowledge to ascertain what may have caused the area to grow above or below
          trend.
        </p>
        <p>
          <strong>Changes to historical data</strong>
        </p>
        <p>
          This dataset is underpinned by the NIEIR-ID economic model which is updated each financial year. In the
          2016-17 update you can expect to see differences in some of the numbers to previous updates. For more details,
          see {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Economic model updates')}
          .
        </p>
      </Full>
      <Full>
        <a id="tourism-visitor-summary"></a>
        <SubTitleAlt>Tourism visitor summary</SubTitleAlt>
        <p>
          Tourism Research Australia conduct two major annual surveys for the purpose of promoting and understanding the
          Australian Tourism Market.
        </p>
        <p>
          The International Visitor Survey (IVS) samples 40,000 short-term international travellers aged over 15 when
          they leave Australia. It contains approximately 100 questions and is interviewer-based. The primary purpose of
          this survey is to derive reliable estimates of visitors by country of origin, reason for visit and expenditure
          at the Tourism Region (TR) level. Results for smaller areas are available and shown here, but they are subject
          to sampling error.
        </p>
        <p>
          Details of sampling errors and confidence intervals are found on the Tourism Research Australia{' '}
          {LinkBuilder(
            `http://www.tra.gov.au/research/international-visitor-survey.html/`,
            'International Visitor Survey Methodology',
          )}
          page.
        </p>
        <p>
          The National Visitor Survey (NVS) is conducted annually by telephone survey of approximately 120,000
          Australian residents. It contains over 70 questions relating to travel within Australia by Australian
          residents, including destinations, purpose of trip, transportation, activities, expenditure and accommodation.
          This survey outputs data on overnight trips (including length of trip) and day trips by destination. Selected
          data from this survey are shown here. Details on the level of sampling error and further information on the
          methodology from the survey can be found the Tourism Research Australia{' '}
          {LinkBuilder(
            `http://www.tra.gov.au/research/national-visitor-survey.html`,
            'National Visitor Survey Methodology',
          )}
          page.
        </p>
        <p>
          The results from each of these surveys are weighted by population and demographics to produce estimates of
          total visitation shown in this topic.
        </p>
        <p>
          Results are produced by Tourism Research Australia from the IVS and NVS at the Tourism Region level, and at
          the SA2 level. SA2s do not always align to LGA boundaries, and in those cases, to derive the LGA level
          estimates shown in economy.id, a concordance has been used which apportions the SA2 to the LGA of interest
          based on an estimate of the total number of businesses on either side of a boundary. This is necessarily an
          approximation, but as these results are surveys based on respondents recollections of travel rather than
          absolute boundaries, it is not expected to have a major impact on the results for most LGAs.
        </p>
        <p>
          <b>Confidentiality and data reliability</b>
        </p>
        <p>
          To protect the confidentiality of individual respondents, and due to concerns about unreliable data due to
          small sample sizes, Tourism Research Australia requires the suppression of all data items from the IVS and NVS
          based on a sample size of less than 40. Though actual sample sizes are not shown on this site, this data
          suppression has been actioned. Data marked with a "-" have been suppressed because they are based on small and
          unreliable samples. In some cases, individual financial years' data have been suppressed for this reason, but
          a 5 year average may still be able to be published. This means that time series cannot be shown, but it still
          allows the user to gain an understanding of broad tourism patterns in the area.
        </p>
        <p>
          Additional datasets may be available using different combinations of geography or categories, even where the
          data shown here has been suppressed. .id has access to the TRA Online database and we are happy to help our
          clients with custom data requests where they will help inform the tourism picture of the area. Please contact
          .id for more information.
        </p>
        <p>
          <b>Legal Statement</b>
        </p>
        <p>
          In addition to the above information, Tourism Research Australia legally require the following statement to be
          published with this dataset:
        </p>
        <p>© Commonwealth of Australia 2016. </p>
        <p>
          This work is copyright.&nbsp; In addition to any use permitted under the Commonwealth Copyright Act 1968, the
          Commonwealth through Tourism Research Australia permits copies to be made in whole or in part for the purpose
          of promoting Australian tourism, provided that Tourism Research Australia (representing the Commonwealth) is
          identified on any copies as the author and the material is reproduced in its current form. &nbsp;
        </p>
        <p>
          Copies may not be made for a commercial purpose, that is, for sale, without the permission of Tourism Research
          Australia (representing the Commonwealth). The information in this data is presented in good faith and on the
          basis that neither the Commonwealth, nor its agents or employees, are liable (whether by reason of error,
          omission, negligence, lack of care or otherwise) to any person for any damage or loss whatsoever which has
          occurred or may occur in relation to that person taking or not taking (as the case may be) action in respect
          of any statement, information or advice given in this publication.
        </p>
        <p>
          Data derived from Tourism Research Australia surveys are subject to sample error. Users of the data are
          advised to consult the sample error tables contained in Tourism Research Australia publications or otherwise
          available&nbsp;from Tourism Research Australia before drawing any conclusions or inferences, or taking any
          action, based on the data.
        </p>
      </Full>
    </>
  );
};

export default TopicNotesPage;

const TableSource = () => <p>Source: NIEIR microsimulation tourism model</p>;
const TableSource2 = () => <p>Source: ABS Tourism Satellite account</p>;

const tableData2 = [
  {
    term: 'Rental, Hiring and Real Estate Services',
    definition: 'Residential property operators',
  },
  {
    term: 'Rail transport',
    definition: 'Rail transport',
  },
  {
    term: 'Road transport',
    definition: 'Taxi and other road transport',
  },
  {
    term: 'Road transport',
    definition: 'Road freight transport',
  },
  {
    term: 'Road transport',
    definition: 'Interurban and rural bus transport',
  },
  {
    term: 'Road transport',
    definition: 'Urban bus transport (including tramway)',
  },
  {
    term: 'Water Transport',
    definition: '	Water transport',
  },
  {
    term: 'Air and space transport',
    definition: 'Air and space transport',
  },
  {
    term: 'Other transport',
    definition: 'Scenic and Sightseeing Transport',
  },
  {
    term: 'Rental and Hiring Services (except Real Estate)	',
    definition: 'Passenger car rental and hiring',
  },
  {
    term: 'Administrative and Support Services services',
    definition: 'Travel agency and tour arrangement',
  },
  {
    term: 'Education and training',
    definition: 'Preschool and school education',
  },
  {
    term: 'Education and training',
    definition: 'Tertiary education',
  },
  {
    term: 'Education and training',
    definition: 'Adult, community and other education',
  },
];
const tableData = [
  {
    term: 'Retail Trade',
    definition: 'Motor Vehicle and Motor Vehicle Parts Retailing ',
  },
  {
    term: ' Retail Trade	',
    definition: 'Fuel Retailing    ',
  },
  {
    term: 'Retail Trade	',
    definition: 'Food Retailing',
  },
  {
    term: 'Retail Trade',
    definition: '	Other Store-Based Retailing',
  },
  {
    term: 'Retail Trade',
    definition: 'Non-Store Retailing and Retail Commission Based Buying',
  },
  {
    term: 'Accommodation and Food Services	',
    definition: 'Accommodation',
  },
  {
    term: 'Accommodation and Food Services',
    definition: 'Food and Beverage Services',
  },
  {
    term: 'Arts and Recreation Services',
    definition: 'Heritage Activities',
  },
  {
    term: 'Arts and Recreation Services',
    definition: 'Creative and Performing Arts Activities',
  },
  {
    term: 'Arts and Recreation Services',
    definition: 'Sports and Recreation Activities',
  },
  {
    term: 'Arts and Recreation Services',
    definition: 'Gambling Activities',
  },
];

const tableBuilder = ({ title, data, source }) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = title;
  const rows = data.map(({ term, definition }) => ({
    id: 'glossary',
    data: [term, definition],
    formattedData: [term, definition],
  }));

  return {
    allowExport: false,
    allowSortReset: false,
    rawDataSource,
    source,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 2,
          },
        ],
      },
      {
        cssClass: 'heading ',
        cols: [],
      },
    ],
    cols: [
      {
        id: 0,
        sortable: false,
        displayText: '1 Digit Industry',
        cssClass: 'first XS',
      },
      {
        id: 1,
        sortable: false,
        displayText: '2 Digit Industry',
        cssClass: ' XL left-align ',
      },
    ],
    rows,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
