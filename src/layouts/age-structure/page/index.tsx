// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatChangeNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  formatChangeInt,
  capitalise,
  absSort,
  formatChangeOneDecimal,
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

const TopThreeFields = ({ industryName, gender }) => {
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
        In combination these three fields accounted for {formatNumber(totalPeople)} people in total or{' '}
        {formatPercent(totalPercent)}% of {genderLookup[gender]} ({industryName}).
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
      The major difference between the {genderLookup[gender]} workers age structure of {areaName} and {benchmarkText}{' '}
      is:
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
  const topFour = TopFour(majorDifferences);

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
            workers aged {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName, industryName, total, gender, perDiff, averageDiff }) => {
  const totalChangeText = `${Math.sign(total) === -1 ? 'decreased' : 'increased'}`;

  return (
    <>
      <p>
        From 2011 to 2016, {areaName}'s {genderLookup[gender]} workers ({industryName}) population {totalChangeText} by{' '}
        {formatNumber(Math.abs(total))} people ({perDiff}%). This represents an average annual change of {averageDiff}%
        per year over the period.
      </p>
      <Highlight>
        The largest changes in the {genderLookup[gender]} workers age structure in {areaName} between 2011 and 2016 were
        in the age groups:
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
const ResidentWorkerFieldsOfQualificationPage = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const { contentData, filterToggles, entityData } = useContext(PageContext);

  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);
  const currentIndustryName = getActiveToggle(filterToggles, 'Indkey');
  const currentBenchmarkName = getActiveToggle(filterToggles, 'IGBMID');
  const currentGenderName = getActiveToggle(filterToggles, 'Sex');
  const prefixedAreaName = `${entityData.HasPrefix ? 'the ' : ''} ${getActiveToggle(filterToggles, 'WebID', LongName)}`;

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

  const total = _.sortBy(
    contentData.filter(item => item.LabelKey === 999999),
    item => item.LabelKey,
  );

  const totalPersons = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
  const withoutTotal = contentData.filter(node => node.LabelKey != 999999);
  const totalRow = contentData.filter(node => node.LabelKey === 999999)[0];
  const perDiff = formatPercent((totalRow.NoYear1 / totalRow.NoYear2 - 1) * 100);
  const averageDiff = formatShortDecimal((Math.pow(totalRow.NoYear1 / totalRow.NoYear2, 1 / 5) - 1) * 100);
  const youngest = withoutTotal.slice(0, 3);
  const oldest = withoutTotal.slice(3);
  const youngestPercClient = formatPercent(totalPersons(youngest, 'PerYear1'));
  const oldestPercClient = formatPercent(totalPersons(oldest, 'PerYear1'));
  const youngestPercBM = formatPercent(totalPersons(youngest, 'BMYear1'));
  const oldestPercBM = formatPercent(totalPersons(oldest, 'BMYear1'));
  const comparisonClient = youngestPercClient > youngestPercBM ? `higher` : `lower`;

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The Age Structure of {currentAreaName}'s resident workers is indicative of the residential role and function
            of the local area. This includes factors such as when the area was settled; what types of households live
            there; the level of access the area has to employment, services and facilities; the local dwelling stock
            characteristics (including cost of housing); local amenity and a range of other factors that attract people
            to an area.
          </p>
          <p>
            The age structure of {currentAreaName}'s resident workers is indicative of the skill-levels and experience
            that local businesses can draw upon. For example, younger resident workers, while less experienced, are
            typically more mobile and have higher level skills in use of new technologies.
          </p>
          <p>
            For a complete local resident workers analysis for Monash, Age Structure should be analysed in conjunction
            with {LinkBuilder(`http://economy.id.com.au/${clientAlias}/qualifications`, `Qualification`)},{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupations`)},{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/hours-worked`, `Hours worked`)} and{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/income`, `Income`)}.
          </p>
        </div>
        2
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
          Analysis of the {genderLookup[currentGenderName]} workers ({currentIndustryName}) age structure of{' '}
          {prefixedAreaName} in 2016 compared to {currentBenchmarkName} shows that there was a {comparisonClient}{' '}
          proportion of {currentGenderName.toLowerCase()} in the younger age groups (15 to 44 years) as well as a lower
          proportion of {currentGenderName.toLowerCase()} in the older age groups (45 years and over).
        </p>
        <p>
          Overall, {youngestPercClient}% of the {genderLookup[currentGenderName]} workers was aged under 45 years,
          compared to {youngestPercBM}% for Victoria. {oldestPercClient}% were aged 45 years and over, compared to{' '}
          {oldestPercBM}% for Victoria.
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
          total={total[0]['Change12']}
          perDiff={perDiff}
          averageDiff={averageDiff}
        />
        <EmergingGroups gender={currentGenderName} />
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

export default ResidentWorkerFieldsOfQualificationPage;

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
  const tableTitle = 'Resident workers age structure';
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
  const chartTitle = `${capitalise(genderLookup[gender])} workers age group, 2016`;
  const chartSubtitle = `${currentIndustry} - ${genderLookup[gender]}`;
  const xAxisTitle = 'Age group';
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
          name: `${areaName}`,
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
  const chartTitle = `Change in ${genderLookup[gender]} workers age structure, 2011 to 2016`;
  const chartSubtitle = `${areaName} - ${currentIndustry} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Age group';
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
