// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  formatChangeInt,
  formatChangeOneDecimal,
  formatChangeCurrency,
  capitalise,
  Top,
} from '../../../utils/';

import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  PageIntro,
  Highlight,
  AnalysisContainer,
  SourceBubble,
  ItemWrapper,
  TopList,
} from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';
import { IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';

// #endregion

// #region autotext / dynamic content

const TopLevelQualifications = data => data.filter(qual => qual.Hierarchy === 'P' && qual.LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const TopThree = Top(3);
const TopFour = Top(4);

const TopThreeFields = ({ areaName }) => {
  const {
    contentData,
    entityData: { currentExportId },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree = TopThree(highestQuals);

  const totalPeople = _.sumBy(topThree, 'NoYear1');
  const totalPercent = _.sumBy(topThree, 'PerYear1');

  return (
    <>
      <TopList>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatNumber(qual.NoYear1)} million or {formatPercent(qual.PerYear1)}%)
          </li>
        ))}
      </TopList>
      <p>
        In combination these three industries accounted for {formatNumber(totalPeople)} million in total or {}
        {formatPercent(totalPercent)}% of the {currentExportId != `1` && 'total '}
        {entityData(currentExportId).entityTitle} by industry in the {areaName}.
      </p>
    </>
  );
};

const entityData = exportID => {
  let anchor = '';
  let entityTitle = '';
  let yAxisTitle = '';
  switch (exportID) {
    case `1`:
      anchor = 'total-exports';
      entityTitle = 'total exports';
      yAxisTitle = 'total';
      break;
    case `2`:
      anchor = 'domestic-exports';
      entityTitle = 'domestic exports';
      yAxisTitle = 'domestic';
      break;
    case `3`:
      anchor = 'international-exports';
      entityTitle = 'international exports';
      yAxisTitle = 'international';
      break;
  }
  return { anchor, entityTitle, yAxisTitle };
};

const ComparisonBenchmark = ({ benchmarkName }) => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree: any = TopThree(highestQuals);

  if (!topThree.length) return null;

  const formatComparisons = topThree.map(({ BMYear1, LabelName }) => `${formatPercent(BMYear1)}% in ${LabelName}`);

  const [lastItem, ...comparisons] = formatComparisons.reverse();

  const and = comparisons.length > 0 ? 'and' : null;

  return (
    <p>
      In comparison, the same 3 industries in {benchmarkName} accounted for {comparisons.reverse().join('; ')} {and}{' '}
      {lastItem}.
    </p>
  );
};

const MajorDifferencesHeading = ({ areaName, benchmarkName }) => {
  const {
    entityData: { currentExportId },
  } = useContext(PageContext);
  return (
    <Highlight>
      The major differences between the {entityData(currentExportId).entityTitle} by industries of {areaName} and{' '}
      {benchmarkName} were:
    </Highlight>
  );
};

const MajorDifferences = ({ areaName, benchmarkName }) => {
  const {
    contentData,
    entityData: { currentExportId },
  } = useContext(PageContext);
  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);

  return (
    <>
      <MajorDifferencesHeading areaName={areaName} benchmarkName={benchmarkName} />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of{' '}
            {entityData(currentExportId).entityTitle} by {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to{' '}
            {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const DominantGroupHeading = ({ exportId, areaName }) => {
  const textDiplay = entityData(exportId).entityTitle;

  return (
    <p>
      An analysis of the {textDiplay} by industry sectors in {areaName} in 2018/19 shows the three largest industries
      were:
    </p>
  );
};

const EmergingGroupsHeading = ({ areaName, currentStartYear, currentComparaisonYear }) => {
  const {
    contentData,
    entityData: { currentExportId },
  } = useContext(PageContext);
  const totals = contentData.filter(item => item.LabelKey === 999999);
  const difference = formatNumber(totals[0].NoYear1 - totals[0].NoYear2);
  const diffText = totals[0].NoYear2 > totals[0].NoYear1 ? `decreased by ${difference}` : `increased by ${difference}`;
  return (
    <>
      <Highlight>
        The total {entityData(currentExportId).entityTitle} by industry in {areaName} ${diffText} million between{' '}
        {currentComparaisonYear} and {currentStartYear}.
      </Highlight>
      <p>
        The largest changes in the {entityData(currentExportId).entityTitle} by industries between{' '}
        {currentComparaisonYear} and {currentStartYear} in {areaName} were for:
      </p>
    </>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(highestQuals);

  return (
    <TopList>
      {topFour.map((qual: any, i) => (
        <li key={i}>
          {qual.LabelName} ({formatChangeCurrency(qual.Change12)} million)
        </li>
      ))}
    </TopList>
  );
};
// #endregion

// #region page
const ExportsByIndustryPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const {
    contentData,
    entityData: {
      currentAreaName,
      currentBenchmarkName,
      prefixedAreaName,
      currentIndustryName,
      currentStartYear,
      currentComparaisonYear,
      currentExportId,
    },
  } = useContext(PageContext);

  const builderPayload = {
    areaName: currentAreaName,
    clientAlias,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    currentStartYear,
    currentComparaisonYear,
    TabularData: contentData,
    exportID: currentExportId,
  };

  const tableParams = tableBuilder(builderPayload);
  const chartData = chartBuilder(builderPayload);
  const chartChangeData = chartBuilderChange(builderPayload);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Exports by industry are sales of goods and services to non-resident households, businesses and other
            organisations, outside {prefixedAreaName} boundaries. Exports (domestic) include all exports from the area
            to other parts of Australia. Exports (international) includes all exports from the Region to countries
            outside Australia.
          </p>
          <p>
            To get the full picture how each industry sector contributes to the regional or state economy, export data
            should be viewed alongside the other industry characteristics in the{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/industry-sector-analysis?`,
              `Industry sector analysis`,
            )}{' '}
            section.
          </p>

          <p>
            Detailed notes about how the figures are derived can be found in the{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/topic-notes?#inter-regional-exports-by-industry`,
              `specific topic notes`,
            )}{' '}
            section.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>National Economics (NIEIR) - Modelled series</p>
          </div>
        </SourceBubble>
      </PageIntro>

      <ControlPanel />

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a data row in the table you will be able to see sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Exports'} />
      </ItemWrapper>

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a category in the chart below you will be able to drilldown to
          the sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartChangeData} />
      </ItemWrapper>

      {
        // #region dominant and emerging groups
      }
      <AnalysisContainer>
        <h3>Dominant groups</h3>
        <DominantGroupHeading exportId={currentExportId} areaName={prefixedAreaName} />
        <TopThreeFields areaName={prefixedAreaName} />
        <ComparisonBenchmark benchmarkName={currentBenchmarkName} />
        <MajorDifferences areaName={prefixedAreaName} benchmarkName={currentBenchmarkName} />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading
          areaName={prefixedAreaName}
          currentStartYear={currentStartYear}
          currentComparaisonYear={currentComparaisonYear}
        />
        <EmergingGroups />
      </AnalysisContainer>
      {
        // #endregion
      }
      {
        // #region related pages
      }
      <RelatedPagesCTA />
      {
        // #endregion
      }
    </>
  );
};

export default ExportsByIndustryPage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2021. Compiled and presented in economy.id by <IdLink />. Data are based on a 2016-17 price
      base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data
      releases adjust previous years’ figures to a new base year.
      {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) ©2021 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = ({
  areaName,
  clientAlias,
  bmName: benchmark,
  currentStartYear,
  currentComparaisonYear,
  TabularData: data,
  exportID,
}) => {
  const rawDataSource = 'Source: National Institute of Economic and Industry Research (NIEIR) ©2021.';
  let tableTitle = `${capitalise(entityData(exportID).entityTitle)} by industry sector`;
  let anchor = entityData(exportID).anchor;
  const firstColTitle = 'Industry';
  const footerRows = data.filter(item => item.LabelKey === 999999);

  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelKey != 999999),
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
    source: <TableSource />,
    rawDataSource,
    anchorName: anchor,
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
            displayText: `${areaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparaisonYear}`,
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
        displayText: '$m',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: `${benchmark}`,
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: '$m',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: '%',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: `${benchmark}`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: `${currentComparaisonYear} - ${currentStartYear} `,
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
        formatPercent(row.NoYear1, '--'),
        formatPercent(row.PerYear1, '--'),
        formatPercent(row.BMYear1, '--'),
        formatPercent(row.NoYear2, '--'),
        formatPercent(row.PerYear2, '--'),
        formatPercent(row.BMYear2, '--'),
        formatChangeOneDecimal(row.Change12, '--'),
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
          formatPercent(childRow.NoYear1),
          formatPercent(childRow.PerYear1),
          formatPercent(childRow.BMYear1),
          formatPercent(childRow.NoYear2),
          formatPercent(childRow.PerYear2),
          formatPercent(childRow.BMYear2),
          formatChangeOneDecimal(childRow.Change12, '--'),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: 'total',
        cols: [
          { cssClass: '', displayText: `Total industries`, colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.BMYear2), colSpan: 1 },
          {
            cssClass: '',
            displayText: formatChangeOneDecimal(row.Change12),
            colSpan: 1,
          },
        ],
      };
    }),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = ({ areaName, bmName: currentBenchmark, TabularData: data, exportID }) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelKey !== 999999),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });
  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
      drilldown: `${item.LabelName}-peryear`,
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.BMYear1,
      drilldown: `${item.LabelName}-change`,
    };
  });
  const drilldownPerYear1Serie = _.map(parents, parent => {
    return {
      name: `${areaName}`,
      id: `${parent.LabelName}-peryear`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.PerYear1];
      }),
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentBenchmark}`,
      id: `${parent.LabelName}-change`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.BMYear1];
      }),
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);

  const chartType = 'bar';
  let chartTitle = `${capitalise(entityData(exportID).entityTitle)} by industry sector 2018/19`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `% of ${entityData(exportID).yAxisTitle} export`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2021 Compiled and presented in economy.id by .id informed decisions.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const chartHeight = 650;

  return {
    highchartOptions: {
      height: chartHeight,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatShortDecimal(this.y)}%`;
        },
      },
      series: [
        {
          name: `${areaName}`,
          data: perYear1Serie,
        },
        {
          name: `${currentBenchmark}`,
          data: BMYear1Serie,
        },
      ],
      drilldown: {
        series: drilldownPerYear1Serie,
      },
      xAxis: {
        type: 'category',
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
              return `${this.value}%`;
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
// #endregion

// #region chart builder change
const chartBuilderChange = ({
  areaName,
  industryName: currentIndustry,
  bmName: currentBenchmark,
  currentStartYear,
  currentComparaisonYear,
  TabularData: data,
  exportID,
}) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelKey !== 999999),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in ${entityData(exportID).entityTitle}, ${currentComparaisonYear} to ${currentStartYear}`;
  const chartSubtitle = `${areaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Change in ${entityData(exportID).yAxisTitle} exports ($millions)`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2021 Compiled and presented in economy.id by .id informed decisions.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';
  const chartHeight = 650;

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
      this.category
    }, ${areaName}: ${formatChangeCurrency(this.y)} million`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      height: chartHeight,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      series: [
        {
          name: `${currentIndustry}`,
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
              return formatChangeInt(this.value);
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};

// #endregion
