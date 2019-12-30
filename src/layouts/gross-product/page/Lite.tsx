import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import { formatNumber, formatChangeNumber, formatChangePercent } from '../../../utils';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import EntityTable from '../../../components/table/EntityTable';
import getActiveToggle from '../../../utils/getActiveToggle';

const LiteContent = () => {
  const { clientAlias } = useContext(ClientContext);
  const { tableData, filterToggles } = useContext(PageContext);
  const currentBenchmark = getActiveToggle(filterToggles, 'BMID');
  const chartData = chartBuilder(tableData);
  const tableParams = tableBuilder(currentBenchmark, clientAlias, tableData);

  return (
    <>
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} />
      </ItemWrapper>
    </>
  );
};

export default LiteContent;

// #region tableBuilder
const tableBuilder = (currentBenchmark, clientAlias, nodes) => {
  const tableTitle = 'Gross Regional Product (GRP)';
  const clientLongName = nodes[0].GeoName;

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
            colSpan: 6,
          },
        ],
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
            cssClass: 'even',
            displayText: clientLongName,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: currentBenchmark,
            colSpan: 2,
          },
          {
            cssClass: 'even',
            displayText: '',
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      { id: 0, displayText: 'Year (ending June 30)', cssClass: 'odd first int' },
      { id: 1, displayText: '$m', cssClass: 'even int' },
      {
        id: 2,
        displayText: '%change',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: '$m',
        cssClass: 'odd int',
      },
      {
        id: 4,
        displayText: '%change',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: `${clientLongName} as a % of ${currentBenchmark}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: nodes.map(({ Yr, ValWebID, PerWebID, ValBM, PerBM, PerWebIDofBM }, i: number) => ({
      data: [Yr, ValWebID, PerWebID, ValBM, PerWebID, PerWebIDofBM],
      formattedData: [
        Yr,
        formatNumber(ValWebID),
        formatChangeNumber(PerWebID, '--'),
        formatNumber(ValBM),
        formatChangeNumber(PerBM, '--'),
        formatChangeNumber(PerWebIDofBM, '--'),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region Source
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" rel="noopener" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region  chartbuilder
const chartBuilder = nodes => {
  const chartType = 'column';
  const chartTitle = 'Gross Regional Product';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'GRP $million';

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
        text: nodes[0].Geoname,
      },
      series: [
        {
          name: nodes[0].Geoname,
          data: _.map(nodes, 'ValWebID').reverse(),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'Yr').reverse(),
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
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: '/images/id-logo.png',
    chartTemplate: 'Standard',
  };
};
// #endregion
