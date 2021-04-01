import { sqlConnection } from '../../utils/sql';
import { formatNumber } from '../../utils';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';

// select * from [dbo].[fn_TRA_International_VistorNight](102,10,40) ORDER BY LabelKey DESC
const international_visitor_reason_Query = {
  id: 1,
  name: `international reason`,
  sql: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_International_Reason]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey Asc`,
};

// select * from [dbo].[fn_TRA_Overnight_VistorNight](102,10,40) ORDER BY LabelKey DESC
const overnight_vistor_reason_query = {
  id: 2,
  name: `overnight vistor night`,
  sql: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Overnight_Reason]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey Asc`,
};

// select * from [dbo].[fn_TRA_Daytrip_VistorNight](102,10,40)
const daytrip_vistor_reasonQuery = {
  id: 3,
  name: `daytrip vistor night`,
  sql: ({ ClientID, BMID, WebID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Daytrip_Reason]( ${ClientID}, ${WebID}, ${BMID}) order by LabelKey Asc`,
};

const queries = [international_visitor_reason_Query, overnight_vistor_reason_query, daytrip_vistor_reasonQuery];

const fetchData = async ({ filters }) => {
  const query: any = queries[filters.Tourismtype - 1]['sql'];
  return await sqlConnection.raw(query(filters));
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
    currentTourismtype: getActiveToggle(filterToggles, 'Tourismtype'),
  };
  return activeCustomToggles;
};

const largest = (arr, key) => {
  return arr
    .filter(a => a.LabelKey < 9999)
    .sort((a, b) => {
      const result = b[key] - a[key];
      return result === 0 ? null : result;
    })[0];
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Visitors by reason`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Tourism Research Australia – Survey data`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName, currentAreaName, currentTourismtype } = data;
        const withoutTotal = contentData.filter(({ LabelKey }) => LabelKey != 9999);
        let isMoot = true;
        for (const el of withoutTotal) {
          if (el['Per'] != null) {
            isMoot = false;
            break;
          }
        }

        if (isMoot)
          return `${currentAreaName} ${currentTourismtype} data is suppressed in 2019/20 due to low sample size`;
        const largestReason = largest(withoutTotal, 'Per');
        const visitorsReason =
          largestReason.LabelKey === 1001
            ? 'be visiting friends and relatives'
            : `be visiting ${largestReason.LabelKey != 1006 ? 'on' : 'for'} ${largestReason.ReasonName}`;
        const headlineMain = `In the 5 years up to 2018/19, ${currentTourismtype} to ${prefixedAreaName} were more likely to ${visitorsReason}, accounting for ${largestReason.Per}% of all visitors.`;
        return headlineMain;
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
          ClientID: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_BM_Tourism_Sector_GCCSA',
      ParamName: 'BMID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Measure:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Tourism',
      ParamName: 'Tourismtype',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
