import { sqlConnection } from '../../utils/sql';

import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent, formatNumber } from '../../utils';

// select * from [dbo].[fn_WP_Contribution_Stats_AnnualHistory](476,10,20,23400,1, 50000)

const query = ({ ClientID, WebID, BMID, IndkeyNieir, Measure }) => {
  return `select * from CommData_Economy.[dbo].[fn_WP_Contribution_Stats_AnnualHistory](${ClientID}, ${WebID}, ${BMID},  ${IndkeyNieir}, 1, ${Measure}) order by SeriesYear desc`;
};

const fetchData = async ({ filters }) => await sqlConnection.raw(query(filters));

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentMeasure: getActiveToggle(filterToggles, 'Measure'),
    currentIndustryName: getActiveToggle(filterToggles, 'IndkeyNieir'),
  };
  return activeCustomToggles;
};

const headLine = ({ data, contentData, filters }) => {
  const indText = +filters.IndkeyNieir === 22000 ? '' : data.currentIndustryName;
  const year2019 = contentData.filter(({ SeriesYear }) => SeriesYear === 2019)[0];
  const headline = `In 2018/19, ${data.prefixedAreaName} contributed ${formatPercent(year2019.CperBM)}% to ${
    data.currentBenchmarkName
  }’s ${indText} ${data.currentMeasure.toLowerCase()}.`;
  const mostRecentYear = contentData[0];
  const comparisonText = mostRecentYear.NUmber > mostRecentYear.BMNumber ? 'higher' : 'lower';
  const headlineAlt = `In 2018/19, ${indText} worker productivity ($ per worker) in ${data.prefixedAreaName} was ${comparisonText} compared to ${data.currentBenchmarkName}.`;
  return +filters.Measure === 100001 ? headlineAlt : headline;
};

const pageContent = {
  entities: [
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => headLine({ data, contentData, filters }),
    },
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Time series industry sector analysis`;
      },
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
    },
    {
      Title: 'Banner',
      renderString: (): string =>
        `2019/20 Trade (imports and exports) and local sales information will be updated soon`.toUpperCase(),
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
      DefaultValue: '22000',
      Label: 'Industry:',
      Params: [
        {
          a: '1',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_IndustryNieir86',
      ParamName: 'IndkeyNieir',
    },
    {
      Database: 'CommApp',
      DefaultValue: '10001',
      Label: 'Measure:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Contribution_Type',
      ParamName: 'Measure',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
