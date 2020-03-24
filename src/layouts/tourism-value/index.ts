import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatPercent, multiplesOf, formatMillionsCurrencyNoRounding, formatOneDecimal } from '../../utils';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';

// select * from [dbo].[fn_IAM_Tourism](102,10,40,2019,2014) where LabelKey in (10,20,30,40) or TableType in (1,2)
const SQLQuery = {
  id: 1,
  query: ({ ClientID, WebID, BMID, sEndYear, sStartYear }) =>
    `SELECT * from CommData_Economy.[dbo].[fn_IAM_Tourism](${ClientID},${WebID},${BMID}, ${sStartYear}, ${sEndYear}) where LabelKey in (10,20,30,40) or TableType in (1,2)`,
};

// select * from [dbo].[fn_IAM_Tourism](102,10,40,2019,2014) where TableType in (5) and LabelKey in (11,12,21,22,31,32,41,42)
const ChartSQLQuery = {
  id: 2,
  query: ({ ClientID, WebID, BMID, sEndYear, sStartYear }) =>
    `SELECT * from CommData_Economy.[dbo].[fn_IAM_Tourism](${ClientID},${WebID},${BMID}, ${sStartYear}, ${sEndYear}) where TableType in (5) and LabelKey in (11,12,21,22,31,32,41,42)`,
};

const queries = [SQLQuery, ChartSQLQuery];

const fetchData = async ({ filters }) =>
  await Promise.all(
    queries.map(async ({ query, id }) => {
      return { id, data: await sqlConnection.raw(query(filters)) };
    }),
  );

const activeCustomToggles = ({ filterToggles }) => ({
  currentBenchmarkName: getActiveToggle(filterToggles, 'BMID'),
  currentStartYear: getActiveToggle(filterToggles, 'sStartYear'),
  currentComparisonYear: getActiveToggle(filterToggles, 'sEndYear'),
});

const headline = ({ data, contentData }) => {
  const distinctMeasures = multiplesOf(contentData[0].data, 10);
  const parents: any = distinctMeasures.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        id: cur.LabelKey,
        displayText: cur.LabelName,
        children: contentData[0].data.filter(({ LabelKey }) => LabelKey > cur.LabelKey && LabelKey < cur.LabelKey + 10),
      },
    ],
    [],
  );
  const orderedParents = [...parents].sort();
  const totalOutputSale = contentData[0].data.filter(({ LabelKey }) => LabelKey === 33)[0];
  const totalValueAdded = contentData[0].data.filter(({ LabelKey }) => LabelKey === 43)[0];

  return `In ${data.currentStartYear} , the total tourism and hospitality sales in ${
    data.prefixedAreaName
  } was $${formatOneDecimal(totalOutputSale['NoYear1'])}m, the total value added was $${formatOneDecimal(
    totalValueAdded['NoYear1'],
  )} million.`;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Tourism and hospitality value`,
    },
    {
      Title: 'DataSource',
      renderString: (): string => `National Economics (NIEIR) - Modelled series`,
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
          ClientID: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_BM_Tourism_Sector',
      ParamName: 'BMID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '2019',
      Label: 'Year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_Start_Tourism',
      ParamName: 'sStartYear',
      Hidden: true,
    },
    {
      Database: 'CommApp',
      DefaultValue: '2014',
      Label: 'Comparison year:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Struct_Years_End_Tourism',
      ParamName: 'sEndYear',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
