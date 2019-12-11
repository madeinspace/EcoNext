import { PageContext, ClientContext } from '../../../utils/context';
import { useContext } from 'react';
import getActiveToggle from '../../../utils/getActiveToggle';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import { formatNumber, formatChangeNumber } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';

const FullContent = () => {
  const { clientAlias } = useContext(ClientContext);
  const { tableData, filterToggles, entities } = useContext(PageContext);
  console.log('entities: ', entities);
  const currentBenchmark = getActiveToggle(filterToggles, 'BMID');
  const GRPChartData = GRPChartBuilder(tableData);
  const CumulitativeChangeChartData = CumulitativeChangeChartBuilder(tableData);
  const AnnualChangeChartData = AnnualChangeChartBuilder(tableData);
  const tableParams = tableBuilder(currentBenchmark, clientAlias, tableData);

  return (
    <>
      <ItemWrapper>
        <EntityChart data={GRPChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={CumulitativeChangeChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableParams} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={AnnualChangeChartData} />
      </ItemWrapper>
    </>
  );
};

export default FullContent;

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
        key: 'hr0',
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1,
          },
          {
            cssClass: 'xeven ',
            displayText: clientLongName,
            colSpan: 3,
          },
          {
            cssClass: 'xodd ',
            displayText: currentBenchmark,
            colSpan: 3,
          },
          {
            cssClass: 'xeven',
            displayText: '',
            colSpan: 1,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: '$GRP $m',
        cssClass: 'xeven int',
      },
      {
        id: 2,
        displayText: '% change from previous year',
        cssClass: 'xeven int',
      },
      {
        id: 3,
        displayText: 'Cumulative change',
        cssClass: 'xeven int',
      },
      {
        id: 4,
        displayText: '$GRP $m',
        cssClass: 'xodd int',
      },
      {
        id: 5,
        displayText: '% change from previous year',
        cssClass: 'xodd int',
      },
      {
        id: 6,
        displayText: 'Cumulative change',
        cssClass: 'xodd int',
      },
      {
        id: 7,
        displayText: `${clientLongName} as a % of ${currentBenchmark}`,
        cssClass: 'xeven int',
      },
    ],
    footRows: [],
    rows: rows.map(({ Yr, ValWebID, PerWebID, ValBM, PerBM, PerWebIDofBM }, i: number) => ({
      data: [Yr, ValWebID, PerWebID, ValBM, PerWebID, PerWebIDofBM],
      formattedData: [
        Yr,
        formatNumber(ValWebID),
        formatChangeNumber(PerWebID, '--'),
        formatNumber(ValBM),
        formatChangeNumber(PerBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
      ],
      id: i,
    })),
  };
};

// #region Source
const Source = () => (
  <>
    Source: National Institute of Economic and Industry Research (NIEIR) ©2019. Compiled and presented in economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

const GRPChartBuilder = nodes => {
  const chartTitle = 'Gross Regional Product';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'GRP $million';
  const categories = []; // nodes.map(nodes, 'Yr').reverse()
  const serie = []; // _.map(nodes, 'ValWebID').reverse()
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
        styledMode: true,
      },
      title: {
        text: chartTitle,
        align: 'left',
      },
      subtitle: {
        text: nodes[0].Geoname,
        align: 'left',
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: nodes[0].Geoname,
          data: serie,
        },
      ],
      xAxis: {
        categories,
        croshair: false,
        title: {
          text: xAxisTitle,
          align: 'low',
        },
        labels: {
          staggerLines: 0,
          format: '',
        },
        opposite: false,
        plotBands: [],
      },
      yAxis: [
        {
          croshair: false,
          title: {
            text: yAxisTitle,
            align: 'low',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
          opposite: false,
          plotBands: [],
        },
      ],
    },
    rawDataSource:
      'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts',
    dataSource: <Source />,
    chartContainerID: 'grp-chart',
    logoUrl: '/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard',
  };
};

const CumulitativeChangeChartBuilder = nodes => {
  const chartTitle = 'Cumulative change in Gross Regional Product';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Cumulitative change in gross regional product';
  const categories = []; // nodes.map(nodes, 'Yr').reverse()
  const serie = []; // _.map(nodes, 'ValWebID').reverse()
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
        styledMode: true,
      },
      title: {
        text: chartTitle,
        align: 'left',
      },
      subtitle: {
        text: nodes[0].Geoname,
        align: 'left',
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: nodes[0].Geoname,
          data: serie,
        },
      ],
      xAxis: {
        categories,
        croshair: false,
        title: {
          text: xAxisTitle,
          align: 'low',
        },
        labels: {
          staggerLines: 0,
          format: '',
        },
      },
      yAxis: [
        {
          croshair: false,
          title: {
            text: yAxisTitle,
            align: 'low',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
    },
    rawDataSource:
      'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts',
    dataSource: <Source />,
    chartContainerID: 'cumulitative-chart',
    logoUrl: '/images/id-logo.png',
    entityID: 2,
    chartTemplate: 'Standard',
  };
};

const AnnualChangeChartBuilder = nodes => {
  const chartTitle = 'Annual change in Gross Regional Product';
  const yAxisTitle = '% change from previous year'; // vert axis
  const xAxisTitle = 'Year ending June'; // horizontal axis
  const categories = []; // nodes.map(nodes, 'Yr').reverse()
  const serie = []; // _.map(nodes, 'ValWebID').reverse()
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
        styledMode: true,
      },
      title: {
        text: chartTitle,
        align: 'left',
      },
      subtitle: {
        text: nodes[0].Geoname,
        align: 'left',
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: nodes[0].Geoname,
          data: serie,
        },
      ],
      xAxis: {
        categories,
        croshair: false,
        title: {
          text: xAxisTitle,
          align: 'low',
        },
        labels: {
          staggerLines: 0,
          format: '',
        },
      },
      yAxis: [
        {
          croshair: false,
          title: {
            text: yAxisTitle,
            align: 'low',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
    },
    rawDataSource:
      'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts',
    dataSource: <Source />,
    chartContainerID: 'annual-chart',
    logoUrl: '/images/id-logo.png',
    entityID: 3,
    chartTemplate: 'Standard',
  };
};
