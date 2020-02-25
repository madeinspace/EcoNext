import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Occupation1and3Digit_Sex](${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', ${Sex}, 1, null, ${Indkey} ) order by LabelKey DESC
  `;

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey != 999999)
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
  const { currentBenchmarkName, currentIndustryName, prefixedAreaName, currentGenderName } = data;
  const { Sex, Indkey } = filters;
  const withoutTotal = contentData.filter(
    ({ LabelKey, Hierarchy }) => Hierarchy === 'P' && LabelKey != 999999 && LabelKey != 33000,
  );
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  const industryText = +Indkey === 23000 ? '' : ` (${currentIndustryName})`;
  const highestOccupationPer = largest(withoutTotal, 'PerYear1');
  const highestOccupationBMPer = largest(withoutTotal, 'BMYear1');
  const headlineAlt = `In ${prefixedAreaName}${industryText}, ${formatPercent(
    highestOccupationPer.PerYear1,
  )}% of ${genderText} workers were ${highestOccupationPer.LabelName}, compared to ${formatPercent(
    highestOccupationBMPer.BMYear1,
  )}% in ${currentBenchmarkName}.`;
  return headlineAlt;
};

const Subtitle = ({ data, filters }) => {
  const { Sex } = filters;
  const { currentGenderName } = data;
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  return `Local ${genderText} workers - Occupations - ${data.currentIndustryName}`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data, filters }): string => Subtitle({ data, filters }),
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
