import { sqlConnection } from '../../utils/sql';

import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

// select * from [dbo].[fn_WP_Contribution_Stats](102,10,40,2010,2019,23000,1)
const contentDataQuery = {
  id: 1,
  name: 'main',
  query: ({ ClientID, WebID, BMID, sStartYear, sEndYear, IndkeyNieir, DataType = 1 }) => {
    return `select * from CommData_Economy.[dbo].[fn_WP_Contribution_Stats](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, ${IndkeyNieir}, ${DataType}) ORDER BY SortOrder`;
  },
};

//select * from [dbo].[fn_LQSS_Analysis_1and2Digit_chart](102,10,40,2019,2018,1,22000,1)
const LQSSDataQuery = {
  id: 2,
  name: 'sharedAnalysis',
  query: ({ ClientID, WebID, BMID, sStartYear, sEndYear, IndkeyNieir, DataType = 1 }) => {
    const query = `select * from CommData_Economy.[dbo].[fn_LQSS_Analysis_1and2Digit_chart](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, 1, ${IndkeyNieir}, ${DataType})`;
    return query;
  },
};

const queries = [contentDataQuery, LQSSDataQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, name, id }) => {
      return { id, name, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentComparisonYear: getActiveToggle(filterToggles, 'sEndYear'),
    currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
    currentIndustryName: getActiveToggle(filterToggles, 'IndkeyNieir'),
  };
  return activeCustomToggles;
};

const headLine = ({ data, contentData, filters }) => {
  const { data: contentdata } = contentData[0];
  const { prefixedAreaName, currentBenchmarkName, currentStartYear } = data;
  const totalEmployment = contentdata.filter(({ LabelName }) => LabelName === 'Employment (total)')[0];
  const valueAdd = contentdata.filter(({ LabelName }) => LabelName === 'Value add ($m)')[0];
  return `In ${currentStartYear}, ${prefixedAreaName} contributed ${formatPercent(
    totalEmployment.PerYear1,
  )}% of ${currentBenchmarkName}’s employment and ${formatPercent(valueAdd.PerYear1)}% of its value added.`;
};

const pageContent = {
  entities: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => headLine({ data, contentData, filters }),
    },
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        const { currentIndustryName } = data;
        return `Industry sector analysis - ${currentIndustryName}`;
      },
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
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
      DefaultValue: '22000',
      Label: 'Industry:',
      Params: [
        {
          a: '2',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_IndustryNieir86',
      ParamName: 'IndkeyNieir',
    },
    {
      Database: 'CommApp',
      DefaultValue: '2019',
      Label: 'Year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start',
      ParamName: 'sStartYear',
      Hidden: true,
    },
    {
      Database: 'CommApp',
      DefaultValue: '2014',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
