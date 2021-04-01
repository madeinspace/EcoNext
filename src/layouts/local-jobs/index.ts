import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatNumber } from '../../utils';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IsLite, BMID } = filters;
  const SQL = ({ ClientID, WebID, BMID = 40 }) => `
  select * from CommData_Economy.[dbo].[fn_LocalJobs_Full](${+ClientID},${+WebID},${BMID}) ORDER BY Year_End DESC
  `;
  const SQLite = ({ ClientID, WebID, BMID = 40 }) => `
  select * from CommData_Economy.[dbo].[fn_IN_LocalJobs](${+ClientID},${+WebID},${BMID}) ORDER BY Yr DESC

  `;
  const SQLQuery = IsLite ? SQLite({ ClientID, WebID, BMID }) : SQL({ ClientID, WebID, BMID });
  const contentData = await sqlConnection.raw(SQLQuery);

  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Local employment`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        const localJobs = formatNumber(filters.IsLite ? contentData[0].ValWebID : contentData[0].LocalJobs);
        const yearEnding = filters.IsLite ? contentData[0].Yr : contentData[0].Year_End;
        return `There were ${localJobs} jobs located in ${data.prefixedAreaName} in the year ending June ${yearEnding}.`;
      },
    },
    {
      Title: 'Description',
      renderString: ({ data, contentData }): string =>
        '<p>This indicator shows the estimated number of jobs in the local area, on an annual basis back to 2001. The dataset is derived from the National Economics microsimulation model, based on the ABS labour force survey, and is generally higher than the figure provided by Census, because it is updated every year, and is not subject to Census undercount.<br><br>A count of jobs is one of the most fundamental economic indicators of the size of the local economy, and increasing numbers of jobs generally represent a growing economy. However, jobs are not necessarily full-time and the value of a job varies across areas. For this reason, jobs numbers should be viewed in conjunction with <a href="employment-by-industry-fte?" title="FTE workers link">Employment by industry (FTE)</a> and <a href="worker-productivity-by-industry?" title="Worker Productivity link">Worker Productivity</a> datasets.</p>',
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
