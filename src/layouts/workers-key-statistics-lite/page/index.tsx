// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt } from '../../../utils/';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, ABSLinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import getActiveToggle from '../../../utils/getActiveToggle';
// #endregion

// #region population page
const WorkersKeyStatisticsLitePage = () => {
  const { clientAlias, isLite } = useContext(ClientContext);
  const { contentData, entityData } = useContext(PageContext);
  const defaultBenchmarkName = entityData.activeBenchmarkName;
  const pageName = 'Value of total building approvals';
  const chartData = chartBuilder();
  const tableParams = tableBuilder();

  return (
    <>
      <ControlPanel />
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={`${pageName}`} />
      </ItemWrapper>
    </>
  );
};

export default WorkersKeyStatisticsLitePage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: Australian Bureau of Statistics, {ABSLinkBuilder('abs@.nsf/mf/8731.0', 'Building Approvals')}, Australia,
    catalogue number 8731.0. Compiled and presented in economy.id by <IdLink />
  </p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentBenchmarkName, currentIndustryName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.';
  const tableTitle = 'Employment (Census) by industry sector';
  const firstColTitle = 'Industry';
  const footerRows = data.filter(item => item.LabelName === 'Total [genders]');

  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelName !== 'Total [genders]'),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');

  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    rawDataSource,
    anchorName: 'employment-by-industry-(census)',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 10,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentAreaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `2016`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `2011`,
            colSpan: 3,
          },
          {
            cssClass: 'sub even',
            displayText: 'Change',
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: firstColTitle,
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: 'Number',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: '%',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: `2011 - 2016 `,
        cssClass: 'even int',
      },
    ],
    rows: parents.map(row => ({
      expandable: row.children.length > 0,
      id: row.LabelKey,
      data: [
        row.LabelName,
        row.NoYear1,
        row.PerYear1,
        row.BMYear1,
        row.NoYear2,
        row.PerYear2,
        row.BMYear2,
        row.Change12,
      ],
      formattedData: [
        `${row.LabelName}`,
        formatNumber(row.NoYear1),
        formatPercent(row.PerYear1),
        formatPercent(row.BMYear1),
        formatNumber(row.NoYear2),
        formatPercent(row.PerYear2),
        formatPercent(row.BMYear2),
        formatChangeInt(row.Change12, '--'),
      ],
      childRows: row.children.map(childRow => ({
        id: childRow.LabelKey,
        data: [
          childRow.LabelName,
          childRow.NoYear1,
          childRow.PerYear1,
          childRow.BMYear1,
          childRow.NoYear2,
          childRow.PerYear2,
          childRow.BMYear2,
          childRow.Change12,
        ],
        formattedData: [
          `${childRow.LabelName}`,
          formatNumber(childRow.NoYear1),
          formatPercent(childRow.PerYear1),
          formatPercent(childRow.BMYear1),
          formatNumber(childRow.NoYear2),
          formatPercent(childRow.PerYear2),
          formatPercent(childRow.BMYear2),
          formatChangeInt(childRow.Change12, '--'),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: 'total',
        cols: [
          { cssClass: '', displayText: `Total persons`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.BMYear2), colSpan: 1 },
          {
            cssClass: '',
            displayText: formatChangeInt(row.Change12),
            colSpan: 1,
          },
        ],
      };
    }),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentBenchmarkName, currentIndustryName },
  } = useContext(PageContext);
  const chartType = 'column';
  const chartTemplate = 'Standard';
  const chartTitle = 'Value of total building approvals';
  const residentialSerie = _.map(data, 'Residential').reverse();
  const nonRresidentialSerie = _.map(data, 'NonResidential').reverse();
  const categories = _.map(data, 'LabelName').reverse();
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'totalValueOfBuildingApprovals';
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatNumber(
      this.y,
    )}`;
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
        text: clientAlias,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },
      series: [
        {
          name: 'Non Residential',
          data: nonRresidentialSerie,
          colorIndex: 1,
        },
        {
          name: 'Residential',
          data: residentialSerie,
          colorIndex: 0,
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
    chartTemplate,
  };
};
// #endregion
