// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  formatChangeInt,
  capitalise,
  absSort,
} from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import { PageIntro, Highlight, AnalysisContainer, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
import getActiveToggle from '../../../utils/getActiveToggle';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
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

const genderLookup = {
  Persons: 'resident',
  Males: 'male resident',
  Females: 'female resident',
};

const TopLevelQualifications = data => data.filter(qual => qual.LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const Top = n => quals =>
  _(quals)
    .takeRight(n)
    .reverse()
    .value();

const TopThree = Top(3);
const TopFour = Top(4);

const MajorDifferencesHeading = ({ areaName, benchmarkName, industryName, gender }) => {
  const {
    filters: { IGBMID, Indkey },
  } = useContext(PageContext);

  let industryText = industryName;
  if (Indkey == 23000) {
    //All Industries === 23000
    industryText = '';
  }
  industryText = `${industryText}`;

  let benchmarkText = benchmarkName;
  const industryBenchmark = IGBMID > 1000;
  if (industryBenchmark) {
    if (IGBMID == 23000) {
      benchmarkText = 'total';
    }
    benchmarkText = `the ${benchmarkText} workforce`;
  }

  return (
    <Highlight>
      The major differences between the hours worked by the {genderLookup[gender]} workers ({industryName}) of{' '}
      {areaName} and {benchmarkText} were:
    </Highlight>
  );
};

const MajorDifferences = ({ areaName, benchmarkName, industryName, gender }) => {
  const { contentData } = useContext(PageContext);

  const qualsWithData = _.filter(_.filter(contentData, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = _.sortBy(TopFour(majorDifferences), 'LabelKey');

  return (
    <>
      <MajorDifferencesHeading
        areaName={areaName}
        benchmarkName={benchmarkName}
        industryName={industryName}
        gender={gender}
      />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of {genderLookup[gender]}{' '}
            workers worked {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName, industryName, gender, perDiff, fullTimeDiff }) => {
  const totalChangeText = `${Math.sign(fullTimeDiff) === -1 ? 'decreased' : 'increased'}`;

  return (
    <>
      <p>
        The number of the {genderLookup[gender]} workers ({industryName}) working full-time (35 hours or more) in{' '}
        {areaName} {totalChangeText} by {Math.abs(fullTimeDiff)} people ({perDiff}%).
      </p>
      <Highlight>
        The largest changes in hours worked by the {genderLookup[gender]} workers ({industryName}) in {areaName} between
        2011 and 2016 were:
      </Highlight>
    </>
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
            {qual.LabelName} ({formatChangeInt(qual.Change12)} {gender.toLowerCase()})
          </li>
        ))}
      </TopList>
    </>
  );
};
// #endregion
// #region page
const ResidentWorkerHoursWorkedPage = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const { contentData, filterToggles, entityData } = useContext(PageContext);

  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);
  const currentIndustryName = getActiveToggle(filterToggles, 'Indkey');
  const currentBenchmarkName = getActiveToggle(filterToggles, 'IGBMID');
  const currentGenderName = getActiveToggle(filterToggles, 'Sex');
  const prefixedAreaName = `${entityData.HasPrefix ? 'the ' : ''} ${getActiveToggle(filterToggles, 'WebID', LongName)}`;

  const compare = (a, b) => (a > b ? 'higher' : 'lower');

  const totalHoursWorked = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
  const LabelKeyNone = 22001;
  const LabelKeyNotStated = 22009;
  const LabelKeyTotal = 999999;

  const working = contentData.filter(
    node => node.LabelKey != LabelKeyTotal && node.LabelKey != LabelKeyNotStated && node.LabelKey != LabelKeyNone,
  );
  const noneOrNotStated = contentData.filter(
    node => node.LabelKey === LabelKeyNone || node.LabelKey === LabelKeyNotStated,
  );
  const totalRow = contentData.filter(node => node.LabelKey === 999999)[0];
  const perDiff = formatPercent((totalRow.NoYear1 / totalRow.NoYear2 - 1) * 100);
  const averageDiff = formatShortDecimal((Math.pow(totalRow.NoYear1 / totalRow.NoYear2, 1 / 5) - 1) * 100);
  const partTimers = working.slice(0, 3);
  const fulTimers = working.slice(3);
  const noneOrNotStatedClient = formatPercent(totalHoursWorked(noneOrNotStated, 'PerYear1'));
  const noneOrNotStatedBM = formatPercent(totalHoursWorked(noneOrNotStated, 'BMYear1'));
  const partTimerClient = formatPercent(totalHoursWorked(partTimers, 'PerYear1'));
  const partTimerBM = formatPercent(totalHoursWorked(partTimers, 'BMYear1'));
  const fullTimerClient = formatPercent(totalHoursWorked(fulTimers, 'PerYear1'));
  const fullTimerClientYear1 = totalHoursWorked(fulTimers, 'NoYear1');
  const fullTimerClientYear2 = totalHoursWorked(fulTimers, 'NoYear2');
  const fullTimerDiff = fullTimerClientYear1 - fullTimerClientYear2;
  // console.log(
  //   `fullTimerClientYear1: ${fullTimerClientYear1}\nfullTimerClientYear2: ${fullTimerClientYear2}\nfullTimerDiff: ${fullTimerDiff}`,
  // );
  const fullTimerBM = formatPercent(totalHoursWorked(fulTimers, 'BMYear1'));

  const comparisonPartTime = compare(partTimerClient, partTimerBM);
  const comparisonFullTime = compare(fullTimerClient, fullTimerBM);

  const tableParams = tableBuilder({
    clientAlias,
    contentData,
    currentBenchmarkName,
    LongName,
    currentIndustryName,
    currentGenderName,
  });
  const chartData = chartBuilder({
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: contentData,
  });

  const chartChangeData = chartBuilderChange({
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: contentData,
  });

  // console.log(`
  // partTimerClient: ${partTimerClient}
  // fullTimerClient: ${fullTimerClient}
  //   noneOrNotStatedClient: ${noneOrNotStatedClient}
  //   partTimerBM: ${partTimerBM}
  //   fullTimerBM: ${fullTimerBM}
  //   noneOrNotStatedBM: ${noneOrNotStatedBM}
  //   `);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Hours worked shows the distribution of employment hours for {currentAreaName}'s residents. Full-time
            employment is considered 35-hours and over.
          </p>
          <p>The hours worked by employed people in {currentAreaName} depends on a number of factors:</p>
          <TopList>
            <li>The availability and take-up of part-time work;</li>
            <li>The industry sector in which they work;</li>
            <li>The occupation level and requirement or opportunity to work overtime, and;</li>
            <li>The age structure and household structure of the working population.</li>
          </TopList>

          <p>
            Hours worked statistics should be viewed in conjunction with{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/age-structure?`, `Age structure`)}{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupations`)}, and{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/income`, `Income`)} to provide more insight into the
            observations made.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>Australian Bureau of Statistics (ABS) – Census 2011 and 2016 – by usual residence</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <ControlPanel />
      <ItemWrapper>
        <EntityTable data={tableParams} name={'Resident workers - Age structure'} />
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
          Analysis of the hours worked by {prefixedAreaName}'s {genderLookup[currentGenderName]} workers in 2016
          compared to {currentBenchmarkName} shows that there was a {comparisonPartTime} proportion of people who worked
          part-time (34 hours or less) and a {comparisonFullTime} proportion of people worked full-time (35 hours or
          more).
        </p>
        <p>
          Overall, {partTimerClient}% of the {genderLookup[currentGenderName]} workers in {currentIndustryName} worked
          part-time (34 hours or less), and {fullTimerClient}% worked full-time (35 hours or more), compared with{' '}
          {partTimerBM}% and {fullTimerBM}% respectively for {currentBenchmarkName}.
        </p>
        <MajorDifferences
          areaName={prefixedAreaName}
          benchmarkName={currentBenchmarkName}
          industryName={currentIndustryName}
          gender={currentGenderName}
        />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading
          gender={currentGenderName}
          areaName={prefixedAreaName}
          industryName={currentIndustryName}
          fullTimeDiff={fullTimerDiff}
          perDiff={perDiff}
        />
        <EmergingGroups gender={currentGenderName} />
      </AnalysisContainer>

      <RelatedPagesCTA />
    </>
  );
};

export default ResidentWorkerHoursWorkedPage;
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
  const tableTitle = 'Resident workers hours worked';
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
    anchorName: 'resident-workers---hours-worked',
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
  areaName,
  industryName: currentIndustry,
  bmName: currentBenchmark,
  genderName: gender,
  TabularData: data,
}) => {
  const parents = _.sortBy(
    data.filter(item => item.LabelKey != 999999),
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

  const chartType = 'bar';
  const chartTitle = `${capitalise(genderLookup[gender])} workers - hours worked, 2016`;
  const chartSubtitle = `${areaName}`;
  const xAxisTitle = 'Hours worked';
  const yAxisTitle = `Percentage of ${genderLookup[gender]} workforce`;
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
          name: `${currentIndustry}`,
          data: perYear1Serie,
        },
        {
          name: `${currentBenchmark}`,
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
const chartBuilderChange = ({
  areaName,
  industryName: currentIndustry,
  bmName: currentBenchmark,
  genderName: gender,
  TabularData: data,
}) => {
  const parents = _.sortBy(
    data.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in ${genderLookup[gender]} workers - hours worked, 2011 to 2016`;
  const chartSubtitle = `${areaName} - ${currentIndustry} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Hours worked';
  const yAxisTitle = `Change in ${genderLookup[gender]} workforce`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
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
