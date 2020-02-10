import { sqlConnection } from '../../utils/sql';

/* #region  contentDataQuery */
/**
 * 
@ClientID int,
@WebID varchar(MAX),
@BMID varchar(MAX),
@sStartYear int,
@sEndYear int,
@TblType int,
@LblID varchar(max) = null

*(102,10,40,2017,2012,1,Null)
 */

const contentDataQuery = ({ ClientID, BMID, WebID, sStartYear, sEndYear, prodtype }) => {
  const fnc = prodtype === '2' ? 'fn_ValueAddedPerHour_1and2Digit' : 'fn_ValueAddedPerWorker_1and2Digit_or';
  return `select * from CommData_Economy.[dbo].[${fnc}]( ${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, 1, null)`;
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
import { formatNumber, formatPercent } from '../../utils';

const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    activeBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
    currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
    currentTableType: getActiveToggle(filterToggles, 'prodtype'),
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData }): string => {
  //  for some lite clietns (bayside afaik) this dataset doesn't exist
  if (contentData.length <= 0) return;
  const prefix = data.HasPrefix ? 'the ' : '';
  const prefixedAreaName = `${prefix}${data.currentAreaName}`;
  const largestEmployer = largest(
    contentData.filter(item => item.Hierarchy === `P`),
    'NoYear1',
  );
  const IndName = largestEmployer.LabelName;
  const TotalEmploymentPerc = `$${formatNumber(largestEmployer.NoYear1)}`;
  return `In ${prefixedAreaName}, ${IndName} Services had the highest productivity by industry, generating ${TotalEmploymentPerc} per worker in 2018/19.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Worker productivity`,
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
      Label: 'Productivity measure:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_ProdType',
      ParamName: 'prodtype',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
