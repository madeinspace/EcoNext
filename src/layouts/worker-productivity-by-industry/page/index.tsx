// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatShortDecimal,
  idlogo,
  formatChangeInt,
  absSort,
  formatChangeCurrency,
  formatCurrency,
  Top,
} from '../../../utils';
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

const TopThreeFields = () => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree = TopThree(highestQuals);

  return (
    <>
      <TopList>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} (${formatNumber(qual.NoYear1)})
          </li>
        ))}
      </TopList>
    </>
  );
};

const ComparisonBenchmark = ({ benchmarkName }) => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree: any = TopThree(highestQuals);

  if (!topThree.length) return null;

  const formatComparisons = topThree.map(({ BMYear1, LabelName }) => `$${formatNumber(BMYear1)} in ${LabelName}`);

  const [lastItem, ...comparisons] = formatComparisons.reverse();

  const and = comparisons.length > 0 ? 'and' : null;

  return (
    <p>
      In comparison, the same 3 industries in {benchmarkName} were for {comparisons.reverse().join('; ')} {and}{' '}
      {lastItem}.
    </p>
  );
};

const MajorDifferencesHeading = ({ areaName, benchmarkName }) => {
  return (
    <Highlight>
      The major differences between the jobs held by the full-time equivalent local workers of {areaName} and{' '}
      {benchmarkName} were:
    </Highlight>
  );
};

const MajorDifferences = ({ areaName, benchmarkName }) => {
  const { contentData, entityData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'NoYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.NoYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);

  return (
    <>
      <MajorDifferencesHeading areaName={areaName} benchmarkName={benchmarkName} />
      <TopList>
        {topFour.reverse().map((qual: any, i) => {
          return (
            <li key={i}>
              A <em>{qual.NoYear1 > qual.BMYear1 ? 'higher' : 'lower'}</em> worker productivity in {qual.LabelName} (
              {`$${formatNumber(qual.NoYear1)}`} compared to {`$${formatNumber(qual.BMYear1)}`})
            </li>
          );
        })}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName, currentStartYear, currentComparaisonYear }) => {
  const { contentData, entityData } = useContext(PageContext);
  const { currentTableType } = entityData;
  const totals = contentData.filter(item => item.LabelKey === 999999);
  const difference = currentTableType === 'Worker' ? formatNumber(totals[0].NoYear1 - totals[0].NoYear2) : null;
  const diffText =
    currentTableType === 'Worker'
      ? totals[0].NoYear2 > totals[0].NoYear1
        ? `decreased by ${difference}`
        : `increased by $${difference}`
      : 'remained stable';
  return (
    <>
      <p>
        The total worker productivity by industry in {areaName} {diffText} between {currentComparaisonYear} and{' '}
        {currentStartYear}.
      </p>
      <Highlight>
        The largest changes in worker productivity by industries between {currentComparaisonYear} and {currentStartYear}{' '}
        in {areaName} were for those employed in:
      </Highlight>
    </>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);
  const topquals = TopLevelQualifications(contentData);
  const topFour = TopFour(absSort(topquals, 'Change12'));

  return (
    <TopList>
      {topFour.map((qual: any, i) => {
        const changeCurrency = formatChangeCurrency(qual.Change12);
        return (
          <li key={i}>
            {qual.LabelName} ({changeCurrency})
          </li>
        );
      })}
    </TopList>
  );
};
// #endregion

// #region page
const WorkerProductivityByIndustryPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const { contentData, entityData } = useContext(PageContext);
  const {
    currentStartYear,
    currentComparaisonYear,
    currentAreaName,
    currentBenchmarkName,
    currentTableType,
    prefixedAreaName,
  } = entityData;

  const builderSettings = {
    clientAlias,
    currentTableType,
    areaName: currentAreaName,
    bmName: currentBenchmarkName,
    currentStartYear,
    currentComparaisonYear,
    TabularData: contentData,
  };

  const tableParams = tableBuilder(builderSettings);
  const chartData = chartBuilder(builderSettings);
  const chartChangeData = chartBuilderChange(builderSettings);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Worker productivity by industry is calculated by dividing the industry value add by the number of persons
            employed in that industry. It shows which industries generate the most value add per employee. Some industry
            sectors, such as retail trade, are not highly productive per worker, but they employ a lot of people. Other
            industries, such as mining, employ fewer people but generate high levels of productivity. Each plays an
            important role in the economy.
          </p>
          <p>
            Worker productivity data should be viewed in conjunction with{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/employment-by-industry`,
              `Employment by industry (Total)`,
            )}
            and{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/employment-by-industry-fte`,
              `Employment by industry (FTE)`,
            )}
            , to see the relative size of employment in each industry, and with{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/workers-income`, `Local workers income`)} to see how
            many local workers are actually each in each industry, and with{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/income-sources`, `Sources of income`)} data to see
            whether employment is the main way income is derived.{' '}
          </p>
          <p>
            Detailed notes about how the figures are derived can be found in the specific{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/topic-notes?#worker-productivity-by-industry`,
              `topic notes section`,
            )}
            . National Economics (NIEIR) - Modelled series
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
        <EntityTable data={tableParams} name={'Worker productivity'} />
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
        <p>
          An analysis of the jobs held by the full-time equivalent local workers in {prefixedAreaName} in 2018/19 shows
          the three highest industries were:
        </p>
        <TopThreeFields />
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

export default WorkerProductivityByIndustryPage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by
      <IdLink />. Data are based on a 2016-17 price base for all years. NIEIR-ID data are inflation adjusted each year
      to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.
      {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = ({
  clientAlias,
  currentTableType,
  areaName,
  bmName: benchmark,
  currentStartYear,
  currentComparaisonYear,
  TabularData: data,
}) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id informed decisions.';
  const tableTitle = 'Productivity per worker (annual) by industry';
  const firstColTitle = `Industry`;
  const footerRows = data.filter(item => item.LabelName === 'Total Industries');

  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelName !== 'Total Industries'),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');

  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });

  const formatCurrency = num => (currentTableType === 'Hour' ? formatShortDecimal(num) : formatNumber(num));

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'worker-productivity',
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
            displayText: `${areaName} - Constant prices`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparaisonYear}`,
            colSpan: 2,
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
        displayText: '$',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: `${benchmark}$`,
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: '$',
        cssClass: 'odd int',
      },
      {
        id: 4,
        displayText: `${benchmark}$ `,
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: `${currentComparaisonYear} - ${currentStartYear} `,
        cssClass: 'even int',
      },
    ],
    rows: parents.map(row => ({
      expandable: row.children.length > 0,
      id: row.LabelKey,
      data: [row.LabelName, row.NoYear1, row.BMYear1, row.NoYear2, row.BMYear2, row.Change12],
      formattedData: [
        `${row.LabelName}`,
        formatCurrency(row.NoYear1),
        formatCurrency(row.BMYear1),
        formatCurrency(row.NoYear2),
        formatCurrency(row.BMYear2),
        formatChangeInt(row.Change12, '--'),
      ],
      childRows: row.children.map(childRow => ({
        id: childRow.LabelKey,
        data: [
          childRow.LabelName,
          childRow.NoYear1,
          childRow.BMYear1,
          childRow.NoYear2,
          childRow.BMYear2,
          childRow.Change12,
        ],
        formattedData: [
          `${childRow.LabelName}`,
          formatCurrency(childRow.NoYear1),
          formatCurrency(childRow.BMYear1),
          formatCurrency(childRow.NoYear2),
          formatCurrency(childRow.BMYear2),
          formatChangeInt(childRow.Change12, '--'),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: 'total',
        cols: [
          { cssClass: '', displayText: `Total industries`, colSpan: 1 },
          { cssClass: '', displayText: formatCurrency(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatCurrency(row.BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatCurrency(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatCurrency(row.BMYear2), colSpan: 1 },
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

// #region chart builders
const chartBuilder = ({ areaName, bmName: currentBenchmark, TabularData: data, currentTableType }) => {
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
      y: item.NoYear1,
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
      drillUpButton: {
        text: '< Back',
      },
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.NoYear1];
      }),
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentBenchmark}`,
      id: `${parent.LabelName}-change`,
      drillUpButton: {
        text: '< Back',
      },
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.BMYear1];
      }),
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);

  const chartType = 'bar';
  const chartTitle = `Productivity per worker (annual) by industry 2018/19`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `${currentTableType === 'Worker' ? '$ per worker' : '$ per worker per hour'}`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id informed decisions.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const chartHeight = 500;

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
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatCurrency(
            this.y,
          )}`;
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
        allowPointDrilldown: false,
        activeAxisLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        activeDataLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
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
              return `${this.value}`;
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
  currentStartYear,
  currentComparaisonYear,
  TabularData: data,
  currentTableType,
}) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelKey !== 999999),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in productivity per worker (annual) by industry, ${currentComparaisonYear} to ${currentStartYear}`;
  const chartSubtitle = `${areaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Change in $ per worker`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id informed decisions.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';
  const chartHeight = 500;
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
      this.category
    }, ${areaName}: ${formatChangeCurrency(this.y)}`;
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
          name: ` `,
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
