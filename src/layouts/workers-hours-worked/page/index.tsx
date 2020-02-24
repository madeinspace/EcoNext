// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, capitalise, absSort } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import { PageIntro, Highlight, AnalysisContainer, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
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

  let industryText = currentIndustryName;
  if (Indkey == 23000) {
    //All Industries === 23000
    industryText = '';
  }
  industryText = `${industryText}`;

  let benchmarkText = currentBenchmarkName;
  const industryBenchmark = IGBMID > 1000;
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  if (industryBenchmark) {
    if (IGBMID == 23000) {
      benchmarkText = 'total';
    }
    benchmarkText = `the ${benchmarkText} ${genderText} workforce`;
  }

  return (
    <Highlight>
      The major differences between the hours worked by the {currentIndustryName} {genderText} workforce in{' '}
      {prefixedAreaName} and {benchmarkText} were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const {
    contentData,
    entityData: { currentGenderName },
  } = useContext(PageContext);
  console.log('contentData: ', contentData);
  const qualsWithData = _.filter(
    _.filter(
      contentData.filter(({ LabelKey }) => LabelKey != 999999),
      'PerYear1',
    ),
  );
  console.log('qualsWithData: ', qualsWithData);
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    const res = _.max(compare) - _.min(compare);
    return res;
  });
  const topFour = _.orderBy(TopFour(majorDifferences), 'LabelKey');
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');

  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of {genderText} local workers
            who {qual.LabelKey === 22001 ? 'did not work' : `worked ${qual.LabelName}`} ({formatPercent(qual.PerYear1)}%
            compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = () => {
  const {
    entityData: { currentGenderName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  return (
    <Highlight>
      The largest changes in the hours worked by the {currentIndustryName} {genderText} workforce in {prefixedAreaName}{' '}
      between 2011 and 2016 were: <br />
    </Highlight>
  );
};

const EmergingGroups = () => {
  const {
    contentData,
    entityData: { currentGenderName },
  } = useContext(PageContext);
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
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
const WorkersHoursWorkedPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentBenchmarkName, currentIndustryName, prefixedAreaName, currentGenderName },
  } = useContext(PageContext);

  const compare = (a, b) => (a > b ? 'higher' : 'lower');

  const totalHoursWorked = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
  const LabelKeyNotStated = 22009;
  const LabelKeyTotal = 999999;
  const working = contentData.filter(({ LabelKey }) => LabelKey != LabelKeyTotal && LabelKey != LabelKeyNotStated);
  const partTimers = working.slice(0, 4);
  const fulTimers = working.slice(4);
  const partTimerClient = formatPercent(totalHoursWorked(partTimers, 'PerYear1'));
  const fullTimerClient = formatPercent(totalHoursWorked(fulTimers, 'PerYear1'));
  const partTimerBM = formatPercent(totalHoursWorked(partTimers, 'BMYear1'));
  const fullTimerBM = formatPercent(totalHoursWorked(fulTimers, 'BMYear1'));
  const comparisonPartTime = compare(parseFloat(partTimerClient), parseFloat(partTimerBM));
  const comparisonFullTime = compare(parseFloat(fullTimerClient), parseFloat(fullTimerBM));

  const tableParams = tableBuilder({
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentIndustryName,
    prefixedAreaName,
    currentGenderName,
    contentData,
  });
  const chartData = chartBuilder({
    currentAreaName,
    currentBenchmarkName,
    currentIndustryName,
    currentGenderName,
    contentData,
  });

  const chartChangeData = chartBuilderChange({
    currentAreaName,
    currentIndustryName,
    currentGenderName,
    contentData,
  });
  const genderText = currentGenderName === 'Persons' ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Hours Worked statistics shows the distribution of employment hours in Monash across each industry sector.
            Full-time employment is considered 35-hours and over.
          </p>
          <p>The hours worked by employed people in a particular industry depend on a number of factors:</p>
          <TopList>
            <li>The availability and take-up of part-time work in the industry;</li>
            <li>The demands of jobs in the industry and requirement to work overtime;</li>
            <li>The age and family responsibilities of people working in the industry; and</li>
            <li>
              The gender profile of workers in the industry (due to family commitments, females are often more likely to
              work part-time).
            </li>
          </TopList>

          <p>
            Hours Worked data should be viewed in conjunction with{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/age-structure?`, `Age structure`)},{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupation`)} and{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/income`, `Income`)}.
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
      <ItemWrapper>
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartChangeData} />
      </ItemWrapper>
      <AnalysisContainer>
        <h3>Dominant groups</h3>
        <p>
          Analysis of the hours worked by the {currentIndustryName} {genderText} workforce in {prefixedAreaName} in 2016
          compared to the {currentBenchmarkName} {genderText} workforce within {prefixedAreaName} shows that there was a{' '}
          {comparisonPartTime} proportion who worked part-time (34 hours or less) and a {comparisonFullTime} proportion
          who worked full-time (35 hours or more).
        </p>
        <p>
          Overall, {partTimerClient}% of the {currentIndustryName} {genderText} workforce worked part-time (34 hours or
          less) , and {fullTimerClient}% worked full-time (35 hours or more), compared with {partTimerBM}% and{' '}
          {fullTimerBM}% respectively for the {currentBenchmarkName} {genderText} workforce within City of Monash.
        </p>
        <MajorDifferences />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading />
        <EmergingGroups />
      </AnalysisContainer>

      <RelatedPagesCTA />
    </>
  );
};

export default WorkersHoursWorkedPage;
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
  prefixedAreaName,
  currentGenderName,
  contentData,
}) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Local workers hours worked, 2016';
  const firstColTitle = `Hours worked`;
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
    anchorName: 'local-workers---hours-worked',
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
            displayText: `${currentAreaName} - ${currentIndustryName}`,
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
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'odd int L',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int L',
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
  currentAreaName,
  currentBenchmarkName,
  currentIndustryName,
  currentGenderName,
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
  const genderText =
    currentGenderName === 'Persons' ? 'Local' : `${currentGenderName.toLowerCase().replace(/s\b/gi, '')} local`;
  const chartType = 'bar';
  const chartTitle = `${capitalise(genderText)} workers - hours worked, 2016`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Hours worked';
  const yAxisTitle = `% of ${genderText} local workers`;
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
const chartBuilderChange = ({ currentAreaName, currentIndustryName, currentGenderName, contentData }) => {
  const parents = _.sortBy(
    contentData.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );
  const genderText =
    currentGenderName === 'Persons' ? 'Local' : `${currentGenderName.toLowerCase().replace(/s\b/gi, '')} local`;
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in ${genderText} workers - hours worked, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Hours worked';
  const yAxisTitle = `Change in ${genderText} workers`;
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
