// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeOneDecimal } from '../../../utils';
import { ItemWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import { IdLink, NierLink, LinkBuilder } from '../../../components/ui/links';
// #endregion

// #region population page
const IndustrySectorAnalysisSeriesPage = () => {
  const { clientAlias } = useContext(ClientContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The annual industry sector analysis reveals the growth and decline of an industry from 2000/01 to the
            present.
          </p>
          <p>
            These charts show the year-on-year change in the different measures of an industry size, based on the 87
            industry subsectors and 19 main industry divisions in the ANZSIC classification. An industry may be growing
            in the local area, but at a rate no different to that of the state or region. For this reason, measures are
            also included that compare the growth or decline of the industry with the equivalent in the benchmark area,
            based on a standard index base year of 2000/01. Another chart also looks at the change in an industry as a
            percentage of the benchmark.
          </p>
          <p>
            For instance, an industry may double in size from $100m to $200m in total output. But if the state’s output
            went up by the same amount, the percentage of state would be unchanged. On the other hand, if the state’s
            output is declining but local output is unchanged, the percentage of state would increase. In this way
            change over time can be benchmarked.
          </p>
          <p>
            Different measures may also grow and change in different ways. For instance, during the GFC, some industries
            retained staff but they worked less hours, resulting in a loss of FTE jobs but no loss of total employment.
            And an industry may have increasing exports without having an increase in total output.
          </p>
          <p>
            Industry sector time-series analysis should be viewed in conjunction with Local workers data from the 2011
            and 2006 Census to see how the characteristics of the{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/workers-key-statistics`, 'local workers')} are
            changing in a growing or declining industry.
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
        <EntityTable data={tableBuilder()} name={useEntityText('Subtitle')} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilderPer()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilderPerBM()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilderIndex()} />
      </ItemWrapper>
    </>
  );
};

export default IndustrySectorAnalysisSeriesPage;
// #endregion

// #region Source
const Source = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. NIEIR-ID data are adjusted each
      year, using updated employment estimates. Each release may change previous years’ figures.{' '}
      {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};
const ChartSource = () => (
  <p>
    Source: <NierLink /> Compiled and presented in economy.id by <IdLink />.
  </p>
);
// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData,
    filters: { Measure },
    entityData: { currentAreaName, currentBenchmarkName, currentMeasure, currentIndustryName },
  } = useContext(PageContext);
  console.log('contentData: ', contentData);
  const format = num => (+Measure === 100001 || +Measure === 10001 ? formatNumber(num) : formatPercent(num));
  const rows = contentData
    .filter(item => item.LabelKey != 999999)
    .map(({ LabelKey, FinYear, NUmber, Change, BMNumber, BMChange, CperBM, CIndex, BMIndex }, i) => {
      const row = {
        data: [FinYear, NUmber, Change, BMNumber, BMChange, CperBM, CIndex, BMIndex],
        formattedData: [
          FinYear,
          format(NUmber),
          `${formatChangeOneDecimal(Change, '--')}${Change === null ? '' : '%'}`,
          formatNumber(BMNumber),
          `${formatChangeOneDecimal(BMChange, '--')} ${BMChange === null ? '' : '%'}`,
          formatPercent(CperBM),
          formatPercent(CIndex),
          formatPercent(BMIndex, '--'),
        ],
        id: LabelKey,
      };
      return row;
    });

  return {
    cssClass: '',
    allowSort: false,
    allowSortReset: false,
    groupOn: '',
    ClientAlias: clientAlias,
    source: <Source />,
    anchorName: 'industry-sector-analysis',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: `Time series - ${currentMeasure}`,
            colSpan: 8,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentIndustryName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${LongName}`,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: `${currentBenchmarkName}`,
            colSpan: 2,
          },
          {
            cssClass: 'even',
            displayText: `Analysis`,
            colSpan: 3,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        sortable: false,
        displayText: 'Year',
        cssClass: 'odd first',
      },
      {
        id: 1,
        sortable: false,
        displayText: `${currentMeasure}`,
        cssClass: 'even ',
      },
      {
        id: 2,
        sortable: false,
        displayText: `Change from previous year`,
        cssClass: 'even ',
      },
      {
        id: 3,
        sortable: false,
        displayText: `${currentMeasure}`,
        cssClass: 'odd  ',
      },
      {
        id: 4,
        sortable: false,
        displayText: `Change from previous year`,
        cssClass: 'odd',
      },
      {
        id: 5,
        sortable: false,
        displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
        cssClass: 'even ',
      },
      {
        id: 6,
        sortable: false,
        displayText: `Index ${LongName}`,
        cssClass: 'even ',
      },
      {
        id: 7,
        sortable: false,
        displayText: `Index ${currentBenchmarkName}`,
        cssClass: 'even ',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = () => {
  const {
    contentData,
    entityData: { currentIndustryName, currentAreaName, currentMeasure },
  } = useContext(PageContext);
  const data = [...contentData].reverse();
  const categories = data.map(({ SeriesYear }) => SeriesYear);
  const serie = data.map(({ NUmber }) => NUmber);

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, - ${
      this.series.name
    }: ${formatNumber(this.y)}`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
      },
      title: {
        text: `Time series - ${currentMeasure}`,
      },
      subtitle: {
        text: `${currentAreaName} - ${currentIndustryName}`,
      },
      series: [
        {
          data: serie,
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Year',
        },
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: `${currentMeasure}`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'chart1',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region  chartbuilderPer
const chartBuilderPer = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName, currentMeasure },
  } = useContext(PageContext);
  const data = [...contentData].reverse();
  const categories = data.map(({ SeriesYear }) => SeriesYear);
  const serie = data.map(({ Change }) => Change);
  const serieBM = data.map(({ BMChange }) => BMChange);

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, - ${
      this.series.name
    }: ${formatPercent(this.y)}%`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
      },
      title: {
        text: `Time series - ${currentMeasure} annual change`,
      },
      subtitle: {
        text: `${currentIndustryName}`,
      },
      series: [
        {
          name: `${LongName}`,
          data: serie,
        },
        {
          name: `${currentBenchmarkName}`,
          data: serieBM,
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Year',
        },
      },
      yAxis: [
        {
          title: {
            text: `% change from previous year`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'chartPer',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region  chartbuilder
const chartBuilderPerBM = () => {
  const { LongName } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName, currentMeasure },
  } = useContext(PageContext);
  const data = [...contentData].reverse();
  const categories = data.map(({ SeriesYear }) => SeriesYear);
  const serie = data.map(({ CperBM }) => CperBM);

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, - ${
      this.series.name
    }: ${formatPercent(this.y)}%`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
      },
      title: {
        text: `Time series - ${currentMeasure} as percentage of benchmark`,
      },
      subtitle: {
        text: `${currentIndustryName}`,
      },
      series: [
        {
          name: `${LongName} as a % of ${currentBenchmarkName}`,
          data: serie,
        },
      ],
      legend: {
        enabled: true,
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Year',
        },
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: `% of ${currentBenchmarkName}`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return this.value;
            },
          },
        },
      ],
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'chartPerBM',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region  chartbuilderPer
const chartBuilderIndex = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName, currentMeasure },
  } = useContext(PageContext);
  const data = [...contentData].reverse();
  const categories = data.map(({ SeriesYear }) => SeriesYear);
  const serie = data.map(({ CIndex }) => CIndex);
  const serieBM = data.map(({ BMIndex }) => BMIndex);

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, - ${
      this.series.name
    }: ${formatPercent(this.y)}`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
      },
      title: {
        text: `Index of ${currentMeasure}`,
      },
      subtitle: {
        text: `${currentIndustryName}`,
      },
      series: [
        {
          name: `Index - ${LongName}`,
          data: serie,
        },
        {
          name: `Index - ${currentBenchmarkName}`,
          data: serieBM,
        },
      ],
      xAxis: {
        categories: categories,
        title: {
          text: 'Year',
        },
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: `% change from previous year`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return this.value;
            },
          },
        },
      ],
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'chartIndex',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion
