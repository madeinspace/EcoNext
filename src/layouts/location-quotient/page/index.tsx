// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  formatChangeInt,
  formatOneDecimal,
  formatLongNumber,
  formatChangePercent,
  absSort,
  formatChangeOneDecimal,
} from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import { PageIntro, Highlight, AnalysisContainer, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';
import { IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';
import styled from 'styled-components';
import useEntityText from '../../../utils/useEntityText';

// #endregion

// #region autotext / dynamic content

const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;
const TopLevelQualifications = data => data.filter(qual => qual.Hierarchy === 'P' && qual.LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const Top = n => quals =>
  _(quals)
    .takeRight(n)
    .reverse()
    .value();

const Bottom = n => quals =>
  _(quals)
    .take(n)
    .reverse()
    .value();

const TopThree = Top(3);
const BottomThree = Bottom(3);
const TopFour = Top(4);

const TopThreeFields = () => {
  const {
    contentData,
    entityData: { currentMeasureName, currentStartYear, currentBenchmarkName, prefixedAreaName },
  } = useContext(PageContext);
  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'LQBMYear1');
  const topThree = TopThree(highestQuals);
  const bottomThree = BottomThree(highestQuals);

  return (
    <>
      <Highlight>
        An analysis of {currentMeasureName.toLowerCase()} in {prefixedAreaName} in {currentStartYear} shows the three
        industries with the highest location quotient relative to {currentBenchmarkName} were:
      </Highlight>
      <TopList>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatPercent(qual.LQBMYear1)} )
          </li>
        ))}
      </TopList>
      <Highlight>
        The three industries with the lowest location quotient relative to {currentBenchmarkName} were:
      </Highlight>
      <TopList>
        {bottomThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatPercent(qual.LQBMYear1)} )
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = () => {
  const {
    entityData: { currentMeasureName, currentStartYear, currentComparisonYear, prefixedAreaName },
  } = useContext(PageContext);

  return (
    <>
      <p>Changes in location quotients over time reveal emerging or declining industry specialisations.</p>
      <Highlight>
        The largest changes in the {currentMeasureName.toLowerCase()} LQ between {currentComparisonYear} and{' '}
        {currentStartYear} in {prefixedAreaName} were for these industries:
      </Highlight>
    </>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));

  return (
    <TopList>
      {topFour.map((qual: any, i) => (
        <li key={i}>
          {qual.LabelName} ({formatChangeOneDecimal(qual.Change12)})
        </li>
      ))}
    </TopList>
  );
};
// #endregion

// #region page
const LocationQuotientPage = () => {
  const { clientAlias } = useContext(ClientContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The location quotient is a simple way of seeing which are the main industries in an area, relative to the
            wider region. LQ shows the percentage of the local economy characteristic (eg. employment, value add) in a
            particular industry divided by the percentage of the wider area (region, state, nation) that this industry
            makes up.
          </p>
          <TopList>
            <li>Where LQ=1, that industry is exactly as prevalent as in the wider region.</li>
            <li>
              A LQ greater than 1.2 indicates a significant specialisation of the industry in the local area – possibly
              a key economic strength. Higher numbers mean greater specialisations. Anything over 2 is a major
              specialisation.
            </li>
            <li>
              A LQ between 0.8 and 1.2 means the industry is broadly similar in importance in the local area compared to
              the comparison region and could be seen as representative.
            </li>
            <li>
              An LQ under 0.8 indicates an industry which is more important in the region than the local area, and may
              represent an economic weakness or opportunity for growth.
            </li>
          </TopList>
          <p>
            LQs should be analysed in combination with the proportional economic share that industry represents. For
            example, an industry with an LQ of 2 reveals a specialisation but if that industry only represents 3% of the
            local economy, it may not be significant. Compare with the figures on the{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/employment-by-industry`,
              'Employment by industry (Total)',
            )}
            ,{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/employment-by-industry-fte`,
              'Employment by industry (FTE)',
            )}
            , {LinkBuilder(`https://economy.id.com.au/${clientAlias}/value-add-by-industry`, 'Value added')} pages for
            this context. National Economics (NIEIR) - Modelled series
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
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
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

      <ItemWrapper>
        <EntityChart data={chartBuilderChange()} />
      </ItemWrapper>

      {
        // #region dominant and emerging groups
      }
      <AnalysisContainer>
        <h3>Dominant groups</h3>
        <p>
          A location quotient of greater than 1.2 is generally considered a level of industry specialisation, while a LQ
          of 0.8 or less indicates an industry which doesn’t have a major presence in the area.
        </p>
        <TopThreeFields />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading />
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

export default LocationQuotientPage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. NIEIR-ID data are adjusted each
      year, using updated employment estimates. Each release may change previous years’ figures.{' '}
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
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentBenchmarkName, currentStartYear, currentComparisonYear, currentMeasureName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Location quotient';
  const firstColTitle = 'Industry (Click rows to view sub-categories)';
  const footerRows = data.filter(item => item.IndustryName === 'Total');
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'),
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
    anchorName: '',
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
            displayText: `${currentAreaName} - ${currentMeasureName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparisonYear}`,
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
        displayText: '%',
        cssClass: 'even int M',
      },
      {
        id: 2,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'even int M',
      },
      {
        id: 3,
        displayText: `Location Quotient ${currentBenchmarkName}`,
        cssClass: 'even int M',
      },
      {
        id: 4,
        displayText: '%',
        cssClass: 'odd int M',
      },
      {
        id: 5,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'odd int M',
      },
      {
        id: 6,
        displayText: `Location Quotien ${currentBenchmarkName}`,
        cssClass: 'odd int M',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int',
      },
    ],
    rows: parents.map(
      ({ children, LabelKey, LabelName, PerYear1, BMYear1, LQBMYear1, PerYear2, BMYear2, LQBMYear2, Change12 }) => ({
        expandable: children.length > 0,
        id: LabelKey,
        data: [LabelName, PerYear1, BMYear1, LQBMYear1, PerYear2, BMYear2, LQBMYear2, Change12],
        formattedData: [
          `${LabelName}`,
          formatOneDecimal(PerYear1),
          formatPercent(BMYear1),
          formatLongNumber(LQBMYear1),
          formatNumber(PerYear2),
          formatPercent(BMYear2),
          formatLongNumber(LQBMYear2),
          formatChangePercent(Change12, '--'),
        ],
        childRows: children.map(
          ({ LabelKey, LabelName, PerYear1, BMYear1, LQBMYear1, PerYear2, BMYear2, LQBMYear2, Change12 }) => ({
            id: LabelKey,
            data: [LabelName, PerYear1, BMYear1, LQBMYear1, PerYear2, BMYear2, LQBMYear2, Change12],
            formattedData: [
              `${LabelName}`,
              formatNumber(PerYear1),
              formatPercent(BMYear1),
              formatLongNumber(LQBMYear1),
              formatNumber(PerYear2),
              formatPercent(BMYear2),
              formatLongNumber(LQBMYear2),
              formatChangePercent(Change12, '--'),
            ],
          }),
        ),
      }),
    ),
    footRows: footerRows.map(({ PerYear1, BMYear1, LQBMYear1, PerYear2, BMYear2, LQBMYear2, Change12 }) => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total Industries`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatLongNumber(LQBMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(BMYear2), colSpan: 1 },
          { cssClass: '', displayText: formatChangePercent(LQBMYear2), colSpan: 1 },
          { cssClass: '', displayText: formatChangeInt(Change12), colSpan: 1 },
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
    entityData: { currentAreaName, currentMeasureName, currentStartYear, currentBenchmarkName },
  } = useContext(PageContext);
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelKey !== 999999),
    item => item.LabelKey,
  );
  const perYear1Serie = _.map(parents, ({ LabelName, LQBMYear1 }) => {
    return {
      name: LabelName,
      y: LQBMYear1,
    };
  });

  const chartType = 'bar';
  const chartTitle = `Location quotient by industry sector ${currentStartYear}`;
  const chartSubtitle = `${currentMeasureName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Location quotient`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    highchartOptions: {
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      legend: {
        enabled: true,
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatShortDecimal(this.y)}`;
        },
      },
      series: [
        {
          name: `${currentAreaName} relative to ${currentBenchmarkName}`,
          data: perYear1Serie,
        },
      ],
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
          plotBands: [
            {
              color: 'orange',
              from: 0.75,
              to: 1.25,
            },
          ],
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
const chartBuilderChange = () => {
  const {
    contentData: data,
    entityData: { currentAreaName, currentMeasureName, currentStartYear, currentComparisonYear },
  } = useContext(PageContext);
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelKey !== 999999),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in LQ by industry sector, ${currentComparisonYear} to ${currentStartYear}`;
  const chartSubtitle = `${currentAreaName} - ${currentMeasureName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Change in location quotient`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${currentAreaName} - ${
      this.series.name
    }: ${formatChangePercent(this.y)}`;
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
          name: `${currentAreaName}`,
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
