import getActiveToggle from '../../utils/getActiveToggle';
import { sqlConnection } from '../../utils/sql';
import Page from './page';

const a = ({ ClientID, WebID = 10, Vln, Qrt }) => {
  return {
    query: `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_JK_Mix](?, ?, ?, ?)`,
    params: [ClientID, WebID, Qrt, Vln],
  };
};

const fetchData = async ({ filters }) => {
  if (filters.IsLite) {
    return {};
  }
  const JobKeeperData = await sqlConnection.raw(a(filters).query, a(filters).params);

  return { JobKeeperData };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentVulnerability: getActiveToggle(filterToggles, 'Vln'),
    currentQuarter: getActiveToggle(filterToggles, 'Qrt'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `COVID-19 JobKeeper estimates`,
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
      DefaultValue: 1,
      Label: 'Vulnerability:',
      Params: [],
      StoredProcedure: 'sp_Toggle_Econ_COVID_Vulnerability',
      ParamName: 'Vln',
    },
    {
      Database: 'CommApp',
      DefaultValue: '20200632',
      Label: 'Quarter:',
      Params: [
        {
          ClientID: '0',
        },
        {
          startDate: 20200632,
        },
        {
          endDate: 20210332,
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_COVID_Forecast_EndYear',
      ParamName: 'Qrt',
    },
  ],
};

export { fetchData, Page, activeCustomToggles, pageContent };
