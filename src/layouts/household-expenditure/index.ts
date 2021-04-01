import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatCurrency } from '../../utils';

/* #region  contentDataQuery */
//select * from [dbo].[fn_HHExpend](102,10,40,2015,2010,1,null)
const q = ({ ClientID, WebID, BMID, sStartYear, sEndYear }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_HHExpend](?,?,?,?,?,?,?)`;
  const params = [ClientID, WebID, BMID, sStartYear, sEndYear, 1, null];
  return { query, params };
};
/* #endregion */

const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(q(filters).query, q(filters).params);
  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
  currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
});

const headline = ({ data, contentData }): string => {
  const { currentStartYear, prefixedAreaName, currentBenchmarkName } = data;
  const utilities = contentData.filter(({ LabelKey }) => LabelKey === 14)[0];
  const comparisonText = utilities.NoYear1 > utilities.BMYear1 ? 'higher' : 'lower';
  return `In ${currentStartYear}, household expenditure on utilities was ${formatCurrency(
    utilities.NoYear1,
  )} in ${prefixedAreaName}, ${comparisonText} compared to ${currentBenchmarkName}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Household expenditure`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
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
