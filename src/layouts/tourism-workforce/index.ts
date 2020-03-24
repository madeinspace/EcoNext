import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

// select * from [fn_Tourism_KeyStats](102,10,40,2019,2014)
const KeystatsQuery = {
  id: 1,
  query: ({ ClientID, WebID, BMID }) =>
    `SELECT * from CommData_Economy.[dbo].[fn_Tourism_KeyStats](${ClientID}, ${WebID}, ${BMID}, 2019, 2014) `,
};

// select * from [dbo].[fn_IAM_Tourism](102,10,40,2019,2014) where TableType in (5) and LabelKey in (11,12,21,22,31,32,41,42)
const OccupationQuery = {
  id: 2,
  query: ({ ClientID, WebID, BMID }) =>
    `SELECT * from CommData_Economy.[dbo].[fn_Occupation_Tourism](${ClientID}, ${WebID}, ${BMID}, 2019, 2014 ,'wp', 3, 1, null) Order by NoYear1 Desc`,
};

const queries = [KeystatsQuery, OccupationQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, id }) => {
      return { id, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => {
  return {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  };
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Tourism and hospitality workforce`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Australian Bureau of Statistics (ABS) – Census 2016 – by place of work`,
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
          ClientID: '9',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_BM',
      ParamName: 'BMID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
