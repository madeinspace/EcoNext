import { sqlConnection } from '../../utils/sql';

import Page from './page';
import { formatMillionsCurrency, formatPercent } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';

const BuildingApprovalsSQL = ({ ClientID, WebID, IGBMID, Indkey }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_Industry_KeyStats](${ClientID},${WebID},${IGBMID},2016,2011,${Indkey},'WP')`;

const fetchData = async ({ filters }) => await sqlConnection.raw(BuildingApprovalsSQL(filters));

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'IGBMID'),
  currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
});

const headline = ({ data, contentData }) => {
  const males = formatPercent(contentData.filter(({ LabelKey }) => LabelKey === 10002)[0].PerYear1);
  const females = formatPercent(contentData.filter(({ LabelKey }) => LabelKey === 10003)[0].PerYear1);
  return `In ${data.prefixedAreaName} ${males}% of the local workers are males and ${females}% are female.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `Local workers - Key statistics - ${data.currentIndustryName}`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
    },
    {
      Title: 'DataSource',
      renderString: (): string =>
        `Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) & 2016 – by place of work`,
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
