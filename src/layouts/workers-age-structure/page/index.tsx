// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, absSort } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  PageIntro,
  Highlight,
  AnalysisContainer,
  SourceBubble,
  ItemWrapper,
  Note,
} from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
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

const TopLevelQualifications = data => data.filter(qual => qual.LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const Top = n => quals =>
  _(quals)
    .takeRight(n)
    .reverse()
    .value();

const TopFour = Top(4);

const MajorDifferencesHeading = () => {
  const {
    filters: { IGBMID, Indkey },
    entityData: { currentBenchmarkName, prefixedAreaName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  let benchmarkText = currentBenchmarkName;
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.replace(/s\b/gi, '');
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  const industryBenchmark = IGBMID > 1000;
  if (industryBenchmark) {
    if (IGBMID == 23000) {
      benchmarkText = 'total';
    }
    benchmarkText = `the ${benchmarkText} ${genderText.toLowerCase()} workforce`;
  }
  return (
    <Highlight>
      The major differences between the age structure of the {industryText} {genderText.toLowerCase()} workforce in{' '}
      {prefixedAreaName} and {benchmarkText} were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const {
    contentData,
    entityData: { currentGenderName },
  } = useContext(PageContext);
  const qualsWithData = contentData.filter(({ LabelKey }) => LabelKey != 999999);
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = _.orderBy(TopFour(majorDifferences), 'LabelKey');
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.replace(/s\b/gi, '');

  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of {genderText.toLowerCase()}{' '}
            local workers aged {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to{' '}
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
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;

  return (
    <Highlight>
      The largest changes in the age structure of the {industryText} {genderText} workforce in {prefixedAreaName}{' '}
      between 2011 and 2016 were:
    </Highlight>
  );
};

const EmergingGroups = ({ gender }) => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));

  return (
    <>
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeInt(qual.Change12)} {gender.toLowerCase()} local workers)
          </li>
        ))}
      </TopList>
    </>
  );
};
// #endregion

// #region page
const WorkersAgeStructurePage = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData,
    filters: { Sex, Indkey },
    entityData: { currentGenderName, currentAreaName, currentBenchmarkName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const tableParams = tableBuilder({
    clientAlias,
    contentData,
    currentBenchmarkName,
    LongName,
    currentIndustryName,
    currentGenderName,
  });

  const chartData = chartBuilder({
    currentGenderName,
    currentIndustryName,
    currentBenchmarkName,
    currentAreaName,
    contentData,
  });

  const chartChangeData = chartBuilderChange({
    currentGenderName,
    currentAreaName,
    currentIndustryName,
    contentData,
  });
  console.log('currentGenderName: ', currentGenderName);

  const totalPersons = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
  const withoutTotal = contentData.filter(node => node.LabelKey != 999999);
  const youngest = withoutTotal.slice(0, 3);
  const oldest = withoutTotal.slice(3);
  const youngestPercClient = formatPercent(totalPersons(youngest, 'PerYear1'));
  const oldestPercClient = formatPercent(totalPersons(oldest, 'PerYear1'));
  const youngestPercBM = formatPercent(totalPersons(youngest, 'BMYear1'));
  const oldestPercBM = formatPercent(totalPersons(oldest, 'BMYear1'));
  const comparisonYoung =
    Math.abs(youngestPercClient - youngestPercBM) <= 0.5
      ? 'similar'
      : youngestPercClient > youngestPercBM
      ? `higher`
      : `lower`;
  const comparisonOld =
    Math.abs(oldestPercClient - oldestPercBM) <= 0.5 ? 'similar' : oldestPercClient > oldestPercBM ? `higher` : `lower`;
  const genderText = currentGenderName === 'Persons' ? 'people' : currentGenderName.toLowerCase();
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  const genderTextAlt = +Sex === 3 ? '' : genderText.replace(/s\b/gi, '').toLowerCase();
  console.log('genderTextAlt: ', genderTextAlt);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The Age Structure of an industry's local workers is a key component to understanding the role and function
            of that industry in {prefixedAreaName}. It is an indicator of the age of the industry and how long it has
            been established in the area, as well as the possible challenges in expanding that industry in the future.
          </p>
          <p>
            For example an area with young local workers may be more mobile and likely to change jobs/industries in the
            future while an industry with an older local workers may face succession planning issues and challenges in
            attracting new staff.
          </p>
          <p>
            For a complete local workers analysis for Monash, Age Structure should be viewed in conjunction with{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/income`, `Income`)} and{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/hours-worked`, `Hours worked`)}.
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
        imputed using the same methodology. To provide this detail, City of Monash in 2011 had to be constructed from a
        best fit of Work Destination Zones (DZNs). While it may not be an exact match to the LGA or region boundary, it
        is considered close enough to allow some comparison. Users should treat this time series data with caution,
        however, and not compare directly with 2011 data from any other source.
      </Note>

      <ControlPanel />

      <ItemWrapper>
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
      </ItemWrapper>

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
          Analysis of the age structure of the {industryText} {genderTextAlt} workforce in {prefixedAreaName} in 2016
          compared to {currentBenchmarkName} shows that there was a {comparisonYoung} proportion of {genderText} in the
          younger age groups (15 to 44 years) and a {comparisonOld} proportion of {genderText} in the older age groups
          (45 years and over).
        </p>
        <p>
          Overall, {youngestPercClient}% of the {industryText} {genderTextAlt} workforce was aged under 45 years,
          compared to {youngestPercBM}% for {currentBenchmarkName}. {oldestPercClient}% were aged 45 years and over,
          compared to {oldestPercBM}% for {currentBenchmarkName}.
        </p>

        <MajorDifferences />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading />
        <EmergingGroups gender={genderTextAlt} />
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

export default WorkersAgeStructurePage;

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
  contentData,
  currentBenchmarkName,
  LongName,
  currentIndustryName,
  currentGenderName,
}) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Local workers age structure';
  const firstColTitle = `Ten year age groups (years)`;
  const rows = contentData
    .filter(node => node.LabelKey !== 999999)
    .map(row => ({
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
    }));
  const total = contentData.filter(node => node.LabelKey === 999999);
  const totalGender = total.map(row => {
    return {
      cssClass: 'total',
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
  });

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'local-workers---age',
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
        cssClass: 'heading ',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${LongName} - ${currentIndustryName}`,
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
        displayText: `${currentBenchmarkName}%`,
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
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int',
      },
    ],
    rows,
    footRows: totalGender,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = ({
  currentGenderName,
  currentIndustryName,
  currentBenchmarkName,
  currentAreaName,
  contentData,
}) => {
  const parents = _.sortBy(
    contentData.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );

  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.BMYear1,
    };
  });
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName.replace(/s\b/gi, '').toLowerCase()}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const chartType = 'bar';
  const chartTitle = `Local ${genderText} workers age structure, 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} ${separator} ${currentGenderName}`;
  const xAxisTitle = 'Age structure';
  const yAxisTitle = `% of ${genderText} local workforce`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
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
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatPercent(
            this.y,
          )}%`;
        },
      },
      series: [
        {
          name: `${currentIndustryName}`,
          data: perYear1Serie,
        },
        {
          name: `${currentBenchmarkName}`,
          data: BMYear1Serie,
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
const chartBuilderChange = ({ currentGenderName, currentAreaName, currentIndustryName, contentData }) => {
  const parents = _.sortBy(
    contentData.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName.replace(/s\b/gi, '').toLowerCase()}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in ${genderText.toLowerCase()} local workers age structure, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} ${separator} ${currentGenderName} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Age structure';
  const yAxisTitle = `Change in ${genderText.toLowerCase()} local workers`;
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
