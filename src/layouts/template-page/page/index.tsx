// #region imports
import _ from 'lodash';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent, idlogo } from '../../../utils';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
// #endregion

// #region template page
const TemplatePage = () => {
  // const { clientAlias } = useContext(ClientContext);
  // const { tableData } = useContext(PageContext);

  const tableData = [
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2019,
      HeadLineGRP: 18686.6214526371,
      ChangePer: 7.0242,
      ChangePer2: 68.1467,
      ChangePer3: 168.1467,
      ChangePer4: 2.8901,
      BMGRP: 376518.277314811,
      BMchangePer: 6.1186,
      BMChangePer2: 85.3927,
      BMChangePer3: 185.3927,
      BMChangePer4: 3.4448,
      WEBperBM: 4.963,
      RRI: null,
      RRIBM: null,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2018,
      HeadLineGRP: 17460.1869372863,
      ChangePer: 5.6396,
      ChangePer2: 57.111,
      ChangePer3: 157.111,
      ChangePer4: 2.8901,
      BMGRP: 354808.773547684,
      BMchangePer: 4.0473,
      BMChangePer2: 74.7032,
      BMChangePer3: 174.7032,
      BMChangePer4: 3.4448,
      WEBperBM: 4.921,
      RRI: 7.0242,
      RRIBM: 6.1186,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2017,
      HeadLineGRP: 16528.0699951362,
      ChangePer: 4.3631,
      ChangePer2: 48.7236,
      ChangePer3: 148.7236,
      ChangePer4: 2.8901,
      BMGRP: 341007.195382804,
      BMchangePer: 4.6801,
      BMChangePer2: 67.9075,
      BMChangePer3: 167.9075,
      BMChangePer4: 3.4448,
      WEBperBM: 4.8468,
      RRI: 6.3296,
      RRIBM: 5.0779,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2016,
      HeadLineGRP: 15837.0868650997,
      ChangePer: 4.2457,
      ChangePer2: 42.5059,
      ChangePer3: 142.5059,
      ChangePer4: 2.8901,
      BMGRP: 325761.378042726,
      BMchangePer: 4.1515,
      BMChangePer2: 60.4007,
      BMChangePer3: 160.4007,
      BMChangePer4: 3.4448,
      WEBperBM: 4.8616,
      RRI: 5.6694,
      RRIBM: 4.9446,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2015,
      HeadLineGRP: 15192.0716833696,
      ChangePer: 3.5555,
      ChangePer2: 36.7019,
      ChangePer3: 136.7019,
      ChangePer4: 2.8901,
      BMGRP: 312776.491817174,
      BMchangePer: 3.5859,
      BMChangePer2: 54.0071,
      BMChangePer3: 154.0071,
      BMChangePer4: 3.4448,
      WEBperBM: 4.8572,
      RRI: 5.3121,
      RRIBM: 4.7461,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2014,
      HeadLineGRP: 14670.46495515,
      ChangePer: 3.1029,
      ChangePer2: 32.0084,
      ChangePer3: 132.0084,
      ChangePer4: 2.8901,
      BMGRP: 301948.894850196,
      BMchangePer: 3.0372,
      BMChangePer2: 48.6757,
      BMChangePer3: 148.6757,
      BMChangePer4: 3.4448,
      WEBperBM: 4.8586,
      RRI: 4.9584,
      RRIBM: 4.5131,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2013,
      HeadLineGRP: 14228.9510750585,
      ChangePer: 0.7599,
      ChangePer2: 28.0355,
      ChangePer3: 128.0355,
      ChangePer4: 2.8901,
      BMGRP: 293048.353123404,
      BMchangePer: 1.6892,
      BMChangePer2: 44.2932,
      BMChangePer3: 144.2932,
      BMChangePer4: 3.4448,
      WEBperBM: 4.8555,
      RRI: 4.645,
      RRIBM: 4.2639,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2012,
      HeadLineGRP: 14121.6421588119,
      ChangePer: 1.0948,
      ChangePer2: 27.07,
      ChangePer3: 127.07,
      ChangePer4: 2.8901,
      BMGRP: 288180.289316975,
      BMchangePer: 1.7453,
      BMChangePer2: 41.8962,
      BMChangePer3: 141.8962,
      BMChangePer4: 3.4448,
      WEBperBM: 4.9003,
      RRI: 4.0809,
      RRIBM: 3.892,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2011,
      HeadLineGRP: 13968.7163753932,
      ChangePer: 3.2465,
      ChangePer2: 25.6939,
      ChangePer3: 125.6939,
      ChangePer4: 2.8901,
      BMGRP: 283237.045405271,
      BMchangePer: 2.6312,
      BMChangePer2: 39.4622,
      BMChangePer3: 139.4622,
      BMChangePer4: 3.4448,
      WEBperBM: 4.9318,
      RRI: 3.7043,
      RRIBM: 3.6226,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2010,
      HeadLineGRP: 13529.4835130604,
      ChangePer: 1.2518,
      ChangePer2: 21.7416,
      ChangePer3: 121.7416,
      ChangePer4: 2.8901,
      BMGRP: 275975.556337326,
      BMchangePer: 2.3199,
      BMChangePer2: 35.8868,
      BMChangePer3: 135.8868,
      BMChangePer4: 3.4448,
      WEBperBM: 4.9024,
      RRI: 3.653,
      RRIBM: 3.5116,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2009,
      HeadLineGRP: 13362.2194834986,
      ChangePer: -0.0387,
      ChangePer2: 20.2365,
      ChangePer3: 120.2365,
      ChangePer4: 2.8901,
      BMGRP: 269718.451661833,
      BMchangePer: 1.5259,
      BMChangePer2: 32.8059,
      BMChangePer3: 132.8059,
      BMChangePer4: 3.4448,
      WEBperBM: 4.9541,
      RRI: 3.4106,
      RRIBM: 3.3921,
      ChangePer10: 3.4284,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2008,
      HeadLineGRP: 13367.3946697177,
      ChangePer: 1.6152,
      ChangePer2: 20.2831,
      ChangePer3: 120.2831,
      ChangePer4: 2.8901,
      BMGRP: 265664.547577666,
      BMchangePer: 3.6624,
      BMChangePer2: 30.8098,
      BMChangePer3: 130.8098,
      BMChangePer4: 3.4448,
      WEBperBM: 5.0317,
      RRI: 3.0919,
      RRIBM: 3.2208,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2007,
      HeadLineGRP: 13154.9109464965,
      ChangePer: 1.3231,
      ChangePer2: 18.3711,
      ChangePer3: 118.3711,
      ChangePer4: 2.8901,
      BMGRP: 256278.554365144,
      BMchangePer: 4.218,
      BMChangePer2: 26.1882,
      BMChangePer3: 126.1882,
      BMChangePer4: 3.4448,
      WEBperBM: 5.1331,
      RRI: 2.9671,
      RRIBM: 3.2565,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2006,
      HeadLineGRP: 12983.1273077287,
      ChangePer: 2.0292,
      ChangePer2: 16.8253,
      ChangePer3: 116.8253,
      ChangePer4: 2.8901,
      BMGRP: 245906.285132839,
      BMchangePer: 2.2518,
      BMChangePer2: 21.0811,
      BMChangePer3: 121.0811,
      BMChangePer4: 3.4448,
      WEBperBM: 5.2797,
      RRI: 2.8399,
      RRIBM: 3.3303,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2005,
      HeadLineGRP: 12724.9155582251,
      ChangePer: 3.5345,
      ChangePer2: 14.5019,
      ChangePer3: 114.5019,
      ChangePer4: 2.8901,
      BMGRP: 240490.804507147,
      BMchangePer: 3.1146,
      BMChangePer2: 18.4145,
      BMChangePer3: 118.4145,
      BMChangePer4: 3.4448,
      WEBperBM: 5.2912,
      RRI: 2.7815,
      RRIBM: 3.2525,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2004,
      HeadLineGRP: 12290.5084999681,
      ChangePer: 3.0418,
      ChangePer2: 10.593,
      ChangePer3: 110.593,
      ChangePer4: 2.8901,
      BMGRP: 233226.690930193,
      BMchangePer: 3.6957,
      BMChangePer2: 14.8378,
      BMChangePer3: 114.8378,
      BMChangePer4: 3.4448,
      WEBperBM: 5.2698,
      RRI: 2.8297,
      RRIBM: 3.2413,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2003,
      HeadLineGRP: 11927.6943860137,
      ChangePer: 4.1912,
      ChangePer2: 7.3283,
      ChangePer3: 107.3283,
      ChangePer4: 2.8901,
      BMGRP: 224914.461476145,
      BMchangePer: 5.0088,
      BMChangePer2: 10.745,
      BMChangePer3: 110.745,
      BMChangePer4: 3.4448,
      WEBperBM: 5.3032,
      RRI: 2.8456,
      RRIBM: 3.2727,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2002,
      HeadLineGRP: 11447.8927811266,
      ChangePer: 3.0109,
      ChangePer2: 3.0109,
      ChangePer3: 103.0109,
      ChangePer4: 2.8901,
      BMGRP: 214186.202769018,
      BMchangePer: 5.4625,
      BMChangePer2: 5.4625,
      BMChangePer3: 105.4625,
      BMChangePer4: 3.4448,
      WEBperBM: 5.3448,
      RRI: 2.9231,
      RRIBM: 3.3727,
      ChangePer10: null,
    },
    {
      ClientID: 102,
      WebID: 10,
      GeoName: 'City of Monash',
      Year_End: 2001,
      HeadLineGRP: 11113.2819260158,
      ChangePer: null,
      ChangePer2: null,
      ChangePer3: 100,
      ChangePer4: null,
      BMGRP: 203092.289481178,
      BMchangePer: null,
      BMChangePer2: null,
      BMChangePer3: 100,
      BMChangePer4: null,
      WEBperBM: 5.472,
      RRI: 2.9261,
      RRIBM: 3.4854,
      ChangePer10: null,
    },
  ];
  const clientAlias = 'clientAlias';
  const currenBenchmark = 'Victoria';
  const chartLineData = chartLineBuilder(currenBenchmark, clientAlias, tableData);
  const tableParams = tableBuilder(currenBenchmark, clientAlias, tableData);
  return (
    <>
      <ItemWrapper>
        <EntityChart data={chartLineData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} />
      </ItemWrapper>
    </>
  );
};
export default TemplatePage;
// #endregion

// #region Source
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region tableBuilder
const tableBuilder = (currentBenchmark, clientAlias, rows) => {
  console.log('tableData: ', rows);
  const tableTitle = 'Gross Regional Product (GRP)';
  const clientLongName = rows[0].GeoName;
  const totalColSpan = 8;

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    anchorName: tableTitle,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: totalColSpan,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: clientLongName,
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: currentBenchmark,
            colSpan: 3,
          },
          {
            cssClass: 'even',
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: '$GRP $m',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '% change from previous year',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: 'Cumulative change',
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: '$GRP $m',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: '% change from previous year',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: 'Cumulative change',
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: `${clientLongName} as a % of ${currentBenchmark}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: rows.map(
      ({ Year_End, HeadLineGRP, ChangePer, ChangePer3, BMGRP, BMchangePer, BMChangePer3, WEBperBM }, i: number) => ({
        data: [Year_End, HeadLineGRP, ChangePer, ChangePer3, BMGRP, BMchangePer, BMChangePer3, WEBperBM],
        formattedData: [
          Year_End,
          formatNumber(HeadLineGRP),
          formatChangeNumber(ChangePer, '--'),
          formatNumber(ChangePer3),
          formatChangeNumber(BMGRP, '--'),
          formatChangeNumber(BMchangePer, '--'),
          formatChangeNumber(BMChangePer3, '--'),
          formatChangeNumber(WEBperBM, '--'),
        ],
        id: i,
      }),
    ),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chartLineBuilder
const chartLineBuilder = (currentBenchmark, clientAlias, rows) => {
  const chartType = 'line';
  const geoName = rows[0].GeoName;
  const categories = _.map(rows, 'Year_End').reverse();
  const serie0 = _.map(rows, 'ChangePer3').reverse();
  const serie1 = _.map(rows, 'BMChangePer3').reverse();
  const mainChartTitle = 'Chart 1 Main chart title';
  const xAxisLegend = 'Year ending June';
  const yAxisLegend = 'Percentage change';
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: chartType,
      },
      title: {
        text: mainChartTitle,
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="hcurrenBenchmarkighcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatShortDecimal(this.y)}%`;
        },
      },
      series: [
        {
          name: geoName,
          data: serie0,
        },
        {
          name: currentBenchmark,
          data: serie1,
        },
      ],
      xAxis: {
        categories,
        title: {
          text: xAxisLegend,
        },
      },
      yAxis: [
        {
          title: {
            text: yAxisLegend,
          },
          labels: {
            formatter: function() {
              return formatChangeNumber(this.value);
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
// #endregion
