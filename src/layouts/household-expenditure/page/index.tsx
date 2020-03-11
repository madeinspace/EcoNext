// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  formatChangeInt,
  formatChangeCurrency,
  formatCurrency,
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
import { IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';
import styled from 'styled-components';
import useEntityText from '../../../utils/useEntityText';

// #endregion

const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;
// #region autotext / dynamic content

// #region page
const HouseholdExpenditurePage = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const {
    contentData,
    entityData: {
      currentAreaName,
      currentBenchmarkName,
      currentIndustryName,
      prefixedAreaName,
      currentStartYear,
      currentComparaisonYear,
    },
  } = useContext(PageContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Household Expenditure is modelled based on a set of expenditure items collected every 5 years in the ABS
            Household Expenditure Survey. Household Expenditure is a useful measure of the economic resources available
            to households in the area and where their income is spent. Areas with good public transport infrastructure
            and access to jobs may spend less on transport and more on discretionary spending such as entertainment.
            More disadvantaged areas may spend a higher proportion of their income on food and transport. An examination
            of the distribution of household spending per household may provide insights into the socio-economic status
            of the area.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>National Economics (NIEIR) - Modelled series</p>
          </div>
        </SourceBubble>
      </PageIntro>

      <ControlPanel />

      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilderChange()} />
      </ItemWrapper>

      <RelatedPagesCTA />
    </>
  );
};

export default HouseholdExpenditurePage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by
      <IdLink />. Data are based on a 2016-17 price base for all years. NIEIR-ID data are inflation adjusted each year
      to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.{' '}
      {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};

const ChartSource = () => (
  <p>
    Source: <NierLink /> ©2019 Compiled and presented in economy.id by <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentBenchmarkName, currentAreaName, currentStartYear, currentComparaisonYear },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019. Compiled and presented in economy.id by .id, the population experts. Data are based on a 2016-17 price base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.';
  const tableTitle = 'Household expenditure';
  const firstColTitle = 'Household expenditure (totals)';
  const without = [99999999, 9999999, 999999];

  const rows = data.filter(({ LabelKey }) => !without.includes(LabelKey));
  const totaux = _.takeRight(data, 3);
  console.log('totaux: ', totaux);
  console.log('data: ', data);

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'household-expenditure',
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
            displayText: `${currentAreaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 4,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparaisonYear}`,
            colSpan: 4,
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
        displayText: '$ per household',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '% of expenditure',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: `${currentBenchmarkName}$`,
        cssClass: 'even int',
      },
      {
        id: 5,
        displayText: '$ per household',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: `% of expenditure`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 8,
        displayText: `${currentBenchmarkName}$`,
        cssClass: 'odd int',
      },
      {
        id: 9,
        displayText: `${currentComparaisonYear} - ${currentStartYear} `,
        cssClass: 'even int',
      },
    ],
    rows: rows.map(
      ({
        LabelKey,
        LabelName,
        NoYear1,
        PerYear1,
        BMYear1,
        BMPerYear1,
        NoYear2,
        PerYear2,
        BMYear2,
        BMPerYear2,
        Change12,
      }) => ({
        id: LabelKey,
        data: [LabelName, NoYear1, PerYear1, BMYear1, BMPerYear1, NoYear2, PerYear2, BMYear2, BMPerYear2, Change12],
        formattedData: [
          `${LabelName}`,
          formatCurrency(NoYear1),
          `${formatPercent(PerYear1)}%`,
          formatCurrency(BMYear1),
          `${formatPercent(BMPerYear1)}%`,
          formatCurrency(NoYear2),
          `${formatPercent(PerYear2)}%`,
          formatCurrency(BMYear2),
          `${formatPercent(BMPerYear2)}%`,
          formatChangeInt(Change12, '--'),
        ],
      }),
    ),
    footRows: totaux.map(
      ({
        LabelKey,
        LabelName,
        NoYear1,
        PerYear1,
        BMYear1,
        BMPerYear1,
        NoYear2,
        PerYear2,
        BMYear2,
        BMPerYear2,
        Change12,
      }) => {
        return {
          cssClass: '',
          cols: [
            { cssClass: '', displayText: `${LabelName}`, colSpan: 1 },
            { cssClass: '', displayText: formatCurrency(NoYear1), colSpan: 1 },
            { cssClass: '', displayText: `${formatPercent(PerYear1)}%`, colSpan: 1 },
            { cssClass: '', displayText: formatCurrency(BMYear1), colSpan: 1 },
            { cssClass: '', displayText: `${formatPercent(BMPerYear1)}%`, colSpan: 1 },
            { cssClass: '', displayText: formatCurrency(NoYear2), colSpan: 1 },
            { cssClass: '', displayText: `${formatPercent(PerYear2)}%`, colSpan: 1 },
            { cssClass: '', displayText: formatCurrency(BMYear2), colSpan: 1 },
            { cssClass: '', displayText: `${formatPercent(BMPerYear2)}%`, colSpan: 1 },
            { cssClass: '', displayText: formatChangeInt(Change12, '--'), colSpan: 1 },
          ],
        };
      },
    ),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    contentData: data,
    entityData: { currentBenchmarkName, currentAreaName, currentStartYear, currentComparaisonYear },
  } = useContext(PageContext);

  const without = [99999999, 9999999, 999999];
  const parents = data.filter(({ LabelKey }) => !without.includes(LabelKey));

  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.BMPerYear1,
    };
  });

  const chartType = 'bar';
  const chartTitle = `Household expenditure ${currentStartYear}`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Household expenditure';
  const yAxisTitle = `% of expenditure`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const chartHeight = 500;

  return {
    highchartOptions: {
      height: chartHeight,
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
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
// #endregion

// #region chart builder change
const chartBuilderChange = () => {
  const {
    contentData: data,
    entityData: { currentAreaName, currentStartYear, currentComparaisonYear },
  } = useContext(PageContext);

  const without = [99999999, 9999999, 999999];
  const parents = data.filter(({ LabelKey }) => !without.includes(LabelKey));
  const categories = _.map(parents, 'LabelName');
  const chartType = 'bar';
  const chartTitle = `Change in household expenditure, ${currentComparaisonYear} to ${currentStartYear}`;
  const chartSubtitle = `${currentAreaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Household expenditure';
  const yAxisTitle = `% per household`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';
  const chartHeight = 500;

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
      this.category
    }, ${currentAreaName}: ${formatChangeInt(this.y)}`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      height: chartHeight,
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
          name: ``,
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
              return `${formatChangeCurrency(this.value)}`;
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
