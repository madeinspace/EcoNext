import { sqlConnection } from '../../utils/sql';

import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

// select * from [dbo].[fn_WP_Contribution_Stats](102,10,40,2010,2019,23000,1)
const contentDataQuery = ({ ClientID, WebID, BMID, sStartYear, sEndYear, IndkeyNieir, DataType = 1 }) => {
  return `select * from CommData_Economy.[dbo].[fn_WP_Contribution_Stats](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, ${IndkeyNieir}, ${DataType}) ORDER BY SortOrder`;
};
const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));
  return contentData;
};

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
  const totalEmployment = contentData.filter(({ LabelName }) => LabelName === 'Employment (total)')[0];
  const valueAdd = contentData.filter(({ LabelName }) => LabelName === 'Value add ($m)')[0];
  const { prefixedAreaName, currentBenchmarkName } = data;
  return `In 2018/19, ${prefixedAreaName} contributed ${formatPercent(
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
      Title: 'Subtitle',
      renderString: (): string => `Industry sector analysis - All industries`,
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
