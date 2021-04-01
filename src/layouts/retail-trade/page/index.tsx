// #region imports
import { formatNumber, formatPercent, idlogo, formatChangePercent } from '../../../utils/';
import { ItemWrapper, PageIntroFullWidth } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import * as Highcharts from 'highcharts';
// #endregion

// #region population page
const RetailTradePage = () => {
  const {
    entityData: { currentBenchmarkName },
  } = useContext(PageContext);
  return (
    <>
      <PageIntroFullWidth>
        <div>
          <p>
            Retail Trade turnover is an important indicator of economic health. Increasing retail turnover can indicate
            a high level of consumer confidence and increased money in the economy. Retail Trade is not available at the
            local level, so the data presented here is annual percentage change for the state of {currentBenchmarkName},
            updated monthly.
          </p>
        </div>
      </PageIntroFullWidth>
      <ControlPanel />
      <ItemWrapper>
        <EntityChart data={lineChartBuilder()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
    </>
  );
};

export default RetailTradePage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Australian Bureau of Statistics. {LinkBuilder(`http://www.abs.gov.au/AusStats/ABS@.nsf/MF/8501.0`, `Retail Trade`)},
    Australia, catalogue number 8501.0. Compiled and presented in economy.id by .id, <IdLink />.
  </p>
);

// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const anchorName = 'indicators---retail-trade';
  const tableTitle = `Retail trade`;
  const GCCSA = `${data[0].GeoName}`;
  const rows = data.map(({ LabelName, Yr, Number, Change, BMNumber, BMChange }) => {
    return {
      alreadyExpanded: true,
      id: Yr,
      data: [LabelName, Number, Change, BMNumber, BMChange],
      formattedData: [
        `${LabelName}`,
        `${formatPercent(Number)}`,
        `${formatChangePercent(Change, '--')}`,
        `${formatNumber(BMNumber)}`,
        `${formatChangePercent(BMChange, '--')}`,
      ],
    };
  });

  return {
    cssClass: '',
    allowSort: false,
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
            displayText: ` `,
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: `${GCCSA}`,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: `Australia`,
            colSpan: 2,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Month',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        displayText: 'Turnover ($m)',
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        displayText: '% change from corresponding month of previous year',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        displayText: `Turnover ($m)`,
        cssClass: 'odd int XXL',
      },
      {
        id: 4,
        displayText: '% change from corresponding month of previous year',
        cssClass: 'odd int XXL',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart
const lineChartBuilder = () => {
  const { contentData: data } = useContext(PageContext);
  const distinctYears = [...new Set(data.map(({ Yr }) => Yr))];
  const tickPos = distinctYears.map((year: number) => Date.UTC(year, 6, 1));
  const plotBands = distinctYears.map((year: number, i) => {
    return i % 2 === 0
      ? {
          from: Date.UTC(year, 0, 1),
          to: Date.UTC(year, 12, 1),
        }
      : {};
  });
  const parents: any = distinctYears.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        yr: cur,
        children: data.filter(({ Yr }) => Yr === cur),
      },
    ],
    [],
  );
  const chartTitle = 'Retail trade - Trend estimate';
  const xAxisTitle = 'Year';
  const yAxisTitle = '% change from corresponding month of the previous year';
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Labour force survey, catalogue number 6202.0, and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by .id informed decisions.';
  const chartContainerID = 'quarterly-unemployment-rate';

  const makeSerie = (arr, key) =>
    arr.reduce((acc, cur) => {
      return [
        ...acc,
        ...cur.children.map(item => {
          const theyear = cur.yr;
          const themonth = item.Month - 1;
          const theDate = Date.UTC(theyear, themonth, 1);
          const dateArr = [theDate, item[key]];
          return dateArr;
        }),
      ];
    }, []);
  const AreaSerie = makeSerie(parents, 'Change');
  const BMSerie = makeSerie(parents, 'BMChange');
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatPercent(
      this.y,
    )}%`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
        styledMode: true,
      },
      title: {
        text: chartTitle,
      },
      series: [
        {
          name: `${data[0].GeoName}`,
          data: AreaSerie,
        },
        {
          name: `Australia`,
          data: BMSerie,
        },
      ],
      xAxis: {
        type: 'datetime',
        tickPositions: tickPos,
        title: {
          text: xAxisTitle,
        },
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%Y', this.value);
          },
        },
        plotBands,
      },
      yAxis: [
        {
          title: {
            text: yAxisTitle,
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
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource,
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion
