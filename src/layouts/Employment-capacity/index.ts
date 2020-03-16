import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent, formatNumber, formatShortDecimal } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [fn_EmploymentCapacity_1and2Digit](102,10,2011,2006,1,null)
const SQLQuery = ({ ClientID, WebID, sStartYear, sEndYear }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_EmploymentCapacity_1and2Digit](${ClientID},${WebID},${sStartYear}, ${sEndYear}, 1,null) ORDER BY LabelKey ASC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(SQLQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
  currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
});

const Largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 999999)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const Smallest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 999999)
    .sort((a, b) => {
      return a[key] - b[key];
    })[0];
};

const headline = ({ data, contentData }) => {
  if (contentData.length <= 0) return;
  const { prefixedAreaName } = data;
  const total = contentData.filter(({ LabelKey }) => LabelKey === 999999)[0];
  const parents = _.sortBy(
    contentData.filter(({ LabelKey, Hierarchy }) => Hierarchy === 'P' && LabelKey !== 999999),
    item => item.LabelKey,
  );
  const comparisonText = total.LJtoERYear1 > 1 ? 'more' : 'less';
  const largest = Largest(parents, 'LJtoERYear1');
  const smallest = Smallest(parents, 'LJtoERYear1');
  return `The jobs to residents ratio for ${prefixedAreaName} in ${data.currentStartYear} was ${formatShortDecimal(
    total.LJtoERYear1,
  )}, meaning that there were ${comparisonText} jobs than resident workers. ${
    largest.LabelName
  } had the highest ratio (${formatShortDecimal(largest.LJtoERYear1)}), while the lowest ratio was found in ${
    smallest.LabelName
  } (${formatShortDecimal(smallest.LJtoERYear1)}).`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Jobs to workers ratio`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
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
