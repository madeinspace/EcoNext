// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, absSort, Top } from '../../../utils/';
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
  Note,
  TopList,
} from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region autotext / dynamic content

const TopLevelQualifications = data => data.filter(({ LabelKey }) => LabelKey < 97000);

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const TopFour = Top(4);

const MajorDifferencesHeading = () => {
  const {
    filters: { Indkey, Sex },
    entityData: { currentGenderName, prefixedAreaName, currentIndustryName, currentBenchmarkName },
  } = useContext(PageContext);
  const industryText = +Indkey === 23000 ? '' : `(${currentIndustryName})`;
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');

  return (
    <Highlight>
      The major differences between the qualifications held by the {genderText} workforce {industryText} of{' '}
      {prefixedAreaName} and {currentBenchmarkName} were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const {
    contentData,
    filters: { Indkey, Sex },
    entityData: { currentGenderName, currentIndustryName },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);
  const industryText = +Indkey === 23000 ? '' : `(${currentIndustryName})`;
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of {genderText} local workers{' '}
            {industryText} with {qual.LabelName} ({formatPercent(qual.PerYear1)}% compared to{' '}
            {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = ({ areaName }) => {
  const {
    filters: { Indkey, Sex },
    entityData: { currentGenderName, currentIndustryName },
  } = useContext(PageContext);

  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  return (
    <>
      <p>
        The largest changes in the qualifications held by the {industryText} {genderText} workforce in {areaName}{' '}
        between 2011 and 2016 were:
      </p>
    </>
  );
};

const EmergingGroups = () => {
  const {
    contentData,
    filters: { Sex },
    entityData: { currentGenderName },
  } = useContext(PageContext);
  const PersonWithQualification = contentData.filter(({ LabelKey }) => LabelKey != 999999 && LabelKey != 25009);
  const highestQuals = HighestQualifications(PersonWithQualification, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');

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
const WorkerLevelOfQualificationPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const {
    contentData,
    filters: { Sex, Indkey },
    entityData: { currentGenderName, currentAreaName, currentBenchmarkName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const tableBuilderParams = {
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    currentIndustryName,
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
  const WithQual = dataNoTotal.filter(({ LabelKey }) => LabelKey < 25008);
  const NoQual = dataNoTotal.filter(({ LabelKey }) => LabelKey === 25008);
  const totalQual = _.sumBy(WithQual, 'NoYear1');
  const totalNoQual = _.sumBy(NoQual, 'NoYear1');
  const percQualClient = formatPercent(_.sumBy(WithQual, 'PerYear1'));
  const percNoQualClient = formatPercent(_.sumBy(NoQual, 'PerYear1'));
  const percQualBM = formatPercent(_.sumBy(WithQual, 'BMYear1'));
  const percNoQualBM = formatPercent(_.sumBy(NoQual, 'BMYear1'));
  const withQual = Math.abs(totalQual - totalNoQual) < 1 ? 'similar' : totalQual > totalNoQual ? 'higher' : 'lower';
  const withoutQual = Math.abs(totalNoQual - totalQual) < 1 ? 'similar' : totalNoQual > totalQual ? 'higher' : 'lower';
  const genderText = +Sex === 3 ? '' : currentGenderName.toLowerCase().replace(/s\b/gi, '');
  const industryText = +Indkey === 23000 ? '' : `(${currentIndustryName})`;

  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Qualification levels help to evaluate the economic opportunities and socio-economic status of local workers
            in a particular industry.
          </p>
          <p>The level of qualifications in a workforce relate to a number of factors including:</p>
          <TopList>
            <li>The age of the workforce;</li>
            <li>The skill and qualification level required to enter an industry;</li>
            <li>
              The professional or working ambitions of people (to seek education as youth or retraining as adults);
            </li>
            <li>The opportunities afforded to people to continue studying beyond compulsory schooling.</li>
          </TopList>
          <p>
            Educational Qualification statistics should be looked at in conjunction with{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/field-of-qualification`, `Field of qualification`)}{' '}
            and {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupations`)} data for a full
            education analysis for {prefixedAreaName}.
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
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
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
          Analysis of the qualifications of the {genderText} in {prefixedAreaName} in 2016 compared to{' '}
          {currentBenchmarkName} shows that there was a {withQual} proportion holding formal qualifications (Bachelor or
          higher degree; Advanced Diploma or Diploma; or Vocational qualifications), and a {withoutQual} proportion with
          no formal qualifications.
        </p>
        <p>
          Overall, {percQualClient}% of the {genderText} workers {industryText} who held educational qualifications, and{' '}
          {percNoQualClient}% had no qualifications, compared with {percQualBM}% and {percNoQualBM}% respectively for{' '}
          {currentBenchmarkName}.
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

export default WorkerLevelOfQualificationPage;

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
  currentGenderName,
  contentData,
  currentIndustryName,
}) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id informed decisions.';
  const tableTitle = `Local workers qualifications`;
  const firstColTitle = 'Qualification level';
  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const headingText = `${currentAreaName} - ${currentIndustryName} ${separator} ${genderText}`;
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
    anchorName: 'local-workers---qualifications',
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
            displayText: headingText,
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

  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const chartType = 'bar';
  const chartTitle = `Local workers qualification, 2016`;
  const chartSubtitle = `${currentIndustryName} ${separator} ${genderText}`;
  const xAxisTitle = 'Qualifications';
  const yAxisTitle = `% of ${genderText.toLowerCase().replace(/s\b/gi, '')} local workers`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id informed decisions.';
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
  const genderText = currentGenderName === 'Persons' ? '' : `${currentGenderName}`;
  const separator = currentGenderName === 'Persons' ? '' : '-';
  const chartType = 'bar';
  const chartTitle = `Change in local workers qualification, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} ${separator} ${genderText}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Qualifications';
  const yAxisTitle = `Change in ${genderText.toLowerCase().replace(/s\b/gi, '')} local workers`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id informed decisions.';
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
