import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent, formatNumber } from '../../utils';

//SELECT * FROM dbo.fn_Industry_IncomeQuartiles (102,10,23001,2016,2011,'UR',3,1,null,23000)
const incomeQuartilesQuery = {
  id: 1,
  name: `incomeQuartiles`,
  query: ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_WP_IncomeQuartiles]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', ${Sex}, 1, null, ${Indkey}) order by LabelKey DESC`,
};

// select * from CommData_Economy.[dbo].[fn_QuartileRanges](105, 40, 23000,'UR', 3, 31000)
const QuartileRangesQuery = {
  id: 2,
  name: `quartileRange`,
  query: ({ ClientID, IGBMID, Sex, Indkey }) =>
    `select * from CommData_Economy.[dbo].[fn_QuartileRanges]( ${ClientID}, ${IGBMID}, ${Indkey}, 'WP', ${Sex}, 30000 ) order by LabelKey DESC`,
};

const queries = [incomeQuartilesQuery, QuartileRangesQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, name, id }) => {
      return { id, name, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  currentGenderName: getActiveToggle(filterToggles, 'Sex'),
});

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 999999)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Local workers - Individual income quartiles - ${data.currentIndustryName}`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Australian Bureau of Statistics (ABS) – Census 2011 and 2016 – by place of work`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        const { prefixedAreaName, currentGenderName, currentIndustryName } = data;
        const { Sex, Indkey } = filters;
        const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
        const industryText = +Indkey == 23000 ? '' : ` (${currentIndustryName})`;
        const largestQuartile = `'${largest(contentData[0].data, 'NoYear1').LabelName.toLowerCase()}'`;
        const largestPercent = `${formatNumber(largest(contentData[0].data, 'NoYear1').PerYear1)}`;
        return `In ${prefixedAreaName}, the ${largestQuartile} quartile is the largest group, comprising ${largestPercent}% of the ${genderText} local workers${industryText}.`;
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
