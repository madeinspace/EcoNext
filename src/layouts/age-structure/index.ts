import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_Age_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'UR', ${Sex}, 1, null, ${Indkey} ) order by LabelKey ASC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentGenderName: getActiveToggle(filterToggles, 'Sex'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Resident workers - Age structure`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName, currentGenderName, currentIndustryName } = data;
        const genderLookup = {
          Persons: 'resident',
          Males: 'male resident',
          Females: 'female resident',
        };
        const total = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
        const withoutTotal = contentData.filter(node => node.LabelKey != 999999);
        const youngest = withoutTotal.slice(0, 3);
        const oldest = withoutTotal.slice(3);
        const youngestTotal = total(youngest, 'NoYear1');
        const oldestTotal = total(oldest, 'NoYear1');
        const comparison = youngestTotal > oldestTotal ? `under` : `over`;

        const headlineAlt = `In ${prefixedAreaName}, most ${genderLookup[currentGenderName]} workers in ${currentIndustryName} are ${comparison} 45 years old.`;

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
