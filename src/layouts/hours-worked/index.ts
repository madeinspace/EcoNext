import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) => {
  return `select * from CommData_Economy.[dbo].[fn_Industry_HoursWorked_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'UR', ${Sex}, 1, null, ${Indkey} ) order by LabelKey ASC`;
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

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Resident workers - Hours worked`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const genderLookup = {
          Persons: 'resident',
          Males: 'male resident',
          Females: 'female resident',
        };
        const { prefixedAreaName, currentBenchmarkName } = data;
        const total = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
        const without = contentData.filter(node => node.LabelKey != 999999 && node.LabelKey != 22009);
        const over40 = without.slice(5);
        const over40TotalClient = formatPercent(total(over40, 'PerYear1'));
        const over40TotalBM = formatPercent(total(over40, 'BMYear1'));
        const headlineAlt = `${over40TotalClient}% of the ${genderLookup[data.currentGenderName]} workers (${
          data.currentIndustryName
        }) in ${prefixedAreaName} work 40 or more hours, compared to ${over40TotalBM}% in ${currentBenchmarkName}.`;

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
