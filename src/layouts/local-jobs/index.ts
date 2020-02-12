import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatNumber } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IsLite, BMID } = filters;
  const SQL = ({ ClientID, WebID, BMID }) => `
  select * from CommData_Economy.[dbo].[fn_LocalJobs_Full](${+ClientID},${+WebID},${+BMID}) ORDER BY Year_End DESC
  `;
  const SQLite = ({ ClientID, WebID, BMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_LocalJobs](${+ClientID},${+WebID},${+BMID}) ORDER BY Yr DESC
  `;
  const SQLQuery = IsLite ? SQLite({ ClientID, WebID, BMID }) : SQL({ ClientID, WebID, BMID });
  const contentData = await sqlConnection.raw(SQLQuery);
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = { defaultBenchmarkName: getActiveToggle(filterToggles, 'BMID') };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Local employment`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const prefix = data.HasPrefix ? 'the ' : '';
        const areaName = `${prefix}${data.currentAreaName}`;
        const localJobs = formatNumber(contentData[0].LocalJobs);
        const yearEnding = contentData[0].Year_End;
        return `There were ${localJobs} jobs located in ${areaName} in the year ending June ${yearEnding}.`;
      },
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const prefix = data.HasPrefix ? 'the ' : '';
        const areaName = `${prefix}${data.currentAreaName}`;
        const localJobs = formatNumber(contentData[0].ValWebID);
        const yearEnding = contentData[0].Yr;
        return `There were ${localJobs} jobs located in ${areaName} in the year ending June ${yearEnding}.`;
      },
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
