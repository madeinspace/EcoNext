// #region imports
import _ from 'lodash';
import { formatNumber, formatChangeNumber, formatShortDecimal, formatPercent } from '../../../utils/';

import EntityTable from '../../../components/table/EntityTable';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  Headline,
  PageIntro,
  Note,
  Highlight,
  AnalysisContainer,
  SourceBubble,
  ItemWrapper,
  CrossLink,
  ProfileProductIcon,
} from '../../../styles/MainContentStyles';
import InfoBox from '../../../components/InfoBox';
import { Context } from '../../../utils/context';
import getActiveToggle from '../../../utils/getActiveToggle';

// #endregion

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

const HighestQualification = () => {
  const { tableData } = useContext(Context);

  const topquals = TopLevelQualifications(tableData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const biggest: any = highestQuals.pop();

  return (biggest || {}).LabelName;
};

const TopThreeFields = ({ industryName }) => {
  const { tableData } = useContext(Context);

  const topquals = TopLevelQualifications(tableData);
  const highestQuals = HighestQualifications(topquals, 'NoYear1');
  const topThree = TopThree(highestQuals);

  const totalPeople = _.sumBy(topThree, 'NoYear1');
  const totalPercent = _.sumBy(topThree, 'PerYear1');

  return (
    <>
      <ul>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatNumber(qual.NoYear1)} or {formatPercent(qual.PerYear1)}%)
          </li>
        ))}
      </ul>
      <p>
        In combination these three fields accounted for {formatNumber(totalPeople)} people in total or 6
        {formatPercent(totalPercent)}% of {industryName}.
      </p>
    </>
  );
};

const ComparisonBenchmark = ({ areaName, benchmarkName }) => {
  const {
    filters: { IGBMID },
    tableData,
  } = useContext(Context);

  let currentBenchmarkName: any = benchmarkName;

  const industryBenchmark = IGBMID > 1000;

  if (industryBenchmark) {
    currentBenchmarkName = `the ${benchmarkName} workforce in ${areaName}`;
  }

  const topquals = TopLevelQualifications(tableData);
  const highestQuals = HighestQualifications(topquals, 'BMYear1');
  const topThree: any = TopThree(highestQuals);

  if (!topThree.length) return null;

  const formatComparisons = topThree.map(({ BMYear1, LabelName }) => `${formatPercent(BMYear1)} in ${LabelName}`);

  const [lastItem, ...comparisons] = formatComparisons.reverse();

  const and = comparisons.length > 0 ? 'and' : null;

  return (
    <p>
      In comparison, {currentBenchmarkName} employed {comparisons.reverse().join('; ')} {and} {lastItem}.
    </p>
  );
};

const MajorDifferencesHeading = ({ areaName, benchmarkName, industryName }) => {
  const {
    filters: { IGBMID, Indkey },
  } = useContext(Context);

  let industryText = industryName;
  if (Indkey == 23000) {
    //All Industries === 23000
    industryText = 'total';
  }
  industryText = `the ${industryText} workforce`;

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
      The major differences between the fields of qualifications of {industryText} in {areaName} and {benchmarkText}{' '}
      were:
    </Highlight>
  );
};

const MajorDifferences = ({ areaName, benchmarkName, industryName }) => {
  const { tableData } = useContext(Context);

  const topquals = TopLevelQualifications(tableData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);

  return (
    <>
      <MajorDifferencesHeading areaName={areaName} benchmarkName={benchmarkName} industryName={industryName} />
      <ul>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of local workers qualified in
            the field of {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </ul>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName, industryName }) => {
  const {
    filters: { Indkey },
  } = useContext(Context);

  let industryText = industryName;
  if (Indkey == 23000) {
    //All Industries === 23000
    industryText = 'total';
  }
  industryText = `the ${industryText} workforce`;

  return (
    <Highlight>
      The largest changes in fields of qualifications of {industryText} in {areaName} between 2011 and 2016 were:
    </Highlight>
  );
};

const EmergingGroups = () => {
  const { tableData } = useContext(Context);

  const topquals = TopLevelQualifications(tableData);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(highestQuals);

  return (
    <ul>
      {topFour.map((qual: any, i) => (
        <li key={i}>
          {qual.LabelName} ({formatChangeNumber(qual.Change12)} local workers)
        </li>
      ))}
    </ul>
  );
};
// #endregion

// #region page
const LocalWorkerFieldsOfQualificationPage = () => {
  const { clientAlias, clientData, tableData, clientProducts, toggles } = useContext(Context);

  const currentAreaName = getActiveToggle(toggles, 'WebID', clientData.LongName);
  const currentIndustryName = getActiveToggle(toggles, 'Indkey');
  const currentBenchmarkName = getActiveToggle(toggles, 'IGBMID');
  const currentGenderName = getActiveToggle(toggles, 'Sex');

  const tableParams = tableBuilder({
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: tableData,
  });

  const chartData = chartBuilder({
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: tableData,
  });

  const chartChangeData = chartBuilderChange({
    areaName: currentAreaName,
    industryName: currentIndustryName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: tableData,
  });

  const handleExport = () => {};
  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <Headline>
        {HighestQualification() &&
          `Within ${currentAreaName}, there are more workers in ${currentIndustryName} with
      ${HighestQualification()} qualifications than any other field of qualification.`}
      </Headline>
      <PageIntro>
        <div>
          <p>
            Field of Qualification presents the primary field of study for the highest qualification the person has
            received.&nbsp;While this is likely to have some relationship to the current occupation, this is not
            necessarily the case.{' '}
          </p>
          <p>The field of study relates to a number of factors, such as:</p>
          <ul>
            <li>The age of the workforce;</li>
            <li>The type of qualification required to enter an industry;</li>
            <li>The availability of jobs related to fields of qualification in {currentAreaName};</li>
            <li>The types of occupations which are available in an area or industry.</li>
          </ul>
          <p>
            The fields of qualification held by local workers in a particular industry are likely to show the type of
            skills required in that industry. &nbsp;Large numbers of a particular field of qualification in an industry
            may indicate that it is a pre-requisite for that industry. The presence of fields of qualification outside
            the main range of qualifications used in that industry may indicate that the industry values employees of a
            broad educational background, or that people haven't been able to find employment in their chosen field.
          </p>
          <p>
            Field of Qualification information should be looked at in conjunction with{' '}
            <a href={`${clientAlias}/workers-level-of-qualifications?`}>Level of qualification </a>
            and <a href={`${clientAlias}/workers-occupations?`}>Occupation</a> data for a clearer picture of the skills
            available for the local workers in {clientData.LongName}.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>
              Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) &amp; 2016 – by place of work
            </p>
          </div>
        </SourceBubble>
      </PageIntro>
      <Note>
        <strong>Please note</strong> – The 2016 Census used a new methodology to “impute” a work location to people who
        didn’t state their workplace address. As a result, 2016 and 2011 place of work data are not normally comparable.
        To allow comparison between 2011 and 2016, .id has sourced a 2011 dataset from the ABS which was experimentally
        imputed using the same methodology. To provide this detail, {clientData.LongName} in 2011 had to be constructed
        from a best fit of Work Destination Zones (DZNs). While it may not be an exact match to the LGA or region
        boundary, it is considered close enough to allow some comparison. Users should treat this time series data with
        caution, however, and not compare directly with 2011 data from any other source.
      </Note>

      <ItemWrapper>
        <ControlPanel />
      </ItemWrapper>

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
            title="link to forecast"
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
          Analysis of the fields of qualifications of the {currentIndustryName} shows that the three largest fields of
          qualification were:
        </p>
        <TopThreeFields industryName={currentIndustryName} />
        <ComparisonBenchmark areaName={currentAreaName} benchmarkName={currentBenchmarkName} />
        <MajorDifferences
          areaName={currentAreaName}
          benchmarkName={currentBenchmarkName}
          industryName={currentIndustryName}
        />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading areaName={currentAreaName} industryName={currentIndustryName} />
        <EmergingGroups />
      </AnalysisContainer>
      {
        // #endregion
      }
    </>
  );
};

export default LocalWorkerFieldsOfQualificationPage;

// #endregion

// #region table builders
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);

const tableBuilder = ({
  areaName,
  industryName: industry,
  bmName: benchmark,
  genderName: gender,
  TabularData: data,
}) => {
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
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias: 'Monash',
    source: <Source />,
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.',
    anchorName: 'service-age-groups',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Local workers field of qualification - Summary',
            colSpan: 10,
            rowSpan: 0,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: '',
        cols: [
          {
            cssClass: '',
            displayText: `${areaName} - ${industry}`,
            colSpan: 1,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: ' 2016',
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xodd end-year',
            displayText: '2011',
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: 'Change',
            colSpan: 1,
            rowSpan: 0,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Field of qualification (Click rows to view sub-categories)',
        dataType: 'int',
        sortable: false,
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: 'Number',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:#,0}',
      },
      {
        id: 2,
        displayText: '%',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 3,
        displayText: `${benchmark}`,
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 4,
        displayText: 'Number',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:#,0}',
      },
      {
        id: 5,
        displayText: '%',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 6,
        displayText: `${benchmark}`,
        dataType: 'money',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven',
        format: '{0:#,0}',
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
        formatNumber(row.PerYear1),
        formatNumber(row.BMYear1),
        formatNumber(row.NoYear2),
        formatNumber(row.PerYear2),
        formatNumber(row.BMYear2),
        formatChangeNumber(row.Change12, '--'),
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
          formatNumber(childRow.PerYear1),
          formatNumber(childRow.BMYear1),
          formatNumber(childRow.NoYear2),
          formatNumber(childRow.PerYear2),
          formatNumber(childRow.BMYear2),
          formatChangeNumber(childRow.Change12, '--'),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total ${gender}`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.BMYear2), colSpan: 1 },
          {
            cssClass: '',
            displayText: formatChangeNumber(row.Change12),
            colSpan: 1,
          },
        ],
      };
    }),
    noOfRowsOnInit: 16,
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
  return {
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Local workers field of qualification, 2016',
        align: 'left',
      },
      subtitle: {
        text: `${areaName} - ${currentIndustry} - ${gender}`,
        align: 'left',
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
          text: 'Field of qualification',
          align: 'low',
        },
      },
      yAxis: [
        {
          title: {
            text: `Percentage of ${gender} workers`,
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
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: 'http://profile.local.com.au:8666/dist/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard',
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
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Change in local workers field of qualification, 2016',
        align: 'left',
      },
      subtitle: {
        text: `${areaName} - ${currentIndustry}-${gender}`,
        align: 'left',
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
          color: '',
          yAxis: 0,
          name: `${currentIndustry}`,
          data: _.map(parents, 'Change12'),
        },
      ],
      xAxis: {
        categories,
        croshair: false,
        title: {
          text: 'Field of qualification',
          align: 'low',
        },

        labels: {
          staggerLines: 0,
          format: '',
        },
        opposite: false,
      },
      yAxis: [
        {
          title: {
            text: `Change in ${gender} local workers`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatChangeNumber(this.value);
            },
          },
          opposite: false,
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart2',
    logoUrl: 'http://profile.local.com.au:8666/dist/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard',
  };
};

// #endregion
