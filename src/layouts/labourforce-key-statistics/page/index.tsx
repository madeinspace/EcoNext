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

const TopLevelQualifications = data => data.filter(qual => qual.Hierarchy === 'P' && qual.LabelKey < 97000);

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
      The major differences between the field of qualifications held by the {genderLookup[gender]} workers (
      {industryText}) of {areaName} and {benchmarkText} were:
    </Highlight>
  );
};

const MajorDifferences = ({ areaName, benchmarkName, industryName, gender }) => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
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
            workers ({industryName}) qualified in the field of {qual.LabelName} ({formatPercent(qual.PerYear1)}%
            compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName, industryName, total, gender }) => {
  const {
    filters: { Indkey },
  } = useContext(PageContext);

  const totalChangeText = `${Math.sign(total) === -1 ? 'decreased' : 'increased'}`;

  return (
    <>
      <Highlight>
        The number of {genderLookup[gender]} workers ({industryName}) in {areaName} {totalChangeText} by{' '}
        {formatNumber(Math.abs(total))} between 2011 and 2016.
      </Highlight>
      <p>
        The largest change in the field of qualifications held by the {genderLookup[gender]} workers ({industryName})
        between 2011 and 2016 in {areaName} was for those qualified in:
      </p>
    </>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));

  return (
    <>
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeNumber(qual.Change12)} local workers)
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
  const {
    contentData,
    entityData: { currentAreaName, currentGenderName, currentBenchmarkName, prefixedAreaName, currentIndustryName },
  } = useContext(PageContext);

  const tableParams = tableBuilder({
    clientAlias,
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: contentData,
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
    contentData.filter(item => item.Hierarchy === 'P' && item.IndustryName === 'Total'),
    item => item.LabelKey,
  );

  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Field of qualification presents the primary field of study for the highest qualification the person has
            received. While this is likely to have some relationship to their current occupation, this is not
            necessarily the case.
          </p>
          <p>
            The presence of specific qualifications among the {currentAreaName}'s resident workforce, which are not used
            by local industry, may indicate an opportunity for a new industry to move into the area and access a ready
            labour force.
          </p>
          <p>The field of study relates to a number of factors, such as:</p>
          <TopList>
            <li>The age of the population;</li>
            <li>
              The types of industries and occupations located in the {currentAreaName} or within commuting distance, and
              their qualification requirements;
            </li>
            <li>The availability of educational institutions with those curricula nearby;</li>
            <li>The socio-economic status of {currentAreaName}, and;</li>
            <li>The mobility of the population to move where particular skills are required.</li>
          </TopList>

          <p>
            Field of Qualification should be looked at in conjunction with{' '}
            {LinkBuilder(
              `http://economy.id.com.au/${clientAlias}/qualifications?Sex=3&IGBMID=40&Indkey=23000`,
              `Qualification`,
            )}{' '}
            and{' '}
            {LinkBuilder(
              `http://economy.id.com.au/${clientAlias}/occupations?Sex=3&IGBMID=40&Indkey=23000`,
              `Occupations`,
            )}{' '}
            statistics for a clearer picture of the skills available in the resident worker population.
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
          <a
            href={`http://profile.id.com.au/${clientAlias}/qualifications?WebId=10`}
            target="_blank"
            rel="noopener"
            title="link to profile"
          >
            Residents qualifications by small area
          </a>
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
          Analysis of the field of qualifications in {prefixedAreaName} shows that the three largest fields the{' '}
          {genderLookup[currentGenderName]} resident workers (Agriculture, Forestry and Fishing) were qualified in were:
        </p>
        <TopThreeFields industryName={currentIndustryName} gender={currentGenderName} />
        <ComparisonBenchmark areaName={prefixedAreaName} benchmarkName={currentBenchmarkName} />
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
  areaName,
  industryName: industry,
  bmName: benchmark,
  genderName: gender,
  TabularData: data,
}) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Resident workers field of qualification';
  const firstColTitle = 'Field of qualification (Click rows to view sub-categories)';
  const footerRows = data.filter(item => item.IndustryName === 'Total');
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');

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
            displayText: `${areaName} - ${industry}`,
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
        formatShortDecimal(row.PerYear1),
        formatShortDecimal(row.BMYear1),
        formatNumber(row.NoYear2),
        formatShortDecimal(row.PerYear2),
        formatShortDecimal(row.BMYear2),
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
          formatShortDecimal(childRow.PerYear1),
          formatShortDecimal(childRow.BMYear1),
          formatNumber(childRow.NoYear2),
          formatShortDecimal(childRow.PerYear2),
          formatShortDecimal(childRow.BMYear2),
          formatChangeInt(childRow.Change12, '--'),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total ${gender}`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatShortDecimal(row.PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatShortDecimal(row.BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatShortDecimal(row.PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatShortDecimal(row.BMYear2), colSpan: 1 },
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
  genderName: gender,
  TabularData: data,
}) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');
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
  const chartTitle = `${capitalise(genderLookup[gender])} workers field of qualifications, 2016`;
  const chartSubtitle = `${currentIndustry} - ${genderLookup[gender]}`;
  const xAxisTitle = 'Field of qualification';
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
  genderName: gender,
  TabularData: data,
}) => {
  const parents = _.sortBy(
    data.filter(item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in ${genderLookup[gender]} workers field of qualifications, 2011 to 2016`;
  const chartSubtitle = `${areaName} - ${currentIndustry} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Field of qualification';
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