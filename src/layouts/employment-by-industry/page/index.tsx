// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatChangeNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  formatChangeInt,
} from '../../../utils/';

import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  PageIntro,
  Note,
  Highlight,
  AnalysisContainer,
  SourceBubble,
  ItemWrapper,
  CrossLink,
  ProfileProductIcon,
} from '../../../styles/MainContentStyles';
import getActiveToggle from '../../../utils/getActiveToggle';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import styled from 'styled-components';
import Link from 'next/link';
import MonolithOrNextLink from '../../../components/Link';

// #endregion

const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;
// #region autotext / dynamic content

const TopLevelQualifications = data => data.filter(qual => qual.Hierarchy === 'P' && qual.LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const Top = n => quals =>
  _(quals)
    .takeRight(n)
    .reverse()
    .value();

const TopThree = Top(3);
const TopFour = Top(4);

const TopThreeFields = ({ industryName }) => {
  const { contentData } = useContext(PageContext);

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
            {qual.LabelName} ({formatNumber(qual.NoYear1)} people or {formatPercent(qual.PerYear1)}%)
          </li>
        ))}
      </TopList>
      <p>
        In combination these three fields accounted for {formatNumber(totalPeople)} people in total or {}
        {formatPercent(totalPercent)}% of the local workers.
      </p>
    </>
  );
};

const ComparisonBenchmark = ({ areaName, benchmarkName }) => {
  const {
    filters: { IGBMID },
    contentData,
  } = useContext(PageContext);

  let currentBenchmarkName: any = benchmarkName;

  const industryBenchmark = IGBMID > 1000;

  if (industryBenchmark) {
    currentBenchmarkName = `the ${benchmarkName} workforce in ${areaName}`;
  }

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree: any = TopThree(highestQuals);

  if (!topThree.length) return null;

  const formatComparisons = topThree.map(({ BMYear1, LabelName }) => `${formatPercent(BMYear1)}% in ${LabelName}`);

  const [lastItem, ...comparisons] = formatComparisons.reverse();

  const and = comparisons.length > 0 ? 'and' : null;

  return (
    <p>
      In comparison, {currentBenchmarkName} employed {comparisons.reverse().join('; ')} {and} {lastItem}.
    </p>
  );
};

const MajorDifferencesHeading = ({ areaName, benchmarkName }) => {
  const { contentData, entityData } = useContext(PageContext);
  return (
    <Highlight>
      The major differences between the jobs held by local workers of {areaName} and {benchmarkName} were:
    </Highlight>
  );
};

const MajorDifferences = ({ areaName, benchmarkName }) => {
  const { contentData, entityData } = useContext(PageContext);

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
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of local workers employed in the
            field of {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName, currentStartYear, currentComparaisonYear }) => {
  return (
    <Highlight>
      The number of local workers in {areaName} increased by 32,784 between {currentComparaisonYear} and{' '}
      {currentStartYear}.
    </Highlight>
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
          {qual.LabelName} ({formatChangeInt(qual.Change12)} local workers)
        </li>
      ))}
    </TopList>
  );
};
// #endregion

// #region page
const EmploymentByIndustryTotalPage = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const { contentData, filterToggles, entityData } = useContext(PageContext);

  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);
  const prefixedAreaName = `${entityData.HasPrefix ? 'the ' : ''} ${getActiveToggle(filterToggles, 'WebID', LongName)}`;
  const currentIndustryName = getActiveToggle(filterToggles, 'Indkey');
  const currentBenchmarkName = getActiveToggle(filterToggles, 'BMID');
  const { currentStartYear, currentComparaisonYear } = entityData;

  const builderPayload = {
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    currentStartYear,
    currentComparaisonYear,
    TabularData: contentData,
  };

  const tableParams = tableBuilder(builderPayload);
  const chartData = chartBuilder(builderPayload);
  const chartChangeData = chartBuilderChange(builderPayload);

  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Employment (total) is the most accurate and up to date measure of the total number of people employed in{' '}
            {prefixedAreaName}. The statistics are modelled by NIEIR to correct for the known undercount of jobs
            recorded in the Census. They estimate the total number of persons employed in an industry sector (full-time
            and part-time) in {prefixedAreaName} regardless of where they live. They are updated annually.
          </p>
          <p>
            By comparing the number of jobs in each industry sector to a regional benchmark, you can clearly see the
            structure of {prefixedAreaName}'s economy. This can be done by directly comparing the area to its benchmark,
            or by using a location quotient to look at the relative size of industries.
          </p>
          <p>
            Estimated total employment by industry should not be considered as a{' '}
            {LinkBuilder(`https://economy.id.com.au/rda-barossa/employment-by-industry-fte?`, `"Full-Time Equivalent"`)}{' '}
            measure as different industries will have different ratios of part-time and full time employees.{' '}
            {LinkBuilder(
              `https://economy.id.com.au/rda-barossa/employment-by-industry-fte?`,
              `Full-time employment by industry`,
            )}{' '}
            statistics are also available.
          </p>
          <p>
            To see how employment is distributed across the area, see the{' '}
            {LinkBuilder(
              `https://economy.id.com.au/rda-barossa/employment-locations?sEndYear=2009&BMID=20`,
              `Employment locations`,
            )}{' '}
            section and to see where people come from to work in these industries, these data should be viewed in
            conjunction with{' '}
            {LinkBuilder(
              `https://economy.id.com.au/rda-barossa/workers-place-of-residence-industry?`,
              `Workers place of residence by industry`,
            )}{' '}
            data.{' '}
          </p>
          <p>
            More granular sub-categories for each industry sector are available in the Employment by industry (Census)
            counts. While Census figures undercount employment they do provide a more detailed picture of the specific
            industries operating in the area.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>National Economics (NIEIR) - Modelled series</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <Note>
        <strong>Please note</strong> – Detailed notes about how the figures are derived can be found in the{' '}
        {LinkBuilder(
          `https://economy.id.com.au/rda-barossa/topic-notes?#employment-(total)-by-industry`,
          `specific
        topic notes section.`,
        )}
      </Note>

      <ControlPanel />

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a data row in the table you will be able to see sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Local workers - field of qualification'} />
      </ItemWrapper>

      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(
            `https://profile.id.com.au/${clientAlias}/industries?WebId=10`,
            `Residents employment by industry by small area`,
          )}
        </CrossLink>
      )}

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
          An analysis of the jobs held by the local workers in {prefixedAreaName} in 2018/19 shows the three largest
          industries were:
        </p>
        <TopThreeFields industryName={currentIndustryName} />
        <ComparisonBenchmark areaName={currentAreaName} benchmarkName={currentBenchmarkName} />
        <MajorDifferences areaName={currentAreaName} benchmarkName={currentBenchmarkName} />
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

export default EmploymentByIndustryTotalPage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) ©2019. Compiled and presented in economy.id by
    <IdLink />. NIEIR-ID data are adjusted each year, using updated employment estimates. Each release may change
    previous years’ figures. {LinkBuilder(`https://economy.id.com.au/monash/economic-model-updates`, 'Learn more')}
  </p>
);

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = ({
  areaName,
  industryName: industry,
  bmName: benchmark,
  currentStartYear,
  currentComparaisonYear,
  TabularData: data,
}) => {
  console.log('data: ', data);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Employment (total) by industry';
  const firstColTitle = 'Industry';
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

  return {
    cssClass: '',
    clientAlias: areaName,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'employment-by-industry-(total)',
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
            cssClass: '',
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
        displayText: `${benchmark}`,
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
          { cssClass: '', displayText: `Total industries`, colSpan: 1 },
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

// #region chart builders
const chartBuilder = ({
  areaName,
  industryName: currentIndustry,
  bmName: currentBenchmark,
  currentStartYear,
  currentComparaisonYear,
  TabularData: data,
}) => {
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
      name: `${currentIndustry}`,
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
  const chartTitle = `Employment (total) by industry ${currentStartYear}`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Percentage of the employed (estimated)`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts.';
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
}) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelName !== 'Total Industries'),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in employment (total) by industry, ${currentComparaisonYear} to ${currentStartYear}`;
  const chartSubtitle = `${areaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Change in the number of employed (estimated)`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${areaName} - ${
      this.series.name
    }: ${formatChangeInt(this.y)}`;
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
