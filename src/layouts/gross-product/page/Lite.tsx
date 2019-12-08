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
  const currentBMID = getActiveToggle(filterToggles, 'BMID');
  const chartData = chartBuilder(tableData);
  const tableParams = tableBuilder(currentBMID, clientAlias, tableData);

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
const tableBuilder = (currentBMID, clientAlias, nodes) => {
  console.log('nodes: ', nodes[0].GeoName);
  const tableTitle = 'Gross Regional Product (GRP)';
  const clientLongName = nodes[0].GeoName;

  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
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
            rowSpan: 0,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: '',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: clientLongName,
            colSpan: 2,
            rowSpan: 0,
          },
          {
            cssClass: 'xodd end-year',
            displayText: currentBMID,
            colSpan: 2,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: '',
            colSpan: 1,
            rowSpan: 0,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: '$m',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:#,0}',
      },
      {
        id: 2,
        displayText: '%change',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 3,
        displayText: '$m',
        dataType: 'money',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 4,
        displayText: '%change',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:#,0}',
      },
      {
        id: 5,
        displayText: 'city of []',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xeven ',
        format: '{0:+#,0;-#,0;0}',
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
    noOfRowsOnInit: 11,
  };
};
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

// #region  chartbuilder
const chartBuilder = nodes => {
  const chartTitle = 'Gross Regional Product';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'GRP $million';

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
          data: _.map(nodes, 'ValWebID').reverse(),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'Yr').reverse(),
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
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: '/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard',
  };
};
// #endregion
