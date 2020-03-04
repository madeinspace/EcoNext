// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, absSort, formatOneDecimal } from '../../../utils/';
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
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import styled from 'styled-components';
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

const TopThree = Top(3);
const TopFour = Top(4);

const TopThreeFields = () => {
  const {
    contentData,
    filters: { Sex, Indkey },
    entityData: { currentGenderName, currentIndustryName },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree = TopThree(highestQuals);
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  const totalPeople = _.sumBy(topThree, 'NoYear1');
  const totalPercent = _.sumBy(topThree, 'PerYear1');

  return (
    <>
      <TopList>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatNumber(qual.NoYear1)} local workers or {formatPercent(qual.PerYear1)}%)
          </li>
        ))}
      </TopList>
      <p>
        In combination these three occupations accounted for {formatNumber(totalPeople)} people in total or{' '}
        {formatPercent(totalPercent)}% of the {currentIndustryName} {genderText} local workers.
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

  const formatComparisons = topThree.map(({ BMYear1, LabelName }) => `${formatPercent(BMYear1)}% as ${LabelName}`);

  const [lastItem, ...comparisons] = formatComparisons.reverse();

  const and = comparisons.length > 0 ? 'and' : null;

  return (
    <p>
      In comparison, {currentBenchmarkName} employed {comparisons.reverse().join('; ')} {and} {lastItem}.
    </p>
  );
};

const MajorDifferencesHeading = () => {
  const {
    filters: { IGBMID, Indkey, Sex },
    entityData: { currentBenchmarkName, prefixedAreaName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;

  return (
    <Highlight>
      The major differences between the jobs held by the {industryText} {genderText} workforce in {prefixedAreaName} and{' '}
      {currentBenchmarkName} were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const {
    contentData,
    filters: { Sex, Indkey },
    entityData: { currentGenderName, currentIndustryName },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  const industryText = +Indkey === 23000 ? '' : `(${currentIndustryName})`;
  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of {genderText} local workers
            {industryText} employed as {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to{' '}
            {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = () => {
  const {
    filters: { Sex, Indkey },
    entityData: { prefixedAreaName, currentGenderName, currentIndustryName },
  } = useContext(PageContext);
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  return (
    <Highlight>
      The largest changes in the jobs held by the {industryText} {genderText} workforce in {prefixedAreaName} between
      2011 and 2016 were those employed as:
    </Highlight>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);
  const {
    filters: { Sex },
    entityData: { currentGenderName },
  } = useContext(PageContext);
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));

  return (
    <>
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeInt(qual.Change12)} {genderText} local workers)
          </li>
        ))}
      </TopList>
    </>
  );
};
// #endregion

// #region page
const WorkersOccupationsPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const {
    contentData,
    filters: { Sex },
    entityData: { currentAreaName, currentBenchmarkName, prefixedAreaName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  const tableParams = tableBuilder({
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentIndustryName,
    currentGenderName,
    contentData,
  });

  const chartData = chartBuilder();

  const chartChangeData = chartBuilderChange({
    currentAreaName,
    currentIndustryName,
    currentGenderName,
    contentData,
  });

  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/, '');
  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Occupation is a key component for evaluating the socio-economic status of the local workers and the skills
            required to work in each industry sector.
          </p>
          <p>The occupations of the local workers in {prefixedAreaName} will be influenced by factors including:</p>
          <TopList>
            <li>The economic base and employment opportunities available in {prefixedAreaName};</li>
            <li>The age of the workforce;</li>
            <li>The skill and qualification level required to enter an industry; and</li>
            <li>The working and social aspirations of the population.</li>
          </TopList>
          <p>
            For a complete local workers analysis for {prefixedAreaName}, view Occupations in conjunction with other
            indicators, such as{' '}
            {LinkBuilder(
              `http://economy.id.com.au/${clientAlias}/workers-level-of-qualifications`,
              `Educational qualifications`,
            )}{' '}
            and {LinkBuilder(`http://economy.id.com.au/${clientAlias}/income`, `Income`)}.
          </p>
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
        imputed using the same methodology. To provide this detail, {prefixedAreaName} in 2011 had to be constructed
        from a best fit of Work Destination Zones (DZNs). While it may not be an exact match to the LGA or region
        boundary, it is considered close enough to allow some comparison. Users should treat this time series data with
        caution, however, and not compare directly with 2011 data from any other source.
      </Note>

      <ControlPanel />

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a data row in the table you will be able to see sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Resident workers - Occupations of employment'} />
      </ItemWrapper>

      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(`http://profile.id.com.au/${clientAlias}/occupations`, `Residents occupation by small area`)}
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
          An analysis of the jobs held by the {currentIndustryName} {genderText} workforce in {prefixedAreaName} in 2016
          shows the three most popular occupations were:
        </p>
        <TopThreeFields />
        <ComparisonBenchmark areaName={prefixedAreaName} benchmarkName={currentBenchmarkName} />
        <MajorDifferences />
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

export default WorkersOccupationsPage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics, <ABSCensusHousingLink /> 2011 and 2016. Compiled and presented by{' '}
    <IdLink />
  </p>
);

const ChartSource = () => (
  <p>
    Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id
    by <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = ({
  clientAlias,
  currentAreaName,
  currentBenchmarkName,
  currentIndustryName,
  currentGenderName,
  contentData,
}) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Local workers occupations';
  const firstColTitle = 'Occupations (Click rows to view sub-categories)';
  const footerRows = contentData.filter(item => item.IndustryName === 'Total');
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const tableSubtitle = `${currentAreaName} - ${currentIndustryName} ${separator} ${genderText}`;
  const parents = _.sortBy(
    contentData.filter(({ Hierarchy, LabelKey }) => Hierarchy === 'P' && LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );
  const children = contentData.filter(({ Hierarchy }) => Hierarchy === 'C');

  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 1000,
    );
  });

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'local-workers---occupations',
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
            displayText: `${tableSubtitle}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: ' 2016',
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: '2011',
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
        cssClass: 'even int L',
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
        cssClass: 'odd int L',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
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
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total ${currentGenderName}`, colSpan: 1 },
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
const chartBuilder = () => {
  const {
    filters: { IGBMID },
    contentData,
    entityData: { currentAreaName, currentBenchmarkName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  const parents = _.sortBy(
    contentData.filter(item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'),
    item => item.LabelKey,
  );
  const children = contentData.filter(item => item.Hierarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 1000,
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
      name: `${currentAreaName}`,
      id: `${parent.LabelName}-peryear`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.PerYear1];
      }),
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentBenchmarkName}`,
      id: `${parent.LabelName}-change`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.BMYear1];
      }),
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const chartType = 'bar';
  const chartTitle = `Local workers occupations, 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} ${separator} ${genderText}`;
  const xAxisTitle = 'Occupations';
  const yAxisTitle = `% of ${genderText.toLowerCase().replace(/s\b/, '')} local workers`;
  const serieTitle = +IGBMID < 23000 ? `${currentAreaName}` : `${currentIndustryName}`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id the population experts.';
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
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatOneDecimal(this.y)}%`;
        },
      },
      series: [
        {
          name: serieTitle,
          data: perYear1Serie,
        },
        {
          name: `${currentBenchmarkName}`,
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
const chartBuilderChange = ({ currentAreaName, currentIndustryName, currentGenderName, contentData }) => {
  const parents = _.sortBy(
    contentData.filter(item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'),
    item => item.LabelKey,
  );
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in local workers occupations, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} ${separator} ${genderText}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Occupations';
  const yAxisTitle = `Change in ${genderText.toLowerCase().replace(/s\b/, '')} local workers`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${currentAreaName} - ${
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
          name: `${currentIndustryName}`,
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
