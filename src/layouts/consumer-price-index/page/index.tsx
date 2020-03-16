// #region imports
import { formatNumber, formatPercent, formatChangeInt, formatShortDecimal, idlogo } from '../../../utils/';
import { ProfileProductIcon, ItemWrapper, PageIntroFullWidth, CrossLink } from '../../../styles/MainContentStyles';
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
const ConsumerPriceIndexPage = () => {
  return (
    <>
      <PageIntroFullWidth>
        <div>
          <p>
            The Consumer Price Index is an indicator of the inflation rate run by the Australian Bureau of Statistics.
            It measures the changing price of a fixed basket of goods and services purchased by the average household in
            8 capital cities around Australia. This is combined into an index number, calculated quarterly, and the
            percentage change for the year to the latest quarter is shown.
          </p>
          <p>
            Data on CPI is a proxy for the rate of inflation in the consumer sector, and does not necessarily translate
            into inflation for goods purchased by industry. However it is an easily accessible measure of the inflation
            rate and can be used to assess the changing value of money over time. CPI is not available for small areas,
            so the nearest capital city rate is shown on economy.id.
          </p>
        </div>
      </PageIntroFullWidth>
      <ItemWrapper>
        <EntityChart data={lineChartBuilder()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
    </>
  );
};

export default ConsumerPriceIndexPage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: Australian Bureau of Statistics.{' '}
    {LinkBuilder(`https://www.abs.gov.au/ausstats/abs@.nsf/mf/6401.0`, `Consumer Price Index`)} , Australia, catalogue
    number 6401.0. Compiled and presented in economy.id by <IdLink />.
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
  const anchorName = 'indicators---consumer-price-index-(cpi)';
  const tableTitle = `Consumer Price Index (CPI)`;
  const GCCSA = `${data[0].GeoName}`;
  const rows = data.map(({ LabelName, Yr, Number, ChangePer, BMNumber, BMChangePer }) => {
    return {
      alreadyExpanded: true,
      id: Yr,
      data: [LabelName, Number, ChangePer, BMNumber, BMChangePer],
      formattedData: [`${LabelName}`, `${Number}`, `${ChangePer}`, `${BMNumber}`, `${BMChangePer}`],
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
        displayText: 'Quarter ending',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        displayText: 'Index number',
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        displayText: '% change from previous year',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        displayText: `Index number`,
        cssClass: 'odd int XXL',
      },
      {
        id: 4,
        displayText: '% change from previous year',
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
  const chartTitle = 'Consumer Price Index (CPI)';
  const xAxisTitle = 'Year';
  const yAxisTitle = '% change from previous year';
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Labour force survey, catalogue number 6202.0, and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'quarterly-unemployment-rate';

  const makeSerie = (arr, key) =>
    arr.reduce((acc, cur) => {
      return [
        ...acc,
        ...cur.children.map(item => {
          const theyear = cur.yr;
          const themonth = item.QTR * 3;
          const theDate = Date.UTC(theyear, themonth, 1);
          const dateArr = [theDate, item[key]];
          return dateArr;
        }),
      ];
    }, []);
  const AreaSerie = makeSerie(parents, 'ChangePer');
  const BMSerie = makeSerie(parents, 'BMChangePer');
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
