import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

// select * from [dbo].[fn_TRA_International_VistorNight](102,10,40) ORDER BY LabelKey DESC
const visitor_nights_numbersQuery = {
  id: 1,
  name: `visitor_nights_numbers`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_International_VistorNight]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Overnight_VistorNight](102,10,40) ORDER BY LabelKey DESC
const visitor_nights_percentQuery = {
  id: 2,
  name: `visitor_nights_percent`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Overnight_VistorNight]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Daytrip_VistorNight](102,10,40)
const time_serie_tourismQuery = {
  id: 3,
  name: `visitor_nights_percent`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Daytrip_VistorNight]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

const queries = [visitor_nights_numbersQuery, visitor_nights_percentQuery, time_serie_tourismQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, name, id }) => {
      return { id, name, data: await sqlConnection.raw(query(filters)) };
    }),
  );

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
        const { prefixedAreaName } = data;
        const ERP = formatNumber(contentData[0].Number);
        const currentYear = contentData[0].Year;

        return `In the 5 years up to {2018/19}, there were an average of {89,748} international visitors to {the City of Monash}. Average length stay for international visitors was {43.6} days, {higher} than the average for {Victoria}.`;
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
