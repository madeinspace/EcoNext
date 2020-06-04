import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatNumber } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const fetchData = async ({ filters }) => {
  const { ClientID, WebID, IsLite, BMID } = filters;
  //select * from [dbo].[fn_IN_EmployedResidentsFull](102,10,20)
  const SQL = ({ ClientID, WebID, BMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_EmployedResidentsFull](${+ClientID},${+WebID},${+BMID}) ORDER BY Year_End DESC
  `;

  //select * from [dbo].[fn_IN_EmployedResidentsLITE](102,10,20)
  const SQLite = ({ ClientID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_EmployedResidentsLITE](${+ClientID}, 10, 40) ORDER BY Yr DESC
  `;
  const SQLQuery = IsLite ? SQLite({ ClientID }) : SQL({ ClientID, WebID, BMID });
  const contentData = await sqlConnection.raw(SQLQuery);
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => ({ defaultBenchmarkName: getActiveToggle(filterToggles, 'BMID') });

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Employed residents`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        const endYear = filters.IsLite ? contentData[0].Yr : contentData[0].Year_End;
        const localJobs = formatNumber(filters.IsLite ? contentData[0].ValWebID : contentData[0].LocalJobs);
        return `In ${data.prefixedAreaName}, there were ${localJobs} residents employed in the year ending June ${endYear}.`;
      },
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
