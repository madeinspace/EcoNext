import { PageContext, ClientContext } from '../../../utils/context';
import { useContext } from 'react';
import getActiveToggle from '../../../utils/getActiveToggle';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import { formatNumber, formatChangeNumber, idlogo, formatPercent, formatShortDecimal } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import { NierLink, IdLink } from '../../../components/ui/links';

const FullContent = () => {
  const { clientAlias } = useContext(ClientContext);
  const { contentData, filterToggles } = useContext(PageContext);
  const benchmarkList: any = filterToggles.filter(({ key }) => key === 'BMID')[0];
  const defaultBenchmarkName = benchmarkList.default.Label;
  const GRPChartData = JobsChartBuilder(contentData);
  const AnnualChangeChartData = AnnualChangeJobsChartBuilder(contentData, defaultBenchmarkName);
  const tableParams = tableBuilder(defaultBenchmarkName, clientAlias, contentData);

  return (
    <>
      <ItemWrapper>
        <EntityChart data={GRPChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={AnnualChangeChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableParams} name={'Local jobs'} />
      </ItemWrapper>
    </>
  );
};

export default FullContent;

// #region Source
const Source = () => (
  <p>
    Source: <NierLink /> National Institute of Economic and Industry Research (NIEIR) ©2021. Compiled and presented in
    economy.id by <IdLink />
  </p>
);

// #endregion

const tableBuilder = (defaultBenchmarkName, clientAlias, rows) => {
  const tableTitle = 'Local jobs';
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
            colSpan: 2,
          },
          {
            cssClass: 'odd ',
            displayText: defaultBenchmarkName,
            colSpan: 2,
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
        displayText: 'Number',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '% change',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: 'Number',
        cssClass: 'odd int',
      },
      {
        id: 4,
        displayText: '% change',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: `${clientLongName} as a % of ${defaultBenchmarkName}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: rows.map(({ Year_End, LocalJobs, ChangePer, BMchangePer, BMLJ, WEBperBM }, i: number) => ({
      data: [Year_End, LocalJobs, ChangePer, BMLJ, BMchangePer, WEBperBM],
      formattedData: [
        Year_End,
        formatNumber(LocalJobs),
        formatChangeNumber(ChangePer, '--'),
        formatNumber(BMLJ),
        formatChangeNumber(BMchangePer, '--'),
        formatShortDecimal(WEBperBM),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};

const rawDataSource =
  'Source: National Institute of Economic and Industry Research(NIEIR) ©2021. Compiled and presented in economy.id by.id informed decisions Data are based on a 2016 - 17 price base for all years.NIEIR - ID data are inflation adjusted each year to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.Learn more * Cumulative change uses 2010 as the base year.';

const JobsChartBuilder = nodes => {
  const chartTitle = 'Local jobs';
  const chartType = 'column';
  const geoName = nodes[0].GeoName;
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Local jobs';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2021 Compiled and presented in economy.id by .id informed decisions';
  const chartContainerID = 'grp-chart';
  const categories = _.map(nodes, 'Year_End').reverse();
  const serie = _.map(nodes, 'LocalJobs').reverse();
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${geoName}: ${formatNumber(this.y)}`;
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
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
  };
};

const AnnualChangeJobsChartBuilder = (nodes, defaultBenchmarkName) => {
  const chartType = 'line';
  const chartTitle = 'Annual change in local jobs';
  const yAxisTitle = '% change from previous year'; // vert axis
  const xAxisTitle = 'Year ending June'; // horizontal axis
  const categories = _.map(nodes, 'Year_End').reverse();
  const clientSerie = _.map(nodes, 'ChangePer').reverse();
  const benchmarkSerie = _.map(nodes, 'BMchangePer').reverse();
  const averageSerie = _.map(nodes, 'ChangePer2').reverse();
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
          name: defaultBenchmarkName,
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
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
