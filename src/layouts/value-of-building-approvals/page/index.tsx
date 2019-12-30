// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo } from '../../../utils/';
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
    <a href="http://home.id.com.au/about-us/" target="_blank" rel="noopener" title=".id website">
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
        cssClass: 'heading',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: nodes[0].GeoName,
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: 'Victoria',
            colSpan: 3,
          },
          {
            cssClass: 'even ',
            displayText: '',
            colSpan: 3,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Financial year',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: "Residential $('000') ",
        cssClass: 'even latest int',
      },
      {
        id: 2,
        displayText: "Non-residential $('000')",
        cssClass: 'even latest int',
      },
      {
        id: 3,
        displayText: "Total $('000')",
        cssClass: 'even latest int',
      },
      {
        id: 4,
        displayText: "Residential $('000')",
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: "Non-residential $('000')",
        cssClass: 'per odd int',
      },
      {
        id: 6,
        displayText: "Total $('000')",
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: 'City of Monash as a % of Victoria',
        cssClass: 'even int',
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
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = nodes => {
  const chartType = 'column';
  const chartTemplate = 'Standard';
  const chartTitle = 'Value of total building approvals';
  const clientAlias = nodes[0].GeoName;
  const residentialSerie = _.map(nodes, 'Residential').reverse();
  const nonRresidentialSerie = _.map(nodes, 'NonResidential').reverse();
  const categories = _.map(nodes, 'LabelName').reverse();
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'totalValueOfBuildingApprovals';

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
        text: clientAlias,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },
      series: [
        {
          name: 'Residential',
          data: residentialSerie,
        },
        {
          name: 'Non Residential',
          data: nonRresidentialSerie,
        },
      ],
      xAxis: {
        categories,
        title: {
          text: 'Year (ending June)',
        },
      },
      yAxis: [
        {
          title: {
            text: 'value S("000")',
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
    rawDataSource,
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
// #endregion
