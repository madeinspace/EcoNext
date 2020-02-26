import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

//select * from [dbo].[fn_Industry_TravelMethod_Sex] (102,10,40,2016,2011,'WP',3,1,NULL,23000)
const contentDataQuery = ({ ClientID, IGBMID, Sex, Indkey, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_TravelMethod_Sex]( ${ClientID}, ${WebID}, ${IGBMID}, 2016, 2011, 'WP', 3, 1, null, ${Indkey} ) order by LabelKey ASC`;

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  };
  return activeCustomToggles;
};
const total = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);

const Subtitle = ({ toggles }) => {
  return `Local workers - Method of travel to work - ${toggles.currentIndustryName}`;
};

const Headline = ({ toggles, data }) => {
  const { prefixedAreaName, currentBenchmarkName, currentIndustryName } = toggles;
  const PTLabelKeys = [2003, 2007, 2011, 2012];
  const PT = data.filter(({ LabelKey }) => PTLabelKeys.includes(LabelKey));
  const PTtotalArea = total(PT, 'NoYear1');
  const PTtotalBM = total(PT, 'BMYear1');
  const comparison = Math.abs(PTtotalArea - PTtotalBM) < 5 ? 'similar' : PTtotalArea > PTtotalBM ? `higher` : `lower`;
  const headlineAlt = `Within ${prefixedAreaName}, there is a ${comparison} proportion of local ${currentIndustryName} workers using public transport to get to work than the ${currentBenchmarkName} workforce.`;

  return headlineAlt;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data: toggles }): string => Subtitle({ toggles }),
    },
    {
      Title: 'Headline',
      renderString: ({ data: toggles, contentData: data }): string => Headline({ toggles, data }),
    },
    {
      Title: 'DataSource',
      renderString: (): string =>
        `Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) & 2016 – by place of work`,
    },
    {
      Title: 'ChartRawDataSource',
      renderString: (): string =>
        `'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.'`,
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
