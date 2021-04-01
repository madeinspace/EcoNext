import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent, formatNumber } from '../../utils';

// select * from [dbo].[fn_TRA_Summary1](102,10,40) ORDER BY LabelKey DESC
const visitor_nights_numbersQuery = {
  id: 1,
  name: `visitor_nights_numbers`,
  query: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Summary1]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey Desc`,
};

// select * from [dbo].[fn_TRA_Summary2](102,10,40) ORDER BY LabelKey DESC
const visitor_nights_percentQuery = {
  id: 2,
  name: `visitor_nights_percent`,
  query: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Summary2]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey Desc`,
};

const queries = [visitor_nights_numbersQuery, visitor_nights_percentQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, name, id }) => {
      return { id, name, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentTourismType: getActiveToggle(filterToggles, 'Tourismtype'),
});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Tourism visitor summary`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Tourism Research Australia – Survey data`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName, currentAreaName } = data;
        const startYear = contentData[0].data[0]['FinYearName'];
        const intVisitors = contentData[0].data[0]['International Visitor Nights'];
        const domVisitors = contentData[0].data[0]['Domestic Visitor Nights'];
        const intVisitorsPerc = contentData[1].data[0]['International Visitor Nights'];
        const headlineMain = `For ${startYear}, there were ${formatNumber(
          intVisitors,
        )} international visitors nights in ${prefixedAreaName}, accounting for ${formatPercent(
          intVisitorsPerc,
        )}% of the total visitor nights.`;
        const headlineAlt = `In ${prefixedAreaName} there were ${formatNumber(
          domVisitors,
        )} Domestic Visitor Nights in 2018/19`;
        const headlineNone = `${currentAreaName} tourism visitor data is suppressed in 2019/20 due to low sample size`;
        const headline = intVisitors != null ? headlineMain : domVisitors != null ? headlineAlt : headlineNone;
        return headline;
      },
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '10',
      Label: 'Current area:',
      Params: [
        {
          ClientID: '2',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area',
      ParamName: 'WebID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '40',
      Label: 'Current benchmark:',
      Params: [
        {
          ClientID: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_BM_Tourism_Sector_GCCSA',
      ParamName: 'BMID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Measure:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Tourism_Decoy',
      ParamName: 'Tourismtype',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
