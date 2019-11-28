// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent } from '../../../utils/';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
// #endregion

// #region population page
const ValueOfBuildingApprovalsPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const { tableData } = useContext(PageContext);

  const pageName = 'Value of total building approvals';
  const chartData = chartBuilder(tableData);
  const tableParams = tableBuilder(clientAlias, tableData);

  return (
    <>
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={`${pageName}`} />
      </ItemWrapper>
    </>
  );
};

export default ValueOfBuildingApprovalsPage;
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
const tableBuilder = (alias, nodes) => {
  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias: alias,
    source: <Source />,
    anchorName: 'service-age-groups',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Value of total building approvals',
            colSpan: 10,
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
            displayText: nodes[0].GeoName,
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xodd end-year',
            displayText: 'Victoria',
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: '',
            colSpan: 3,
            rowSpan: 0,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Financial year',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: 'Residential',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:#,0}',
      },
      {
        id: 2,
        displayText: 'Non-residential',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 3,
        displayText: 'Total',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 4,
        displayText: 'Residential',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:#,0}',
      },
      {
        id: 5,
        displayText: 'Non-residential',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 6,
        displayText: 'Total',
        dataType: 'money',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 7,
        displayText: 'City of Monash as a % of Victoria',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven',
        format: '{0:#,0}',
      },
    ],
    footRows: [],
    rows: nodes.map(
      (
        { LabelName, Residential, NonResidential, Total, ResidentialBM, NonResidentialBM, TotalBM, PerWebIDofBM },
        i: number,
      ) => ({
        data: [LabelName, Residential, NonResidential, Total, ResidentialBM, NonResidentialBM, TotalBM, PerWebIDofBM],
        formattedData: [
          LabelName,
          formatNumber(Residential),
          formatNumber(NonResidential),
          formatNumber(Total),
          formatNumber(ResidentialBM),
          formatNumber(NonResidentialBM),
          formatNumber(TotalBM),
          `${formatPercent(PerWebIDofBM)}%`,
        ],
        id: i,
      }),
    ),
    noOfRowsOnInit: 11,
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = nodes => {
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
        styledMode: true,
      },
      title: {
        text: 'Value of total building approvals',
        align: 'left',
      },
      subtitle: {
        text: nodes[0].GeoName,
        align: 'left',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: 'Residential',
          data: _.map(nodes, 'Residential'),
        },
        {
          color: '',
          yAxis: 0,
          name: 'Non Residential',
          data: _.map(nodes, 'NonResidential'),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'LabelName').reverse(),
        croshair: false,
        title: {
          text: 'Year ending June',
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
            text: 'Total value',
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
