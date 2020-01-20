import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));

  return contentData;
};

const pageContent = {
  entities: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string =>
        `The ${contentData[0].LabelName} industry had the largest number of [BTypeAlt] in ${data.currentAreaName}, comprising ${contentData[0].PerYear1}% of all  [BTypeAlt], compared to [Econ_BusinessRegister].[Top1PerBM].{0:0.0}% in [BM].`,
    },
  ], // copy this from the relevant key in 'data/content.ts'
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '600',
      Label: 'Number of employees:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Business_Type',
      ParamName: 'BType',
    },
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
      DefaultValue: '2018',
      Label: 'Year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start_BR',
      ParamName: 'sStartYear',
    },
    {
      Database: 'CommApp',
      DefaultValue: '2017',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End_BR',
      ParamName: 'sEndYear',
    },
  ], // copy this from the relevant key in 'data/toggles.ts'
};

export { fetchData, Page, pageContent };

// uncomment the below function with the correct SQL
const contentDataQuery = filters => {
  const { ClientID, WebID, sStartYear, sEndYear, BType } = filters;

  return `select * from CommData_Economy.[dbo].[fn_BusinessRegister](${ClientID}, ${WebID}, 40, ${sStartYear}, ${sEndYear}, 1, null, ${BType}) order by LabelKey`;
};
