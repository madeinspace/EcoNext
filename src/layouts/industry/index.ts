import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

const contentDataQuery = ({ ClientID, BMID, Sex, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry1and3Digit_Sex]( ${ClientID}, ${WebID}, ${BMID}, 2016, 2011, 'UR', ${Sex}, 2, null) order by LabelKey DESC`;

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const genderLookup = {
  Persons: 'resident',
  Males: 'male resident',
  Females: 'female resident',
};

const fetchData = async ({ filters }) => {
  const contentData = await sqlConnection.raw(contentDataQuery(filters));

  return contentData;
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    activeBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentGenderName: getActiveToggle(filterToggles, 'Sex'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Resident workers - Industry`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const prefix = data.HasPrefix ? 'the ' : '';
        const prefixedAreaName = `${prefix}${data.currentAreaName}`;
        const mostCommonQual = largest(contentData, 'NoYear1').LabelName;
        const headline = `  ${mostCommonQual} employs more of ${prefixedAreaName}'s ${
          genderLookup[data.currentGenderName]
        } workforce than any other industry sector.`;

        return headline;
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
      DefaultValue: '3',
      Label: 'Gender:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Gender',
      ParamName: 'Sex',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
