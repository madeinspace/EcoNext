import { sqlConnection } from '../../utils/sql';

import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

// select * from [dbo].[fn_WP_Contribution_Stats](102,10,40,2010,2019,23000,1)
const contentDataQuery = ({ ClientID, WebID, BMID, sStartYear, sEndYear, IndkeyNieir, DataType = 1 }) => {
  return `select * from CommData_Economy.[dbo].[fn_WP_Contribution_Stats](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, ${IndkeyNieir}, ${DataType}) `;
};
const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    activeBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `In [Parameter].[sStartYearLabel], ${data.currentAreaName} contributed [Econ_IndustryAnalysis].[EmploymentPer].{0:0.0}% of [BM]’s [IndkeyNieirAlt1] employment and [Econ_IndustryAnalysis].[ValueAddedPer].{0:0.0}% of its value added.`,
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
      DefaultValue: '2018',
      Label: 'Year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start',
      ParamName: 'sStartYear',
      Hidden: true,
    },
    {
      Database: 'CommApp',
      DefaultValue: '2013',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
