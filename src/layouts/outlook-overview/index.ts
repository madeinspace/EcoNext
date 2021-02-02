import { sqlConnection } from '../../utils/sql';
import Page from './page';
// impact by region (benchmark)
const forecastSummaryQuery = ({ ClientID, WebID = 10, BMID = 20, Year = 2020, econYear = 1 }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Summary](${ClientID}, ${WebID}, ${BMID}, ${Year}, ${econYear}) `;
  return query;
};
// output value added
const vulnerableJobsQuery = ({ ClientID, WebID = 10, BMID = 20 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Summary_Vulnerable_Jobs](${ClientID},${WebID},${BMID}) `;
// local jobs and employed residents
const topThreeQuery = ({ ClientID, WebID = 10, Year = 2020 }) =>
  `select * from  CommData_Economy.[dbo].[fn_COVID19_Forecast_Summary_Top3] (${ClientID}, ${WebID}, ${Year}) `; //order by JTW_Diff_Per desc

const fetchData = async ({ filters }) => {
  if (filters.IsLite) {
    return {};
  }
  const topThreeData = await sqlConnection.raw(topThreeQuery(filters));
  const vulnerableJobsData = await sqlConnection.raw(vulnerableJobsQuery(filters));
  const forecastSummaryData = await sqlConnection.raw(forecastSummaryQuery(filters));
  return { topThreeData, vulnerableJobsData, forecastSummaryData };
};

const activeCustomToggles = ({ filterToggles }) => ({});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ filters }): string => `Outlook overview`,
    },
    {
      Title: 'Version',
      renderString: (): string => `Version 2.1 (Sept 2020)`,
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '20',
      Label: 'Current area:',
      StoredProcedure: 'sp_Toggle_Econ_Area_BM_COVID_Forecast',
      ParamName: 'BMID',
    },
  ],
};

export { fetchData, Page, activeCustomToggles, pageContent };
