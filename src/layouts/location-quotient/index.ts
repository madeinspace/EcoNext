import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

/* #region  contentDataQuery */
// select * from [dbo].[fn_LQ_Analysis_1and2Digit](102,10,40,2015,2010,1,null,1)
const contentDataQuery = ({ ClientID, BMID, sStartYear, sEndYear, LoQo, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_LQ_Analysis_1and2Digit](${ClientID}, ${WebID}, ${BMID}, ${sStartYear}, ${sEndYear}, 1, null, ${LoQo}) `;
/* #endregion */

const without = (str, exclude) => {
  return str === exclude ? '' : str;
};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
  currentComparisonYear: getActiveToggle(filterToggles, 'sEndYear'),
  currentMeasureName: getActiveToggle(filterToggles, 'LoQo'),
});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Location quotient by industry`,
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string => `National Economics (NIEIR) - Modelled series`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { currentMeasureName, currentStartYear, prefixedAreaName } = data;
        const parents = _.sortBy(
          contentData.filter(item => item.Hierarchy === 'P' && item.LabelKey !== 999999),
          item => item.LabelKey,
        );
        const largestLoQo = largest(parents, 'LQBMYear1');
        return `In ${currentStartYear}, ${largestLoQo.LabelName} was a major specialisation in ${prefixedAreaName} in terms of ${currentMeasureName}.`;
      },
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
      DefaultValue: '1',
      Label: 'Measure',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_LQ',
      ParamName: 'LoQo',
    },
    {
      Database: 'CommApp',
      DefaultValue: '2020',
      Label: 'Year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start',
      ParamName: 'sStartYear',
      Hidden: true,
    },
    {
      Database: 'CommApp',
      DefaultValue: '2015',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
