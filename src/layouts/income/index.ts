import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { capitalise } from '../../utils';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Income_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'UR', ${Sex}, 1, null, ${Indkey}) order by LabelKey DESC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  currentGenderName: getActiveToggle(filterToggles, 'Sex'),
});

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 96000)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Resident workers - Individual income`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        console.log('contentData: ', contentData);
        const genderLookup = {
          Persons: 'resident',
          Males: 'male resident',
          Females: 'female resident',
        };
        const { prefixedAreaName, currentGenderName, currentIndustryName } = data;
        const highIncomer = _.sumBy(
          contentData.filter(({ LabelKey }) => LabelKey < 999999 && LabelKey > 3110),
          'NoYear1',
        );
        console.log('highIncomer: ', highIncomer);
        const headlineAlt = `${capitalise(
          prefixedAreaName,
        )} Region labour force have a lower proportion of people with high incomes ($1,750 or more per week) than South Australia.`;
        // const headlineAlt = `There are more ${genderLookup[currentGenderName]} workers (${currentIndustryName}) qualified in ${mostCommonQual} in ${prefixedAreaName} than in any other field.`;

        return headlineAlt;
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
      DefaultValue: '23000',
      Label: 'Current industry:',
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
