import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async ({ filters }) => {
  const tableData = await sqlConnection.raw(tableDataQuery(filters));

  return tableData;
};

const pageContent = {
  entities: [
    {
      Title: 'Headline',
      renderString: ({ data, tableData }): string =>
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
          a: '1',
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

export { fetchData, Page, pageContent };

// @ClientID int,
// @WebID varchar(MAX),
// @IGBMID varchar(MAX),
// @StartYear int,
// @EndYear int,
// @DataType char(2),
// @Sex int,
// @TblType int,
// @LblID varchar(max) = null,
// @Indkey int = NULL

const tableDataQuery = ({
  ClientID,
  WebID,
  IGBMID,
  sStartYear,
  sEndYear,
  DataType = 'UR',
  Sex,
  TblType = null,
  LblID = null,
  Indkey,
}) => {
  return `select * from CommData_Economy.[dbo].[fn_Industry_StudyField1and3Digit_Sex](${ClientID}, 
    ${WebID}, 
    ${IGBMID}, 
    ${sStartYear}, 
    ${sEndYear}, 
    '${DataType}', 
    ${Sex}, 
    ${TblType}, 
    ${LblID}, 
    ${Indkey}) order by LabelKey ASC`;
};
