import { sqlConnection } from '../../utils/sql';

/* #region  contentDataQuery */
/**
 * 
@ClientID int,
@WebID varchar(MAX),
@BMID varchar(MAX),
@StartYear int,
@EndYear int,
@DataType char(2),
@Sex int,
@TblType int,
@LblID varchar(max) = null
 */

const contentDataQuery = ({ ClientID, BMID, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry1and3Digit_Sex]( ${ClientID}, ${WebID}, ${BMID}, 2016, 2011, 'WP',3,1,null)`;
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
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
    currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData }): string => {
  //  for some lite clietns (bayside afaik) this dataset doesn't exist
  if (contentData.length <= 0) return;

  const prefix = data.HasPrefix ? 'the ' : '';
  const areaName = `${prefix}${data.currentAreaName}`;
  const largestEmployer = largest(contentData, 'NoYear1');
  const IndName = largestEmployer.LabelName;
  const TotalEmploymentPerc = `${formatPercent(largestEmployer.PerYear1)}%`;
  return `${IndName} is the largest employer in ${areaName}, making up ${TotalEmploymentPerc} of total employment.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Employment by industry (Census)`,
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
