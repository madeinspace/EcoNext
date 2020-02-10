// #region imports
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import { formatNumber, formatChangeNumber, idlogo, formatShortDecimal } from '../../../utils';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import EntityTable from '../../../components/table/EntityTable';
import getActiveToggle from '../../../utils/getActiveToggle';
import { ABSLink, NierLink, IdLink, ABSLinkBuilder } from '../../../components/ui/links';
// #endregion
// #region LiteContent
const LiteContent = () => {
  const { LongName, clientAlias } = useContext(ClientContext);
  const { contentData, filterToggles } = useContext(PageContext);
  const currentBenchmark = getActiveToggle(filterToggles, 'BMID');
  const chartData = chartBuilder(LongName, contentData);
  const tableParams = tableBuilder(currentBenchmark, clientAlias, LongName, contentData);

  return (
    <>
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Local jobs lite'} />
      </ItemWrapper>
    </>
  );
};

export default LiteContent;
// #endregion
// #region tableBuilder
const tableBuilder = (currentBenchmark, clientAlias, LongName, nodes) => {
  const tableTitle = 'Local jobs';
  const anchorName = 'indicators---local-jobs';

  return {
    cssClass: '',
    clientAlias: clientAlias,
    source: <TableSource />,
    anchorName,
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
            displayText: LongName,
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
      { id: 1, displayText: 'Number', cssClass: 'even int' },
      {
        id: 2,
        displayText: '%change',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: 'Number',
        cssClass: 'odd int',
      },
      {
        id: 4,
        displayText: '%change',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: `${LongName} as a % of ${currentBenchmark}`,
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
        formatShortDecimal(PerWebIDofBM, '--'),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};
// #endregion
// #region TableSource
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics. Australian National Accounts:
    {ABSLinkBuilder('abs@.nsf/mf/5206.0', 'National Income, Expenditure and Product')} , catalogue number 5206.0, and
    the <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />
  </p>
);
// #endregion
// #region ChartSource
const ChartSource = () => (
  <p>
    Source: <NierLink /> ©2019 Compiled and presented in economy.id by <IdLink />
  </p>
);
// #endregion
// #region chartbuilder
const chartBuilder = (LongName, nodes) => {
  const chartType = 'column';
  const chartTitle = 'Local jobs  ';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Local jobs';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'JobsLite';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${LongName}: ${formatNumber(this.y)}`;
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
        text: LongName,
      },
      series: [
        {
          name: LongName,
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
// #endregion
