import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent } from '../../utils';

const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) => {
  return `select * from CommData_Economy.[dbo].[fn_Industry_HoursWorked_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', ${Sex}, 1, null, ${Indkey} ) order by LabelKey ASC`;
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
      renderString: ({ data }): string => `Local workers - Hours worked - ${data.currentIndustryName}`,
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string =>
        `Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) & 2016 – by place of work`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName, currentGenderName } = data;
        const notStatedID = 22009;
        const totalID = 999999;
        const total = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
        const totalHours = contentData.filter(({ LabelKey }) => LabelKey != totalID && LabelKey != notStatedID);
        const fullTime = totalHours.slice(4);
        const partTime = totalHours.slice(0, 4);
        const totalPartTimeClient = formatPercent(total(partTime, 'PerYear1'));
        const totalFullTimeClient = formatPercent(total(fullTime, 'PerYear1'));
        const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
        const headlineAlt = `${totalPartTimeClient}% of ${data.currentIndustryName} ${genderText} local workers in ${prefixedAreaName} are employed part-time and ${totalFullTimeClient}% are employed full-time.`;
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
