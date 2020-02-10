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
import { ABSCensusHousingLink, IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';
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

const absSort = (arr, sortKey) => {
  //build comparison function
  function absoluteValueComparison(a, b) {
    //sort by absolute value
    if (Math.abs(a[sortKey]) < Math.abs(b[sortKey])) {
      return -1;
    } else if (Math.abs(a[sortKey]) > Math.abs(b[sortKey])) {
      return 1;
      //sort identical absolute values in numerical order
    } else if (a[sortKey] < b[sortKey]) {
      return -1;
    } else if (a[sortKey] > b[sortKey]) {
      return 1;
    } else {
      return 0;
    }
  }
  //call comparison function as callback in array sort
  return arr.sort(absoluteValueComparison);
};

const TopThreeFields = () => {
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
      In comparison, {benchmarkName} employed {comparisons.reverse().join('; ')} {and} {lastItem}.
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

const EmergingGroupsHeading = ({ areaName }) => {
  return (
    <Highlight>
      The largest changes in the jobs held by local workers between 2011 and 2016 in {areaName} were for those employed
      in:
    </Highlight>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);
  const topquals = TopLevelQualifications(contentData);
  const topFour = TopFour(absSort(topquals, 'Change12'));

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
const EmploymentCensusPage = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const { contentData, filterToggles, entityData } = useContext(PageContext);

  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);
  const prefixedAreaName = `${entityData.HasPrefix ? 'the ' : ''} ${getActiveToggle(filterToggles, 'WebID', LongName)}`;
  const currentBenchmarkName = getActiveToggle(filterToggles, 'BMID');
  const { currentStartYear, currentComparaisonYear } = entityData;

  const builderPayload = {
    areaName: currentAreaName,
    industryName: LongName,
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
            Census employment data presents the number of persons employed in each industry sector (full-time and
            part-time) in Monash regardless of where they live. By comparing the number of jobs in each industry sector
            to a regional benchmark, you can clearly see local economic strengths and weaknesses. By looking at how the
            number of jobs in each industry is changing over time, you can track how the structure of the local economy
            is changing. Go to the{' '}
            {LinkBuilder(`http://economy.idcommdev.idc.local/monash/employment-locations?`, `Employment locations`)}{' '}
            page to see where employment is taking place across {prefixedAreaName}.
          </p>
          <p>
            <strong>Note: </strong>Census employment figures are known to undercount employment by varying amounts
            depending on the Census year. All Census counts are an undercount of total population, and in addition, some
            people don’t state their workforce status or industry. Also counts by place of work exclude those with no
            fixed workplace address. For this reason, it is recommended that for total job numbers, users look at the{' '}
            {LinkBuilder(
              `http://economy.idcommdev.idc.local/monash/employment-by-industry?`,
              `Employment by
            industry (Total)`,
            )}{' '}
            modelled estimates which are updated on an annual basis, and based on the ABS Labour Force survey, less
            prone to undercount. The Census counts by industry are included here for a greater level of industry detail
            (3-digit ANZSIC).
          </p>{' '}
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) & 2016 – by place of work</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <Note>
        <strong>Please note: </strong> The 2016 Census used a new methodology to “impute” a work location to people who
        didn’t state their workplace address. As a result, 2016 and 2011 place of work data are not normally comparable.
        To allow comparison between 2011 and 2016, .id has sourced a 2011 dataset from the ABS which was experimentally
        imputed using the same methodology. To provide this detail, City of Monash in 2011 had to be constructed from a
        best fit of Work Destination Zones (DZNs). While it may not be an exact match to the LGA or region boundary, it
        is considered close enough to allow some comparison. Users should treat this time series data with caution,
        however, and not compare directly with 2011 data from any other source.
      </Note>

      <ControlPanel />

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a data row in the table you will be able to see sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Employment by Industry (Census)'} />
      </ItemWrapper>

      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(
            `https://profile.id.com.au/${clientAlias}/industries`,
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
          An analysis of the jobs held by the local workers in {prefixedAreaName} in 2016 shows the three most popular
          industry sectors were:
        </p>
        <TopThreeFields />
        <ComparisonBenchmark benchmarkName={currentBenchmarkName} />
        <MajorDifferences areaName={prefixedAreaName} benchmarkName={currentBenchmarkName} />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading areaName={prefixedAreaName} />
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

export default EmploymentCensusPage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: Australian Bureau of Statistics,{' '}
      {LinkBuilder(`http://www.abs.gov.au/census`, `Census of Population and Housing`)} 2011 and 2016. Compiled and
      presented by <IdLink />.
    </p>
  );
};

const ChartSource = () => (
  <p>
    Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id
    by .id, the population experts.
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
    clientAlias: areaName,
    source: <TableSource />,
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
            cssClass: '',
            displayText: `${areaName}`,
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

// #region chart builders
const chartBuilder = ({ areaName, bmName: currentBenchmark, TabularData: data }) => {
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
  const chartTitle = `Employment (Census) by industry sector, 2016`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Industry';
  const yAxisTitle = `% of workforce`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.';
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
const chartBuilderChange = ({ areaName, industryName: currentIndustry, TabularData: data }) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.LabelName !== 'Total [genders]'),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in employment (Census) by industry sector, 2011 to 2016`;
  const chartSubtitle = `${areaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry';
  const yAxisTitle = `Change in workforce`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2011 and 2016 Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
      this.category
    }, ${areaName}: ${formatChangeInt(this.y)}`;
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
