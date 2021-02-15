import { sqlConnection } from '../../utils/sql';
import Page from './page';
// impact by region (benchmark)
const forecastSummaryDataQuery = ({ ClientID, WebID = 10, BMID = 20, Year = 2020, econYear = 1 }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Summary](?,?,?,?,?) `;
  const params = [ClientID, WebID, 20, Year, econYear];
  return { query, params };
};
// output value added
const vulnerableJobsQuery = ({ ClientID, WebID = 10, BMID = 20 }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_COVID19_Forecast_Summary_Vulnerable_Jobs](?, ?, ?) `;
  const params = [ClientID, WebID, 20];
  return { query, params };
};
// local jobs and employed residents
const topThreeQuery = ({ ClientID, WebID = 10, Year = 2020 }) => {
  const query = `select * from  CommData_Economy.[dbo].[fn_COVID19_Forecast_Summary_Top3] (?, ?, ?) `; //order by JTW_Diff_Per desc
  const params = [ClientID, WebID, Year];
  return { query, params };
};

const fetchData = async ({ filters }) => {
  const a = topThreeQuery(filters);
  const b = vulnerableJobsQuery(filters);
  const c = forecastSummaryDataQuery(filters);
  const topThreeData = await sqlConnection.raw(a.query, a.params);
  const vulnerableJobsData = await sqlConnection.raw(b.query, b.params);
  const forecastSummaryData = await sqlConnection.raw(c.query, c.params);
  return { topThreeData, vulnerableJobsData, forecastSummaryData };
};

const activeCustomToggles = ({ filterToggles }) => {};

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
  filterToggles: [],
};

export { fetchData, Page, activeCustomToggles, pageContent };
