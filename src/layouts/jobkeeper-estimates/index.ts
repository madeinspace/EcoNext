import { sqlConnection } from '../../utils/sql';
import Page from './page';
// impact by region (benchmark)
const a = ({ ClientID, WebID = 10 }) => {
  return { query: `select * from CommData_Economy.[dbo].[fn_COVID19_Headline_Graph](?, ?)`, params: [ClientID, WebID] };
};
// output value added
const b = ({ ClientID, WebID = 10, BMID = 40 }) => {
  return {
    query: `select * from CommData_Economy.[dbo].[fn_COVID19_OutputVA_Industry](?, ?, ?) ORDER BY QtrChg DESC`,
    params: [ClientID, WebID, BMID],
  };
};
// local jobs and employed residents
const topThreeQuery = ({ ClientID, WebID = 10, BMID = 40 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_LocalJobsEmpRes_Industry](${ClientID},${WebID},${BMID}) ORDER BY QtrChg DESC`;
// headline
const headlineQuery = ({ ClientID, WebID = 10, BMID = 40 }) =>
  `select * from CommData_Economy.[dbo].[fn_COVID19_Headline](${ClientID},${WebID},${BMID})`;

const fetchData = async ({ filters }) => {
  if (filters.IsLite) {
    return {};
  }
  const headlineData = await sqlConnection.raw(headlineQuery(filters));
  const topThreeData = await sqlConnection.raw(topThreeQuery(filters));
  const impactByRegionData = await sqlConnection.raw(a(filters).query, a(filters).params);
  const outputValueAddedData = await sqlConnection.raw(b(filters).query, b(filters).params);

  return { topThreeData, headlineData, impactByRegionData, outputValueAddedData };
};

const activeCustomToggles = ({ filterToggles }) => ({});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ filters }): string => `COVID-19 JobKeeper estimates`,
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

export { fetchData, Page, activeCustomToggles, pageContent };
