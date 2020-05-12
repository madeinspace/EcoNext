// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, capitalise, Top } from '../../../utils';
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
  TopList,
} from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region autotext / dynamic content

const genderLookup = {
  Persons: 'resident',
  Males: 'male resident',
  Females: 'female resident',
};

const TopLevelQualifications = data => data.filter(qual => qual.LabelKey < 97000);

const TopFour = Top(4);

const MajorDifferencesHeading = () => {
  const {
    filters: { Indkey },
    entityData: { currentBenchmarkName, prefixedAreaName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  const industryText = Indkey == 23000 ? '' : `(${currentIndustryName})`;

  return (
    <Highlight>
      The major differences between the weekly income of the {genderLookup[currentGenderName]} workers {industryText} in{' '}
      {prefixedAreaName} and {currentBenchmarkName} were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const {
    contentData,
    filters: { Indkey },
    entityData: { currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  const topquals = TopLevelQualifications(contentData);
  const qualsWithData = _.filter(_.filter(topquals, 'PerYear1'), 'BMYear1');
  const majorDifferences = _.sortBy(qualsWithData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);
  const industryText = Indkey == 23000 ? '' : `(${currentIndustryName})`;
  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of{' '}
            {genderLookup[currentGenderName]} workers {industryText} earned {qual.LabelName} (
            {formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

// #endregion

// #region page
const IncomePage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const {
    contentData,
    filters: { Indkey },
    entityData: { currentAreaName, currentBenchmarkName, prefixedAreaName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  const tableParams = tableBuilder({
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    contentData,
  });

  const chartData = chartBuilder({
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    currentIndustryName,
    contentData,
  });

  const allIncomers = contentData.filter(({ LabelKey }) => LabelKey < 999999 && LabelKey != 3115);
  const highIncomers = key =>
    _.sumBy(
      allIncomers.filter(({ LabelKey }) => LabelKey > 3111),
      key,
    );
  const lowIncomers = key =>
    _.sumBy(
      allIncomers.filter(({ LabelKey }) => LabelKey < 3106),
      key,
    );
  const highIncomerClient = formatPercent(highIncomers('PerYear1'));
  const highIncomerBM = formatPercent(highIncomers('BMYear1'));
  const lowIncomerClient = formatPercent(lowIncomers('PerYear1'));
  const lowIncomerBM = formatPercent(lowIncomers('BMYear1'));
  const diffHighClient = highIncomerClient - highIncomerBM;
  const diffLowClient = lowIncomerClient - lowIncomerBM;
  const diffHighIncomeText = diffHighClient < 1 ? 'similar' : highIncomerClient > highIncomerBM ? `higher` : 'lower';
  const diffLowIncomeText = diffLowClient < 1 ? 'similar' : lowIncomerClient > lowIncomerBM ? `higher` : 'lower';
  const industryText = Indkey == 23000 ? '' : `(${currentIndustryName})`;
  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The Individual Income levels of the local resident workers are directly linked to their knowledge,
            experience, qualifications, occupation and skill levels.
          </p>
          <p>
            Income statistics {prefixedAreaName}, when analysed with other data sources, such as{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/age-structure`, `Age structure`)},{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/qualifications`, `Qualification`)} ,{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/hours-worked`, `Hours worked`)} and{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupations`)} , help to evaluate the
            economic opportunities and socio-economic status of {prefixedAreaName}. This also indicates what knowledge
            and skill levels industry can draw upon locally.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>Australian Bureau of Statistics (ABS) – Census 2016 – by usual residence</p>
          </div>
        </SourceBubble>
      </PageIntro>

      <ControlPanel />

      <ItemWrapper>
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
      </ItemWrapper>

      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(
            `http://economy.id.com.au/${clientAlias}/individual-income`,
            `Residents individual income by small area`,
          )}
        </CrossLink>
      )}

      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <AnalysisContainer>
        <h3>Dominant groups</h3>
        <p>
          Analysis of the {genderLookup[currentGenderName]} workers individual income levels in {prefixedAreaName} in
          2016 compared to {currentBenchmarkName} shows that there was a {diffHighIncomeText} proportion earning a high
          income (those earning $1,750 per week or more) as well as a {diffLowIncomeText} proportion of low income
          persons (those earning less than $500 per week).
        </p>
        <p>
          Overall, {highIncomerClient}% of the {genderLookup[currentGenderName]} workers {industryText} earned a high
          income, and {lowIncomerClient}% earned a low income, compared with {highIncomerBM}% and {lowIncomerBM}%
          respectively for Victoria.
        </p>
        <MajorDifferences />
      </AnalysisContainer>

      <RelatedPagesCTA />
    </>
  );
};

export default IncomePage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics, <ABSCensusHousingLink /> 2011 and 2016. Compiled and presented by{' '}
    <IdLink />
  </p>
);

// #endregion

// #region table builders
const tableBuilder = ({ clientAlias, currentAreaName, currentBenchmarkName, currentGenderName, contentData }) => {
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.';
  const tableTitle = `${capitalise(genderLookup[currentGenderName])} workers individual income`;
  const firstColTitle = 'Gross weekly individual income';

  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey !== 999999),
    item => item.LabelKey,
  );

  const parentRows = parents.map(({ LabelName, LabelKey, NoYear1, PerYear1, BMYear1 }) => ({
    expandable: false,
    id: LabelKey,
    data: [LabelName, NoYear1, PerYear1, BMYear1],
    formattedData: [`${LabelName}`, formatNumber(NoYear1), formatPercent(PerYear1), formatPercent(BMYear1)],
  }));

  const footerRows = contentData
    .filter(item => item.LabelKey === 999999)
    .map(({ NoYear1, PerYear1, BMYear1 }) => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total ${currentGenderName}`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(BMYear1), colSpan: 1 },
        ],
      };
    });

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'resident-workers---income',
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
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'even int XXL',
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
  clientAlias,
  currentAreaName,
  currentBenchmarkName,
  currentGenderName,
  currentIndustryName,
  contentData,
}) => {
  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
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

  const chartType = 'column';
  const chartTitle = `${capitalise(genderLookup[currentGenderName])} workers individual income, 2016`;
  const chartSubtitle = `${currentIndustryName} - ${genderLookup[currentGenderName]}`;
  const xAxisTitle = 'Gross weekly income';
  const yAxisTitle = `% of ${genderLookup[currentGenderName]} workforce`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    rawDataSource,
    dataSource: <TableSource />,
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
          pointPadding: 0,
        },
        {
          name: `${currentBenchmarkName}`,
          data: BMYear1Serie,
          pointPadding: 0,
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
