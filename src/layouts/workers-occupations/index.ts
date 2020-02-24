import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Occupation1and3Digit_Sex](${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', ${Sex}, 1, null, ${Indkey} ) order by LabelKey DESC
  `;

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentGenderName: getActiveToggle(filterToggles, 'Sex'),
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData, filters }) => {
  console.log('data, contentData: ', data, filters);
  const { currentAreaName, currentBenchmarkName, currentIndustryName, prefixedAreaName, currentGenderName } = data;
  const { IGBMID, Indkey } = filters;
  const totalPersons = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
  const withoutTotal = contentData.filter(node => node.LabelKey != 999999);
  const youngest = withoutTotal.slice(0, 3);
  const oldest = withoutTotal.slice(3);
  const youngestPercClient = formatPercent(totalPersons(youngest, 'PerYear1'));
  const oldestPercClient = formatPercent(totalPersons(oldest, 'PerYear1'));
  const youngestPercBM = formatPercent(totalPersons(youngest, 'BMYear1'));
  const oldestPercBM = formatPercent(totalPersons(oldest, 'BMYear1'));
  const comparisonYoung =
    Math.abs(youngestPercClient - youngestPercBM) <= 0.5
      ? 'similar'
      : youngestPercClient > youngestPercBM
      ? `higher`
      : `lower`;
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  const benchmarkText = IGBMID < 23000 ? currentBenchmarkName : `the ${currentBenchmarkName} ${genderText} workforce`;
  const mostCommonQual = largest(contentData, 'NoYear1').LabelName;
  const headlineAlt = `Within ${prefixedAreaName}, the ${industryText} ${genderText} workforce has a {comparisonYoung} proportion of ${mostCommonQual} compared to ${benchmarkText}.
`; // const headlineAlt = `There are more ${genderLookup[currentGenderName]} workers (${currentIndustryName}) ${mostCommonQual} in ${prefixedAreaName} than any other occupation.`;
  return headlineAlt;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Local workers - Occupations - ${data.currentIndustryName}`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => headline({ data, contentData, filters }),
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
      DefaultValue: '23000',
      Label: 'Select industry:',
      Params: [
        {
          IGBMID: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Industry',
      ParamName: 'Indkey',
    },
    {
      Database: 'CommApp',
      DefaultValue: '40',
      Label: 'Current benchmark:',
      Params: [
        {
          ClientID: '0',
        },
        {
          Indkey: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_BM_Area_Ind',
      ParamName: 'IGBMID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '3',
      Label: 'Gender:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Gender',
      ParamName: 'Sex',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
