// #region imports
import _ from 'lodash';
import {
  formatShortDecimal,
  formatNumber,
  formatChangeNumber,
  formatChangePercent,
  formatPercent,
  formatChangeOneDecimal,
  formatChangeInt,
  idlogo,
  formatLongNumber,
} from '../../../utils';
import { ItemWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import { IdLink, NierLink, LinkBuilder } from '../../../components/ui/links';
import RelatedPagesCTA from '../../../components/RelatedPages';
// #endregion

// #region population page
const IncomeSourcesPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName, currentBenchmarkName },
  } = useContext(PageContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Household disposable income is a measure of the amount of income available to an average household in the
            area. It varies depending on the jobs held by the residents, amount of property and business income, and
            cash benefits provided by government, which are related to the socio-economic status of the area. Areas with
            high unemployment, large numbers of retirees and others out of the workforce may have a high cash benefits
            component.
          </p>
          <p>
            This information gives an insight into both the sources of income and how much your residents have available
            to spend in the area. This dataset should be viewed in conjunction with{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/worker-productivity-by-industry`,
              `Worker productivity`,
            )}
            , {LinkBuilder(`https://economy.id.com.au/${clientAlias}/workers-income`, `Local workers income`)} data, and{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/gross-regional-product`, `Gross Regional Product`)}{' '}
            data on the size of the residential economy.
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

      <RelatedPagesCTA />
    </>
  );
};

// #endregion

export default IncomeSourcesPage;

// #region Source
const Source = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />
      .Data are based on a 2016-17 price base for all years. NIEIR-ID data are inflation adjusted each year to allow
      direct comparison, and annual data releases adjust previous years’ figures to a new base year.
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
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentBenchmarkName, currentComparisonYear, currentStartYear },
  } = useContext(PageContext);

  const rows = contentData[0].data.map(({ LabelKey, LabelName, NoYear1, BMYear1, NoYear2, BMYear2, Change12 }, i) => {
    const row = {
      cssClass: LabelKey === 7 || LabelKey === 11 ? 'plain' : '',
      data: [LabelName, NoYear1, BMYear1, NoYear2, BMYear2, Change12],
      formattedData: [
        LabelName,
        formatLongNumber(NoYear1),
        formatLongNumber(BMYear1),
        formatLongNumber(NoYear2),
        formatLongNumber(BMYear2),
        formatChangeInt(Change12),
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
    clientAlias,
    source: <Source />,
    anchorName: 'sources-of-income',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Sources of income per household',
            colSpan: 10,
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
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparisonYear}`,
            colSpan: 2,
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
        sortable: false,
        displayText: 'Economic measure',
        cssClass: 'odd first',
      },
      {
        id: 1,
        sortable: false,
        displayText: `$`,
        cssClass: 'even ',
      },
      {
        id: 2,
        sortable: false,
        displayText: `${currentBenchmarkName}$`,
        cssClass: 'even ',
      },

      {
        id: 3,
        sortable: false,
        displayText: `$ `,
        cssClass: 'odd',
      },
      {
        id: 4,
        sortable: false,
        displayText: `${currentBenchmarkName}$`,
        cssClass: 'odd ',
      },

      {
        id: 5,
        sortable: false,
        displayText: `${currentComparisonYear} to ${currentStartYear}`,
        cssClass: 'even S',
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
    entityData: { currentBenchmarkName, currentAreaName },
  } = useContext(PageContext);
  const areaSerie = _.take(contentData[1].data, 5);
  const BMSerie = _.takeRight(contentData[1].data, 5);
  const series = areaSerie.map(({ LabelKey, LabelName, PerYear1 }) => {
    const bmPerYear1 = BMSerie.filter((row: any) => row.LabelKey === LabelKey)[0]['PerYear1'];
    const data = [bmPerYear1, PerYear1];
    return { name: LabelName, data };
  });

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, - ${
      this.series.name
    }: ${formatPercent(this.y)}%`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Sources of income per household',
      },
      subtitle: {
        text: `${currentAreaName} `,
      },
      series,
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
      xAxis: {
        categories: [`${currentBenchmarkName}`, `${currentAreaName}`],
        title: {
          text: '',
        },
      },
      yAxis: [
        {
          title: {
            text: 'Percentage',
          },
          tickInterval: 20,
          labels: {
            staggerLines: 0,
            formatter: function() {
              return `${formatNumber(this.value)}%`;
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
