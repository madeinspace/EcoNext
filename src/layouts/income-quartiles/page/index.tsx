// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, capitalise, absSort } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import { PageIntro, AnalysisContainer, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
// #endregion

// #region autotext / dynamic content
const genderLookup = {
  Persons: 'resident',
  Males: 'male resident',
  Females: 'female resident',
};

const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);

const EmergingGroupsHeading = () => {
  const {
    contentData,
    filters: { Indkey },
    entityData: { currentGenderName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const highestQuartile = HighestQualifications(
    contentData[0].data.filter(({ LabelKey }) => LabelKey != 999999),
    'Change12',
  ).reverse();
  const absHighests = absSort(highestQuartile, 'Change12').reverse();
  const HighestQuartileName = absHighests[0]['LabelName'].toLowerCase();
  const changeText = Math.sign(absHighests[0]['Change12']) === -1 ? 'decrease' : 'increase';
  const HighestQuartileFigure = formatNumber(Math.abs(absHighests[0]['Change12']));
  const industryText = Indkey == 23000 ? '' : `(${currentIndustryName})`;

  return (
    <>
      <p>
        The most significant change for the {genderLookup[currentGenderName]} workers {industryText} in{' '}
        {prefixedAreaName} between 2011 and 2016 was in the {HighestQuartileName} quartile which showed an {changeText}{' '}
        of {HighestQuartileFigure} {genderLookup[currentGenderName]}.
      </p>
    </>
  );
};
// #endregion

// #region page
const IncomeQuartilePage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    filters: { Indkey },
    entityData: { currentAreaName, currentBenchmarkName, prefixedAreaName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);

  const tabularData = contentData[0].data;

  const tableIncomeQuartilesParams = tableIncomeQuartilesBuilder({
    clientAlias,
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    contentData: tabularData,
  });
  const tableQuartileRangesParams = tableQuartileRangesBuilder({
    clientAlias,
    contentData: contentData[1].data,
  });

  const chartData = chartBuilder({
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    contentData: tabularData,
  });

  const chartChangeData = chartBuilderChange({
    currentAreaName,
    currentBenchmarkName,
    currentGenderName,
    contentData: tabularData,
  });
  const allQuartiles = tabularData.filter(({ LabelKey }) => LabelKey < 999999);
  const highestGroupArea = allQuartiles.filter(({ LabelKey }) => LabelKey === 31004)[0]['PerYear1'];
  const highestGroupBM = allQuartiles.filter(({ LabelKey }) => LabelKey === 31004)[0]['BMYear1'];
  const lowestGroupArea = allQuartiles.filter(({ LabelKey }) => LabelKey === 31001)[0]['PerYear1'];
  const lowestGroupBM = allQuartiles.filter(({ LabelKey }) => LabelKey === 31001)[0]['BMYear1'];
  const highestIncomeProportionText = highestGroupArea > highestGroupBM ? 'greater' : 'lesser ';
  const lowesttIncomProportionText = lowestGroupArea > lowestGroupBM ? 'greater' : 'lesser ';
  const industryText = Indkey == 23000 ? '' : `(${currentIndustryName})`;

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Individual Income is an indicator of socio-economic status, skills and occupations required in a particular
            industry. With other data sources, such as Qualifications and Occupation, it helps to evaluate the economic
            opportunities of people in an industry.
          </p>
          <p>
            Income quartiles are used to condense income categories into manageable units, adjust for the effects of
            inflation, and allow areas to be compared over time relative to a benchmark. The incomes for the state are
            split into four equal groups, each containing 25% of the local labour force, and the quartiles allow users
            to compare changes in the local area to changes statewide, or against another benchmark. For more
            information on how quartiles are calculated please refer to the data notes.
          </p>
          <p>
            As well as being related to the type of jobs and qualifications required in a particular industry, income
            levels can be related to the level of{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/hours-worked`, `part-time employment`)},{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/occupations`, `Occupations`)},{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/qualifications`, `Qualification`)} and the{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/age-structure`, `Age structure`)} of the local
            resident workers, so the data should be looked at in conjunction with these topics.
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
        <EntityTable data={tableIncomeQuartilesParams} name={'Resident workers - Income quartiles'} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableQuartileRangesParams} name={'Quartile group dollar ranges (Individuals)'} />
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
          Income quartiles allow us to compare relative income-earning capabilities across time. Analysis of the
          distribution of the {genderLookup[currentGenderName]} workers {industryText} by income quartile in{' '}
          {prefixedAreaName} compared to {currentBenchmarkName} shows that there was {highestIncomeProportionText}{' '}
          proportion of {currentGenderName.toLowerCase()} in the highest income quartile, and a{' '}
          {lowesttIncomProportionText} proportion in the lowest income quartile.
        </p>
      </AnalysisContainer>

      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading />
      </AnalysisContainer>
      <RelatedPagesCTA />
    </>
  );
};

export default IncomeQuartilePage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Derived from the Australian Bureau of Statistics, <ABSCensusHousingLink /> 2011 and 2016. Compiled and
    presented <IdLink />.
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
const tableIncomeQuartilesBuilder = ({
  clientAlias,
  currentAreaName,
  currentBenchmarkName,
  currentGenderName,
  contentData,
}) => {
  const rawDataSource = `Source: Derived from the Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016. Compiled and presented in profile.id by .id , the population experts.`;
  const tableTitle = `${capitalise(genderLookup[currentGenderName])} workers individual income quartiles`;
  const firstColTitle = `Quartile group`;

  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );

  const parentRows = parents.map(
    ({ LabelName, LabelKey, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12 }) => ({
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
        cssClass: 'even int S',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int S',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'even int M',
      },
      {
        id: 4,
        displayText: 'Number',
        cssClass: 'odd int S',
      },
      {
        id: 5,
        displayText: '%',
        cssClass: 'odd int S',
      },
      {
        id: 6,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int M',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int S',
      },
    ],
    rows: parentRows,
    footRows: footerRows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region table builders
const tableQuartileRangesBuilder = ({ clientAlias, contentData }) => {
  const rawDataSource = ``;
  const tableTitle = `Quartile group dollar ranges (Individuals)`;
  const firstColTitle = 'Individual quartile ranges';

  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    item => item.LabelKey,
  );

  const parentRows = parents.map(({ LabelKey, LabelName, TxYear2016, TxYear2011 }) => ({
    id: LabelKey,
    data: [LabelName, TxYear2016, TxYear2011],
    formattedData: [`${LabelName}`, TxYear2016, TxYear2011],
  }));

  return {
    cssClass: '',
    clientAlias,
    source: '',
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
            displayText: `Quartile group dollar ranges (Individuals)`,
            colSpan: 1,
          },
          {
            cssClass: 'sub even  left-align',
            displayText: ' Weekly income by Census year',
            colSpan: 2,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: firstColTitle,
        cssClass: 'odd first XXXL left-align',
      },
      {
        id: 1,
        displayText: '2016',
        cssClass: 'even int XXXL left-align',
      },
      {
        id: 2,
        displayText: '2011',
        cssClass: 'even int XXXL left-align',
      },
    ],
    rows: parentRows,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = ({ currentAreaName, currentBenchmarkName, currentGenderName, contentData }) => {
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
  const chartTitle = `${capitalise(genderLookup[currentGenderName])} workers field of qualifications, 2016`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Gross weekly individual income';
  const yAxisTitle = `% of ${genderLookup[currentGenderName]} workforce`;
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
          pointPadding: 0.03,
        },
        {
          name: `${currentBenchmarkName}`,
          data: BMYear1Serie,
          pointPadding: 0.03,
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
const chartBuilderChange = ({ currentAreaName, currentBenchmarkName, currentGenderName, contentData }) => {
  const parents = _.sortBy(
    contentData.filter(({ LabelKey }) => LabelKey != 999999),
    ({ LabelKey }) => LabelKey,
  );
  const categories = _.map(parents, 'LabelName');
  const chartType = 'column';
  const chartTitle = `Change in ${genderLookup[currentGenderName]} workers individual income quartiles, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} `;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Income quartile group';
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
          name: `${currentBenchmarkName}`,
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
