import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

// select * from [dbo].[fn_TRA_International_VistorNight](102,10,40) ORDER BY LabelKey DESC
const international_visitor_nights_Query = {
  id: 1,
  name: `international visitor night`,
  sql: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_International_VistorNight]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Overnight_VistorNight](102,10,40) ORDER BY LabelKey DESC
const overnight_vistor_night_query = {
  id: 2,
  name: `overnight vistor night`,
  sql: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Overnight_VistorNight]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Daytrip_VistorNight](102,10,40)
const daytrip_vistor_nightQuery = {
  id: 3,
  name: `daytrip vistor night`,
  sql: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Daytrip_VistorNight]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey DESC`,
};

const queries = [international_visitor_nights_Query, overnight_vistor_night_query, daytrip_vistor_nightQuery];

const fetchData = async ({ filters }) => {
  const query: any = queries[filters.Tourismtype - 1]['sql'];
  return await sqlConnection.raw(query(filters));
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentTourismtype: getActiveToggle(filterToggles, 'Tourismtype'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Visitors and nights`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Tourism Research Australia – Survey data`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName, currentBenchmarkName, currentTourismtype } = data;
        const average = contentData.filter(({ LabelKey }) => LabelKey === 9999)[0];
        const without = contentData.filter(({ LabelKey }) => LabelKey != 9999)[0];
        const comparisonText = average.AvgStay > average.AvgStayBM ? 'higher' : 'lower';
        return `In the 5 years up to ${without.FinYearName}, there were an average of ${formatNumber(
          average.Visitors,
        )} international visitors to ${prefixedAreaName}. Average length stay for ${currentTourismtype.toLowerCase()} was ${
          average.AvgStay
        } days, ${comparisonText} than the average for ${currentBenchmarkName}.`;
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
      StoredProcedure: 'sp_Toggle_Econ_Tourism',
      ParamName: 'Tourismtype',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
