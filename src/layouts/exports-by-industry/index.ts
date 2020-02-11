import { sqlConnection } from '../../utils/sql';

/**
 * 
@ClientID int,
@WebID varchar(MAX),
@BMID varchar(MAX),
@StartYear int,
@EndYear int,
@TblType int,
@LblID varchar(max) = null

(102,10,40,2019,2014,1,null)
 */

/* #region  contentDataQuery */
const contentDataQuery = ({ ClientID, BMID, sStartYear, sEndYear, WebID, exptype }) => {
  let exportFunc = ``;
  switch (exptype) {
    case '1':
      exportFunc = `fn_Exports_1and2Digit`;
      break;
    case '2':
      exportFunc = `fn_InterregionalExports_1and2Digit`;
      break;
    case '3':
      exportFunc = `fn_InternationalExports_1and2Digit`;
      break;
    default:
      exportFunc = `fn_Exports_1and2Digit`;
      break;
  }
  return `select * from CommData_Economy.[dbo].[${exportFunc}](
    ${ClientID},
    ${WebID},
    ${BMID},
    ${sStartYear},
    ${sEndYear},
    1,
    null 
    ) 
  `;
};
/* #endregion */

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatNumber, formatMillionsCurrency } from '../../utils';

const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    activeBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
    currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
    currentExportType: getActiveToggle(filterToggles, 'exptype'),
    currentExportId: filterToggles.filter(t => t.key === 'exptype')[0]['value'],
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData }): string => {
  //  for some lite clietns (bayside afaik) this dataset doesn't exist
  if (contentData.length <= 0) return;

  const { currentExportId } = data;
  let exportsDisplayText = '';
  switch (currentExportId) {
    case '1':
      exportsDisplayText = 'total';
      break;
    case '2':
      exportsDisplayText = 'domestic';
      break;
    case '3':
      exportsDisplayText = 'international';
      break;
    default:
      exportsDisplayText = 'total';
      break;
  }
  const prefix = data.HasPrefix ? 'the ' : '';
  const areaName = `${prefix}${data.currentAreaName}`;
  const largestEmployer = largest(contentData, 'NoYear1');
  const millions = `$${formatNumber(largestEmployer.NoYear1)} million`;
  const currentStartYear = data.currentStartYear;
  return `In ${areaName}, ${largestEmployer.LabelName} had the largest ${exportsDisplayText} exports by industry, generating ${millions} in ${currentStartYear}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Exports`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
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
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Export type:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_ExportType',
      ParamName: 'exptype',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
