// #region imports
import _ from 'lodash';
import { formatNumber, idlogo, formatChangeInt, formatChangeOneDecimal, Top } from '../../../utils/';

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
import useEntityText from '../../../utils/useEntityText';

// #endregion

// #region autotext / dynamic content

const TopLevelQualifications = data => data.filter(qual => qual.Hierarchy === 'P' && qual.LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const Bottom = n => quals =>
  _(quals)
    .take(n)
    .reverse()
    .value();

const TopThree = Top(3);
const BottomThree = Bottom(3);

const TopThreeFields = () => {
  const {
    contentData,
    entityData: {
      currentAreaName,
      currentBenchmarkName,
      currentComparisonYear,
      currentStartYear,
      currentMeasure,
      prefixedAreaName,
    },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'RegComp');
  const topThree = TopThree(highestQuals);
  const bottomThree = BottomThree(highestQuals);

  return (
    <>
      <Highlight>
        An analysis of employment (Total) change between {currentComparisonYear} and 2018/19 in {prefixedAreaName} in{' '}
        {currentStartYear} shows the three industries with the highest regional competitive effect in {prefixedAreaName}{' '}
        relative to {currentBenchmarkName} were:
      </Highlight>
      <TopList>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeInt(qual.RegComp)} )
          </li>
        ))}
      </TopList>
      <Highlight>The three industries with the lowest regional competitive effect were:</Highlight>
      <TopList>
        {bottomThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeInt(qual.RegComp)} )
          </li>
        ))}
      </TopList>
    </>
  );
};

// #endregion

// #region page
const ShiftShareAnalysisPage = () => {
  return (
    <>
      <PageIntro>
        <div>
          <p>
            Shift Share Analysis provides a useful mechanism for better interpreting changes in economic variables
            between different time periods. It is a way of breaking the growth or decline in an industry into three
            components to help understand what is driving the change. These three change components are commonly known
            as:
          </p>
          <p>
            <strong>National/State growth effect</strong> - the amount of growth or decline in an industry that could be
            attributed to the overall growth of a larger area that encompasses the region's economy, usually state or
            national.
          </p>
          <p>
            <strong>Industry mix effect</strong> - the amount of growth or decline in an industry that could be
            attributed to the performance of the specific industry at the national/state level.
          </p>
          <p>
            <strong>Regional competitive effect</strong> - the amount of growth or decline in a specific industry that
            could be attributed to a local advantage or disadvantage. This is generally the most interesting component
            as it clearly quantifies the level of advantage or disadvantage an industry has in the local area.
          </p>
          <p>
            The regional competitive effect for an industry generally indicates how the local industry performed against
            benchmark trends. An industry with a positive regional competitive effect suggests local characteristics
            supported above trend growth in that period. For example, if Retail Trade in a region grew by 3% but at a
            state/national level it only grew by 2%, some regional specific factors (e.g. new shopping centre,
            population growth) must have contributed to this above trend growth. A negative effect suggests the
            opposite.
          </p>
          <p>
            An industry with a positive regional competitive effect may still have experienced decline, but by less than
            the state/national trends.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>{useEntityText('DataSource')}</p>
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
        <EntityTable data={tableBuilder()} name={'Employment by Industry (Census)'} />
      </ItemWrapper>

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a category in the chart below you will be able to drilldown to
          the sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>

      {
        // #region dominant and emerging groups
      }
      <AnalysisContainer>
        <h3>Dominant groups</h3>
        <p>
          An industry with a positive regional competitive effect suggests local characteristics supported above trend
          growth in that period. A negative effect suggests local characteristics inhibited growth in that period.
        </p>
        <TopThreeFields />
      </AnalysisContainer>
      <RelatedPagesCTA />
    </>
  );
};

export default ShiftShareAnalysisPage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. Data are based on a 2016-17 price
      base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data
      releases adjust previous years’ figures to a new base year.
      {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};

const ChartSource = () => (
  <p>
    Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id
    by .id informed decisions.
    <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentBenchmarkName, currentComparisonYear, currentStartYear, currentMeasure },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id informed decisions.';
  const tableTitle = `Shift-share analysis to ${currentBenchmarkName}`;
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
    anchorName: 'shift-share-analysis',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 7,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentAreaName} - Employment (Total)`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 1,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparisonYear}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentComparisonYear} to ${currentStartYear}`,
            colSpan: 4,
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
        displayText: 'number',
        cssClass: 'odd int',
      },
      {
        id: 3,
        displayText: `change`,
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: 'Benchmark growth effect',
        cssClass: 'even int',
      },
      {
        id: 5,
        displayText: 'Industry mix effect',
        cssClass: 'even int',
      },
      {
        id: 6,
        displayText: `Regional competitive effect`,
        cssClass: 'even int',
      },
    ],
    rows: parents.map(row => ({
      expandable: row.children.length > 0,
      id: row.LabelKey,
      data: [row.LabelName, row.NoYear1, row.NoYear2, row.NetChange, row.BMGrowth, row.IndMix, row.RegComp],
      formattedData: [
        `${row.LabelName}`,
        formatNumber(row.NoYear1),
        formatNumber(row.NoYear2),
        formatChangeInt(row.NetChange),
        formatChangeOneDecimal(row.BMGrowth),
        formatChangeOneDecimal(row.IndMix),
        formatChangeOneDecimal(row.RegComp),
      ],
      childRows: row.children.map(childRow => ({
        id: childRow.LabelKey,
        data: [
          childRow.LabelName,
          childRow.NoYear1,
          childRow.NoYear2,
          childRow.NetChange,
          childRow.BMGrowth,
          childRow.IndMix,
          childRow.RegComp,
        ],
        formattedData: [
          `${childRow.LabelName}`,
          formatNumber(childRow.NoYear1),
          formatNumber(childRow.NoYear2),
          formatChangeInt(childRow.NetChange),
          formatChangeOneDecimal(childRow.BMGrowth),
          formatChangeOneDecimal(childRow.IndMix),
          formatChangeOneDecimal(childRow.RegComp),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: 'total',
        cols: [
          { cssClass: '', displayText: `Total Industries`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatChangeInt(row.NetChange), colSpan: 1 },
          { cssClass: '', displayText: formatChangeOneDecimal(row.BMGrowth), colSpan: 1 },
          { cssClass: '', displayText: formatChangeOneDecimal(row.IndMix, '--'), colSpan: 1 },
          { cssClass: '', displayText: formatChangeOneDecimal(row.RegComp), colSpan: 1 },
        ],
      };
    }),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    contentData: data,
    entityData: { currentAreaName, currentBenchmarkName, currentStartYear, currentComparisonYear },
  } = useContext(PageContext);

  const parents = _.sortBy(
    data.filter(({ Hierarchy, LabelKey }) => Hierarchy === 'P' && LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );

  const children = data.filter(item => item.Hierarchy === 'C');

  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });

  const perYear1Serie = _.map(parents, ({ LabelName, RegComp }) => ({
    name: LabelName,
    y: RegComp,
    drilldown: `${LabelName}-RegComp`,
  }));

  const drilldownPerYear1Serie = _.map(parents, ({ LabelName, children }) => ({
    name: `${currentAreaName}`,
    id: `${LabelName}-RegComp`,
    data: _.map(children, ({ LabelName, RegComp }) => [`${LabelName}`, RegComp]),
  }));

  const chartType = 'bar';
  const chartTitle = `Regional competitive effect by industry sector ${currentComparisonYear} to ${currentStartYear}`;
  const chartSubtitle = `Employment (total)`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Regional Competitive Effect - Change in number of employment (Total estimate)`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id informed decisions.';
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
        headerFormat: '',
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> Net change in ${this.name}, ${
            this.series.name
          } relative to ${currentBenchmarkName}: ${formatNumber(this.y)}`;
        },
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          name: `${currentAreaName} relative to ${currentBenchmarkName}`,
          data: perYear1Serie,
        },
      ],
      drilldown: {
        allowPointDrilldown: true,
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
              return `${formatNumber(this.value)}`;
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
