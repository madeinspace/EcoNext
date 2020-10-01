import { sqlConnection } from '../../utils/sql';

const extendedForecastQuery = ({ ClientID, WebID = 10, BMID = 40 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Pre_Post](${ClientID},${WebID},${BMID})`;

const fetchData = async ({ filters }) => {
  const extendedData = await sqlConnection.raw(extendedForecastQuery(filters));
  return { extendedData };
};

const activeCustomToggles = ({ filterToggles }) => ({});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ filters }): string => (filters.IsLite ? `COVID-19 update` : `COVID-19 Economic Outlook Tool`),
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
  ],
};

export { fetchData, activeCustomToggles, pageContent };
