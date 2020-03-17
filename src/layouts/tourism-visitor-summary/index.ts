import { sqlConnection } from '../../utils/sql';
import Page from './page';
import getActiveToggle from '../../utils/getActiveToggle';
import { formatPercent, formatNumber } from '../../utils';

// select * from [dbo].[fn_TRA_Summary1](102,10,40) ORDER BY LabelKey DESC
const visitor_nights_numbersQuery = {
  id: 1,
  name: `visitor_nights_numbers`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Summary1]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Summary2](102,10,40) ORDER BY LabelKey DESC
const visitor_nights_percentQuery = {
  id: 2,
  name: `visitor_nights_percent`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Summary2]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Summary_Chart2](102,10,40)
const time_serie_tourismQuery = {
  id: 3,
  name: `visitor_nights_percent`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Summary_Chart2]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

// select * from [dbo].[fn_TRA_Summary_Chart1](102,10,40)
const breakup_visitor_nightsQuery = {
  id: 4,
  name: `breakup_visitor_nights`,
  query: ({ ClientID, BMID }) =>
    `select * from CommData_Economy.[dbo].[fn_TRA_Summary_Chart1]( ${ClientID}, 10, ${BMID}) order by LabelKey DESC`,
};

const queries = [
  visitor_nights_numbersQuery,
  visitor_nights_percentQuery,
  breakup_visitor_nightsQuery,
  time_serie_tourismQuery,
];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, name, id }) => {
      return { id, name, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentTourismType: getActiveToggle(filterToggles, 'Tourismtype'),
});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Tourism visitor summary`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `Tourism Research Australia – Survey data`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => {
        const { prefixedAreaName } = data;
        const startYear = contentData[0].data[0]['FinYearName'];
        const intVisitors = contentData[0].data[0]['International Visitor Nights'];
        const intVisitorsPerc = contentData[1].data[0]['International Visitor Nights'];
        return `For ${startYear}, there were ${formatNumber(
          intVisitors,
        )} international visitors nights in ${prefixedAreaName}, accounting for ${formatPercent(
          intVisitorsPerc,
        )}% of the total visitor nights.`;
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
      StoredProcedure: 'sp_Toggle_Econ_Tourism_Decoy',
      ParamName: 'Tourismtype',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
