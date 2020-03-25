import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent, multiplesOf, formatNumber } from '../../utils';

// select * from [fn_Agriculture_2016_ParentChild] (689,10,40,2016,2011,1,null) ORDER BY LABELKEY
const contentDataQuery = ({ ClientID, BMID, WebID }) =>
  `select * from CommData_Economy.[dbo].[fn_Agriculture_2016_ParentChild](${ClientID}, ${WebID}, ${BMID}, 2016, 2011,1,null) order by LabelKey DESC
  `;

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey != 999999)
    .sort((a, b) => {
      return b[key] - a[key];
    })[0];
};

const fetchData = async ({ filters }) => await sqlConnection.raw(contentDataQuery(filters));

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  };
  return activeCustomToggles;
};

const headline = ({ data, contentData }) => {
  const total = contentData.filter(({ LabelKey }) => LabelKey === 90000);
  const withoutTotal = contentData.filter(({ LabelKey }) => LabelKey != 90000);
  const parents = multiplesOf(withoutTotal, 1000).sort((a, b) => (a.LabelName > b.LabelName ? 1 : -1));
  const largestCommodity = largest(parents, 'NoYear1');
  return `In 2015/16, the total value of agricultural output in ${data.prefixedAreaName} was $${formatNumber(
    total[0].NoYear1 / 1000000,
  )}m. The largest commodity produced was ${largestCommodity.LabelName}, which accounted for ${formatPercent(
    largestCommodity.PerYear1,
  )}% of ${data.prefixedAreaName}’s total agricultural output in value terms.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => 'Agriculture',
    },
    {
      Title: 'DataSource',
      renderString: (): string =>
        'Australian Bureau of Statistics (ABS) - Value of Agricultural Commodities Produce 2015-16',
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
