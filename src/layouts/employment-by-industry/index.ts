import { sqlConnection } from '../../utils/sql';

/* #region  contentDataQuery */
const contentDataQuery = ({ ClientID, IGBMID, sStartYear, sEndYear, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_JTW_Employment_1and2Digit](
    ${ClientID},
    ${WebID},
    ${IGBMID},
    ${sStartYear},
    ${sEndYear},
    1,
    null,
    0
    ) 
  `;
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
import { formatNumber } from '../../utils';

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
  const prefix = data.HasPrefix ? 'the ' : '';
  const areaName = `${prefix}${data.currentAreaName}`;
  const largestEmployer = largest(contentData, 'NoYear1');
  const jobs = formatNumber(largestEmployer.NoYear1);
  const currentStartYear = data.currentStartYear;
  return `In ${areaName}, ${largestEmployer.LabelName} is the largest employer, generating ${jobs} local jobs in ${currentStartYear}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Employment by industry (Total)`,
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
      DefaultValue: '2013',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
