import getActiveToggle from '../../utils/getActiveToggle';
import { sqlConnection } from '../../utils/sql';

const a = ({ ClientID, WebID = 10, BMID = 40 }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_Quarterly_Economic_Indicators](?,?,?)`;
  return { query, params: [ClientID, WebID, BMID] };
};

const fetchData = async ({ filters }) => {
  const extendedData = await sqlConnection.raw(a(filters).query, a(filters).params);
  return { extendedData };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmark: getActiveToggle(filterToggles, 'BMID'),
    currentIndicator: getActiveToggle(filterToggles, 'Ind'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ filters }): string => `Quarterly economic indicators`,
    },
    {
      Title: 'Version',
      renderString: (): string => `Version 2.1 (Sept 2020)`,
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
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Indicators:',
      Params: [],
      StoredProcedure: 'sp_Toggle_Econ_IndicatorNoEffective',
      ParamName: 'Ind',
    },
  ],
};

export { fetchData, activeCustomToggles, pageContent };
