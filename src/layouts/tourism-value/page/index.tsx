// #region imports
import {
  formatNumber,
  formatPercent,
  formatChangeInt,
  idlogo,
  formatOneDecimal,
  formatChangeOneDecimal,
  formatShortDecimal,
  formatLongNumber,
  formatCurrency,
  formatMillionsCurrencyNoRounding,
  multiplesOf,
} from '../../../utils/';
import { ProfileProductIcon, ItemWrapper, CrossLink, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import * as Highcharts from 'highcharts';
import RelatedPagesCTA from '../../../components/RelatedPages';
import _ from 'lodash';
// #endregion

// #region population page
const TourismValuePage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const hasProfile = () => clientProducts.some(product => product.AppID === 1);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Tourism and hospitality are key industries and major contributors to Australia’s economy. However it has not
            been well represented in economic profiles in the past, because it actually includes parts of many different
            traditional industries.
          </p>
          <p>
            The Australian Bureau of Statistics publish the “Tourism Satellite Account” which is a separate set of
            national accounts which look at the value and contribution of tourism in the national economy.
          </p>
          <p>
            This dataset presents National Economics microsimulation model of the tourism satellite account at the local
            level, showing the value of total sales and value add, as well as annual estimates of employment and FTE
            employment for the tourism sector.
          </p>
          <p>
            Understanding the current role of your tourism sector is important if you are looking at attracting visitors
            to your area, and as information for businesses looking to locate in the area.Tourism data should be viewed
            in conjunction with broader industry data in the Value added, Output and Employment by industry (Total)
            topics, as well as tourism Workforce characteristics.
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
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chart2Builder()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chart3Builder()} />
      </ItemWrapper>

      <RelatedPagesCTA />
    </>
  );
};

export default TourismValuePage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: <NierLink /> ©2020. Compiled and presented in economy.id by <IdLink />. Data is based on 2016-17 constant
    prices for all years. NIEIR data are inflation adjusted each year to allow direct comparison, and new data releases
    normally adjust previous years’ figures to a new base year.
  </p>
);
const ChartSource = () => (
  <p>
    Source: <NierLink /> ©2020. Compiled and presented in economy.id by <IdLink />.
  </p>
);
// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentStartYear, currentComparisonYear, currentBenchmarkName },
  } = useContext(PageContext);
  const anchorName = 'value-of-tourism';
  const tableTitle = `Value of tourism and hospitality`;
  const distinctMeasures = multiplesOf(contentData[0].data, 10);
  const parents: any = distinctMeasures.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        id: cur.LabelKey,
        displayText: cur.LabelName,
        children: contentData[0].data.filter(({ LabelKey }) => LabelKey > cur.LabelKey && LabelKey < cur.LabelKey + 10),
      },
    ],
    [],
  );
  const orderedParents = [...parents].sort();
  const rows = orderedParents.map(({ id, displayText, children }) => {
    return {
      alreadyExpanded: true,
      expandable: false,
      cssClass: 'plain',
      id: id,
      data: [displayText, '', '', '', '', '', '', '', '', ''],
      formattedData: [`${displayText}`, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      childRows: children.map(
        ({
          Impact,
          LabelKey,
          NoYear1,
          TotIndustryPerYear1,
          TotBMIndustryPerYear1,
          PerYear1,
          NoYear2,
          TotIndustryPerYear2,
          TotBMIndustryPerYear2,
          PerYear2,
          Change12,
        }) => ({
          id: LabelKey,
          data: [
            Impact,
            NoYear1,
            TotIndustryPerYear1,
            TotBMIndustryPerYear1,
            PerYear1,
            NoYear2,
            TotIndustryPerYear2,
            TotBMIndustryPerYear2,
            PerYear2,
            Change12,
          ],
          formattedData: [
            `${Impact}`,
            id === 30 || id === 40 ? formatLongNumber(NoYear1) : formatNumber(NoYear1),
            formatPercent(TotIndustryPerYear1),
            formatPercent(TotBMIndustryPerYear1),
            formatPercent(PerYear1),
            id === 30 || id === 40 ? formatLongNumber(NoYear2) : formatNumber(NoYear2),
            formatPercent(TotIndustryPerYear2),
            formatPercent(TotBMIndustryPerYear2),
            formatPercent(PerYear2),
            id === 30 || id === 40 ? formatChangeOneDecimal(Change12) : formatChangeInt(Change12),
          ],
        }),
      ),
    };
  });

  return {
    cssClass: '',
    allowSort: false,
    allowSortReset: false,
    groupOn: '',
    clientAlias: clientAlias,
    source: <Source />,
    anchorName,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 7,
            rowSpan: 0,
          },
        ],
        key: 'hr0',
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
            cssClass: 'even ',
            displayText: `${currentStartYear}`,
            colSpan: 4,
          },
          {
            cssClass: 'odd ',
            displayText: `${currentComparisonYear}`,
            colSpan: 4,
          },
          {
            cssClass: 'even sub',
            displayText: `Change`,
            colSpan: 1,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Measure',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        displayText: `${currentAreaName}`,
        cssClass: 'even int XL',
      },
      {
        id: 2,
        displayText: '% of total industry',
        cssClass: 'even int XS',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'even int XS',
      },
      {
        id: 4,
        displayText: `${currentAreaName} as % of ${currentBenchmarkName}`,
        cssClass: 'even int XS',
      },
      {
        id: 5,
        displayText: `${currentAreaName}`,
        cssClass: 'odd int XL',
      },
      {
        id: 6,
        displayText: '% of total industry',
        cssClass: 'odd int XS',
      },
      {
        id: 7,
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'odd int XS',
      },
      {
        id: 8,
        displayText: `${currentAreaName} as % of ${currentBenchmarkName}`,
        cssClass: 'odd int XS',
      },
      {
        id: 9,
        displayText: `${currentStartYear} to ${currentComparisonYear}`,
        cssClass: 'even int ',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    contentData,
    entityData: { currentAreaName, currentStartYear, currentBenchmarkName },
  } = useContext(PageContext);
  const distinctMeasures = multiplesOf(contentData[0].data, 10);
  const parents: any = distinctMeasures.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        id: cur.LabelKey,
        displayText: cur.LabelName,
        children: contentData[0].data.filter(({ LabelKey }) => LabelKey > cur.LabelKey && LabelKey < cur.LabelKey + 10),
      },
    ],
    [],
  );
  const orderedParents = [...parents].sort();
  const serieArea = orderedParents.map(
    ({ children }) => children.filter(({ Impact }) => Impact === 'Total')[0]['TotIndustryPerYear1'],
  );
  const serieBM = orderedParents.map(
    ({ children }) => children.filter(({ Impact }) => Impact === 'Total')[0]['TotBMIndustryPerYear1'],
  );

  const chartType = 'bar';
  const chartTitle = `Value of tourism and hospitality ${currentStartYear}`;
  const chartSubtitle = ``;
  const xAxisTitle = 'Tourism measure';
  const yAxisTitle = `% of total industry`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2020 Compiled and presented in economy.id by .id the population experts';
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
          name: `${currentAreaName}`,
          data: serieArea,
        },
        {
          name: `${currentBenchmarkName}`,
          data: serieBM,
        },
      ],
      xAxis: {
        categories: orderedParents.map(({ displayText }) => displayText),
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

// #region chart builders
const chart2Builder = () => {
  const {
    contentData,
    entityData: { currentAreaName, currentStartYear, currentBenchmarkName },
  } = useContext(PageContext);
  const distinctYears = [...new Set(contentData[1].data.map(({ NoYear1 }) => NoYear1))];
  const serieOutputDirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 31)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);
  const serieOutputIndirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 32)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);
  const serieValueAddedDirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 41)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);
  const serieValueAddedIndirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 42)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);

  const chartType = 'column';
  const chartTitle = `Value of tourism and hospitality`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Year (ending June)';
  const yAxisTitle = `Value ($ millions)`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2020 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'chart2';
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
          }: ${formatMillionsCurrencyNoRounding(this.y)} million`;
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },

      series: [
        {
          name: 'Output/Sales - Direct',
          data: serieOutputDirect,
          stack: 'output',
        },
        {
          name: 'Value added - Direct',
          data: serieValueAddedDirect,
          stack: 'value',
        },
        {
          name: 'Output/Sales - Indirect',
          data: serieOutputIndirect,
          stack: 'output',
        },
        {
          name: 'Value added - Indirect',
          data: serieValueAddedIndirect,
          stack: 'value',
        },
      ],
      xAxis: {
        categories: distinctYears,
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
              return `${this.value}`;
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

// #region chart builders
const chart3Builder = () => {
  const {
    contentData,
    entityData: { currentAreaName, currentStartYear, currentBenchmarkName },
  } = useContext(PageContext);
  const distinctYears = [...new Set(contentData[1].data.map(({ NoYear1 }) => NoYear1))];
  const serieOutputDirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 11)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);
  const serieOutputIndirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 12)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);
  const serieValueAddedDirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 21)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);
  const serieValueAddedIndirect = contentData[1].data
    .filter(({ LabelKey }) => LabelKey === 22)
    .map(({ TotIndustryPerYear1 }) => TotIndustryPerYear1);

  const chartType = 'column';
  const chartTitle = `Tourism and hospitality employment`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Year (ending June)';
  const yAxisTitle = `Number of people`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2020 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'chart3';
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
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatNumber(
            this.y,
          )} people`;
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },

      series: [
        {
          name: 'Employment (FTE) - Direct',
          data: serieValueAddedIndirect,
          stack: 'value',
        },
        {
          name: 'Employment (FTE) - Indirect',
          data: serieValueAddedDirect,
          stack: 'value',
        },
        {
          name: 'Employment (Total) - Indirect',
          data: serieOutputIndirect,
          stack: 'Total',
        },
        {
          name: 'Employment (Total) - Direct',
          data: serieOutputDirect,
          stack: 'Total',
        },
      ],
      xAxis: {
        categories: distinctYears,
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
              return `${this.value}`;
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
