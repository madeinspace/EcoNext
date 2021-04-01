import getActiveToggle from '../../utils/getActiveToggle';
import { sqlConnection } from '../../utils/sql';
import Page from './page';
// impact by region (benchmark)
const industryMixQuery = ({ ClientID, WebID = 10, BMID = 40, StartYear, EndYear }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Industry_Mix](${ClientID},${WebID},${BMID},${StartYear}, ${EndYear})`;

const industryQuery = ({ ClientID, WebID = 10, BMID = 1000, IndkeyNieir }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Industry](${ClientID},${WebID},${BMID},${IndkeyNieir})`;

const fetchData = async ({ filters }) => {
  const industryMixData = await sqlConnection.raw(industryMixQuery(filters));
  const industryData = await sqlConnection.raw(industryQuery(filters));
  return { industryMixData, industryData };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmark: getActiveToggle(filterToggles, 'BMID'),
    currentIndicator: getActiveToggle(filterToggles, 'Ind'),
    currentIndustry: getActiveToggle(filterToggles, 'IndkeyNieir'),
    currentStartYear: getActiveToggle(filterToggles, 'StartYear'),
    currentEndYear: getActiveToggle(filterToggles, 'EndYear'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `COVID-19 Extended industry forecasts`,
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
      StoredProcedure: 'sp_Toggle_Econ_Area_BM_COVID_Forecast',
      ParamName: 'BMID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '22000',
      Label: 'Industry:',
      Params: [
        {
          a: '1',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_IndustryNieir86',
      ParamName: 'IndkeyNieir',
    },
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Indicator:',
      Params: [],
      StoredProcedure: 'sp_Toggle_Econ_Indicator_Ind',
      ParamName: 'Ind',
    },
    {
      Database: 'CommApp',
      DefaultValue: '20200332',
      Label: 'Start year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_COVID_Forecast_StartYear',
      ParamName: 'StartYear',
    },
    {
      Database: 'CommApp',
      DefaultValue: '20200932',
      Label: 'End year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_COVID_Forecast_EndYear',
      ParamName: 'EndYear',
    },
  ],
};

export { fetchData, Page, activeCustomToggles, pageContent };
