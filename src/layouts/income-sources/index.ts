import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

// const fetchData = async ({ filters }) => await sqlConnection.raw(BuildingApprovalsSQL(filters));
const contentDataQuery = {
  id: 1,
  name: 'main',
  query: ({ ClientID, WebID, BMID, sStartYear, sEndYear }) =>
    `select * from CommData_Economy.[dbo].[fn_SourcesofIncome](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, 1, null)`,
};

//select * from [dbo].[fn_SourcesofIncome_Charts](102,10,40,2019,1,null)
const chartQuery = {
  id: 2,
  name: 'sharedAnalysis',
  query: ({ ClientID, WebID, BMID, sStartYear }) =>
    `select * from CommData_Economy.[dbo].[fn_SourcesofIncome_Charts](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, 1, null)`,
};

const queries = [contentDataQuery, chartQuery];

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
  };
  return activeCustomToggles;
};

const headLine = ({ data, contentData }) => {
  const { prefixedAreaName, currentBenchmarkName } = data;
  const dispoableIncomeArea = contentData[0].data.filter(({ LabelKey }) => LabelKey === 11)[0]['NoYear1'];
  const dispoableIncomeBM = contentData[0].data.filter(({ LabelKey }) => LabelKey === 11)[0]['BMYear1'];
  const comparisonText = dispoableIncomeArea > dispoableIncomeBM ? 'higher' : 'lower';
  return `Households in ${prefixedAreaName} have a ${comparisonText} amount of disposable income compared to ${currentBenchmarkName}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headLine({ data, contentData }),
    },
    {
      Title: 'Subtitle',
      renderString: (): string => `Sources of income`,
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
