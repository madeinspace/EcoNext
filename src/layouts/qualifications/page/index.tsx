// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, capitalise, absSort } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  PageIntro,
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

const TopLevelQualifications = data => data.filter(({ LabelKey }) => LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const Top = n => quals =>
  _(quals)
    .takeRight(n)
    .reverse()
    .value();

const TopThree = Top(3);
const TopFour = Top(4);

const MajorDifferencesHeading = () => {
  const {
    entityData: { currentGenderName, prefixedAreaName, currentIndustryName, currentBenchmarkName },
  } = useContext(PageContext);

  return (
    <Highlight>
      The major differences between qualifications held by the {genderLookup[currentGenderName]} workers (
      {currentIndustryName}) of {prefixedAreaName} and ({currentBenchmarkName}) were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const {
    contentData,
    entityData: { currentGenderName, currentIndustryName },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topThree = TopThree(majorDifferences);

  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topThree.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of{' '}
            {genderLookup[currentGenderName]} workers ({currentIndustryName}) with {qual.LabelName} (
            {formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName }) => {
  const {
    entityData: { currentGenderName, currentIndustryName },
  } = useContext(PageContext);
  return (
    <>
      <p>
        The largest changes in the qualifications held by the {genderLookup[currentGenderName]} workers (
        {currentIndustryName}) in {areaName} between 2011 and 2016 were:
      </p>
    </>
  );
};

const EmergingGroups = () => {
  const {
    contentData,
    entityData: { currentGenderName },
  } = useContext(PageContext);
  const dataNoTotal = contentData.filter(({ LabelKey }) => LabelKey != 999999);
  const PersonWithQualification = dataNoTotal.filter(({ LabelKey }) => LabelKey != 25009);
  const highestQuals = HighestQualifications(PersonWithQualification, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));

  return (
    <>
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeInt(qual.Change12)} {currentGenderName.toLowerCase()})
          </li>
        ))}
      </TopList>
    </>
  );
};
// #endregion

// #region page
const ResidentWorkerFieldsOfQualificationPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentGenderName, currentAreaName, currentBenchmarkName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const tableBuilderParams = {
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    contentData,
  };

  const chartBuilderParams = {
    currentAreaName,
    currentBenchmarkName,
    currentIndustryName,
    currentGenderName,
    contentData,
  };

  const tableParams = tableBuilder(tableBuilderParams);
  const chartData = chartBuilder(chartBuilderParams);
  const chartChangeData = chartBuilderChange(chartBuilderParams);
  const dataNoTotal = contentData.filter(({ LabelKey }) => LabelKey != 999999);
  const PersonWithQualification = dataNoTotal.filter(({ LabelKey }) => LabelKey != 25009 && LabelKey != 25008);
  const PersonsWithoutQualification = dataNoTotal.filter(({ LabelKey }) => LabelKey === 25008);
  const totalPersonWithQualification = _.sumBy(PersonWithQualification, 'NoYear1');
  const totalPersonsWithoutQualification = _.sumBy(PersonsWithoutQualification, 'NoYear1');
  const percentagePersonWithQualificationClient = formatPercent(_.sumBy(PersonWithQualification, 'PerYear1'));
  const percentagePersonsWithoutQualificationClient = formatPercent(_.sumBy(PersonsWithoutQualification, 'PerYear1'));
  const percentagePersonWithQualificationBM = formatPercent(_.sumBy(PersonWithQualification, 'BMYear1'));
  const percentagePersonsWithoutQualificationBM = formatPercent(_.sumBy(PersonsWithoutQualification, 'BMYear1'));
  const withQual = totalPersonWithQualification > totalPersonsWithoutQualification ? 'higher' : 'lower';
  const withoutQual = totalPersonsWithoutQualification > totalPersonWithQualification ? 'higher' : 'lower';

  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Education is an essential means of building the knowledge and skill levels of the labour force, which is a
            key factor in achieving future economic and social development.
          </p>
          <p>
            The level of educational attainment for {prefixedAreaName}'s resident workforce relates to a number of
            factors including:
          </p>
          <TopList>
            <li>The age structure of the resident workforce;</li>
            <li>
              The professional or social ambitions of people to obtain qualifications (that is, to seek education and
              retraining);
            </li>
            <li>The opportunities afforded to people to continue studying beyond compulsory schooling, and;</li>
            <li>The knowledge and skill requirements of the local industries.</li>
          </TopList>
          <p>
            Qualification should be looked at in conjunction with{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/income`, `Income`)} ,{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupations`)} and{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/field-of-qualification`, `Field of qualification`)}{' '}
            for a clearer picture of the knowledge and skill level of {prefixedAreaName}'s local resident workers.
          </p>
          <p>
            When comparing the Qualifications of local resident worker with local workers, Qualifications statistics
            indicates whether an economy draws on the skills offered by its own residents or on a different set of
            skills imported from elsewhere in the region.
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
        <EntityTable data={tableParams} name={'Resident workers - Qualifications'} />
      </ItemWrapper>

      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />{' '}
          {LinkBuilder(
            `http://profile.id.com.au/${clientAlias}/qualifications`,
            `Residents qualifications by small area`,
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
          Analysis of the qualifications of the {genderLookup[currentGenderName]} workers ({currentIndustryName}) in{' '}
          {prefixedAreaName} in 2016 compared to {currentBenchmarkName} shows that there was a {withQual} proportion of{' '}
          {genderLookup[currentGenderName]} holding formal qualifications (Bachelor or higher degree; Advanced Diploma
          or Diploma; or Vocational qualifications), and a {withoutQual} proportion of males with no formal
          qualifications.
        </p>
        <p>
          Overall, {percentagePersonWithQualificationClient}% of the {genderLookup[currentGenderName]} workers (
          {currentIndustryName}) held educational qualifications, and {percentagePersonsWithoutQualificationClient}% had
          no qualifications, compared with {percentagePersonWithQualificationBM}% and{' '}
          {percentagePersonsWithoutQualificationBM}% respectively for {currentBenchmarkName}.
        </p>
        <MajorDifferences />
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
const tableBuilder = ({ clientAlias, currentAreaName, currentBenchmarkName, currentGenderName, contentData }) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Resident workers qualifications';
  const firstColTitle = 'Qualification level';
  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );
  const parentRows = parents.map(
    ({ LabelKey, LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12 }) => ({
      id: LabelKey,
      data: [LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12],
      formattedData: [
        `${LabelName}`,
        formatNumber(NoYear1),
        formatPercent(PerYear1),
        formatPercent(BMYear1),
        formatNumber(NoYear2),
        formatPercent(PerYear2),
        formatPercent(BMYear2),
        formatChangeInt(Change12, '--'),
      ],
    }),
  );

  const footerRows = contentData
    .filter(({ LabelKey }) => LabelKey === 999999)
    .map(({ NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12 }) => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total ${currentGenderName}`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(BMYear2), colSpan: 1 },
          { cssClass: '', displayText: formatChangeInt(Change12), colSpan: 1 },
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
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentAreaName} - ${currentGenderName}`,
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
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int',
      },
    ],
    rows: parentRows,
    footRows: footerRows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = ({
  currentAreaName,
  currentIndustryName,
  currentBenchmarkName,
  currentGenderName,
  contentData,
}) => {
  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );

  const perYear1Serie = parents.map(({ LabelName, PerYear1 }) => ({
    name: LabelName,
    y: PerYear1,
  }));

  const BMYear1Serie = parents.map(({ LabelName, BMYear1 }) => ({
    name: LabelName,
    y: BMYear1,
  }));

  const chartType = 'bar';
  const chartTitle = `${capitalise(genderLookup[currentGenderName])} workers qualifications, 2016`;
  const chartSubtitle = `${currentIndustryName} - ${genderLookup[currentGenderName]}`;
  const xAxisTitle = 'Qualifications';
  const yAxisTitle = `Percentage of ${genderLookup[currentGenderName]} workforce`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
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
          name: `${currentAreaName}`,
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
  };
};
// #endregion

// #region chart builder change
const chartBuilderChange = ({ currentAreaName, currentIndustryName, currentGenderName, contentData }) => {
  const parents = _.sortBy(
    contentData.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in ${genderLookup[currentGenderName]} workers qualifications, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Qualifications';
  const yAxisTitle = `Change in ${genderLookup[currentGenderName]} workforce`;
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
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
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
  };
};

// #endregion
