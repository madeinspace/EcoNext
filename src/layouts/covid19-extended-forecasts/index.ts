import getActiveToggle from '../../utils/getActiveToggle';
import { sqlConnection } from '../../utils/sql';

const extendedForecastQuery = ({ ClientID, WebID = 10, BMID = 40 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Pre_Post](${ClientID},${WebID},${BMID})`;

const headlinesQuery = ({ ClientID, WebID = 10, BMID = 40, EconYr = 1 }) => { 
  const query = `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Headline](${ClientID},${WebID},${BMID}, ${EconYr})`;
  return query;
}


const fetchData = async ({ filters }) => {
  const extendedData = await sqlConnection.raw(extendedForecastQuery(filters));
  const headlinesData = await sqlConnection.raw(headlinesQuery(filters));
  console.log('headlinesData: ', headlinesData);
  return { extendedData,  headlinesData };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmark: getActiveToggle(filterToggles, 'BMID'),
    
    currentIndicator: getActiveToggle(filterToggles, 'Ind'),
    currentEconYear: getActiveToggle(filterToggles, 'EconYr'),
    currentMeasure: getActiveToggle(filterToggles, 'Measure'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ filters }): string => `COVID-19 Extended forecasts`,
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
      Label: 'indicators:',
      Params: [  ],
      StoredProcedure: 'sp_Toggle_Econ_Indicator',
      ParamName: 'Ind',
    },
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Year:',
      Params: [ ],
      StoredProcedure: 'sp_Toggle_Econ_EconYear',
      ParamName: 'EconYr',
    },
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Measure:',
      Params: [  ],
      StoredProcedure: 'sp_Toggle_Econ_Measure',
      ParamName: 'Measure',
    },
  ],
};

export { fetchData, activeCustomToggles, pageContent };
