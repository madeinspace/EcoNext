import { PageContext, ClientContext } from '../../../utils/context';
import { useContext } from 'react';
import getActiveToggle from '../../../utils/getActiveToggle';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import { formatNumber, formatChangeNumber, idlogo, formatPercent } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import { NierLink, IdLink } from '../../../components/ui/links';

const FullContent = () => {
  const { clientAlias } = useContext(ClientContext);
  const { contentData, filterToggles } = useContext(PageContext);
  const currentBenchmark = getActiveToggle(filterToggles, 'BMID');
  const GRPChartData = GRPChartBuilder(contentData);
  const CumulitativeChangeChartData = CumulitativeChangeChartBuilder(contentData, currentBenchmark);
  const AnnualChangeChartData = AnnualChangeChartBuilder(contentData, currentBenchmark);
  const tableParams = tableBuilder(currentBenchmark, clientAlias, contentData);

  return (
    <>
      <ItemWrapper>
        <EntityChart data={GRPChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={CumulitativeChangeChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={AnnualChangeChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableParams} name={'GRP'} />
      </ItemWrapper>
    </>
  );
};

export default FullContent;

const tableBuilder = (currentBenchmark, clientAlias, rows) => {
  const tableTitle = 'Gross Regional Product (GRP)';
  const clientLongName = rows[0].GeoName;
  const totalColSpan = 8;

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
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

// #region Source
const TableSource = () => (
  <p>
    Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. Data are based on a 2016-17 price
    base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data
    releases adjust previous years’ figures to a new base year.Learn more *Cumulative change uses 2010 as the base year.
  </p>
);
// #endregion

// #region Source
const ChartSource = () => (
  <p>
    Source: <NierLink /> ©2019 Compiled and presented in economy.id by <IdLink />.
  </p>
);
// #endregion

const rawDataSource =
  'Source: National Institute of Economic and Industry Research(NIEIR) ©2019. Compiled and presented in economy.id by.id, the population experts Data are based on a 2016 - 17 price base for all years.NIEIR - ID data are inflation adjusted each year to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.Learn more * Cumulative change uses 2010 as the base year.';

const GRPChartBuilder = nodes => {
  const chartTitle = 'Gross Regional Product';
  const chartType = 'column';
  const geoName = nodes[0].GeoName;
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'GRP $million';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'grp-chart';
  const categories = _.map(nodes, 'Year_End').reverse();
  const serie = _.map(nodes, 'HeadLineGRP').reverse();
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${geoName}: $${formatNumber(
      this.y,
    )} millions`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: geoName,
      },
      series: [
        {
          data: serie,
        },
      ],
      xAxis: {
        categories,
        title: {
          text: xAxisTitle,
        },
      },
      yAxis: [
        {
          title: {
            text: yAxisTitle,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
      tooltip: {
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};

const CumulitativeChangeChartBuilder = (nodes, currentBenchmark) => {
  const chartTitle = 'Cumulative change in Gross Regional Product';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Cumulitative change in gross regional product';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'cumulitative-chart';
  const geoName = nodes[0].GeoName;
  const categories = _.map(nodes, 'Year_End').reverse();
  const serie0 = _.map(nodes, 'ChangePer3').reverse();
  const serie1 = _.map(nodes, 'BMChangePer3').reverse();
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: $${formatNumber(
      this.y,
    )} millions`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
        styledMode: true,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: geoName,
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
          text: xAxisTitle,
        },
      },
      yAxis: [
        {
          title: {
            text: yAxisTitle,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
      tooltip: {
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};

const AnnualChangeChartBuilder = (nodes, currentBenchmark) => {
  const chartType = 'line';
  const chartTitle = 'Annual change in Gross Regional Product';
  const yAxisTitle = '% change from previous year'; // vert axis
  const xAxisTitle = 'Year ending June'; // horizontal axis
  const categories = _.map(nodes, 'Year_End').reverse();
  const clientSerie = _.map(nodes, 'ChangePer').reverse();
  const benchmarkSerie = _.map(nodes, 'BMchangePer').reverse();
  const averageSerie = _.map(nodes, 'ChangePer4').reverse();
  const geoName = nodes[0].GeoName;
  const chartContainerID = 'annual-chart';
  const averageSerieName = 'Average annual growth rate';
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatPercent(
      this.y,
    )}%`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      series: [
        {
          name: geoName,
          data: clientSerie,
        },
        {
          name: currentBenchmark,
          data: benchmarkSerie,
        },
        {
          name: averageSerieName,
          data: averageSerie,
        },
      ],
      xAxis: {
        categories,
        title: {
          text: xAxisTitle,
        },
      },
      yAxis: [
        {
          title: {
            text: yAxisTitle,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return `${formatNumber(this.value)}%`;
            },
          },
        },
      ],
      tooltip: {
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
