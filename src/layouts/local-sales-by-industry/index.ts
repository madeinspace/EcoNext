import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatNumber } from '../../utils';

const q = ({ ClientID, BMID, sStartYear, sEndYear, WebID }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_LocalSales_1and2Digit]( ?,?,?,?,?,?,?)  `;
  const params = [ClientID, WebID, BMID, sStartYear, sEndYear, 1, null];
  return { query, params };
};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const fetchData = async ({ filters }) => await sqlConnection.raw(q(filters).query, q(filters).params);

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
    currentComparaisonYear: getActiveToggle(filterToggles, 'sEndYear'),
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData }): string => {
  //  for some lite clietns (bayside afaik) this dataset doesn't exist
  if (contentData.length <= 0) return;
  const { prefixedAreaName, currentStartYear } = data;
  const largestEmployer = largest(contentData, 'NoYear1');
  const jobs = `$${formatNumber(largestEmployer.NoYear1)} million`;
  return `In ${prefixedAreaName}, ${largestEmployer.LabelName} had the highest local sales, generating ${jobs} in ${currentStartYear}.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Local sales`,
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
