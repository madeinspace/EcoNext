import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Occupation1and3Digit_Sex](${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'UR', ${Sex}, 1, null, ${Indkey} ) order by LabelKey DESC
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

const headline = ({ data, contentData }) => {
  const genderLookup = {
    Persons: 'resident',
    Males: 'male resident',
    Females: 'female resident',
  };
  const { prefixedAreaName, currentGenderName, currentIndustryName } = data;
  const mostCommonQual = largest(contentData, 'NoYear1').LabelName;
  const headlineAlt = `There are more ${genderLookup[currentGenderName]} workers (${currentIndustryName}) ${mostCommonQual} in ${prefixedAreaName} than any other occupation.`;
  return headlineAlt;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Resident workers - Occupations of employment`,
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
