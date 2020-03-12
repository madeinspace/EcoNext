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
const UnemploymentPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const hasProfile = () => clientProducts.some(product => product.AppID === 1);

  return (
    <>
      <PageIntroFullWidth>
        <div>
          <p>
            The unemployment rate is derived from the ABS labour force survey and Centrelink data and compiled by the
            Department of Employment. It is published quarterly in the Small Area Labour Markets publication, for Local
            Government Areas. The unemployment rate shown here is the proportion of the resident labour force (those in
            work or looking for work and aged over 15) who are looking for work. Unemployment does not include people
            who don’t have a job but are not seeking a job.
          </p>
          <p>
            Unemployment is an important indicator of the economic success of an area. A low unemployment rate can
            indicate an affluent area with a high rate of access to jobs, or a place where those who can’t find jobs
            leave the area. A high rate can indicate a declining economy with closures of key industries, or a
            residential area with a significantly disadvantaged population.
          </p>
          <p>
            Note: The Department of Employment advise that{' '}
            <strong>
              highly disaggregated labour force and unemployment estimates at the LGA level can display significant
              variability and should be viewed with caution.
            </strong>{' '}
            The figures are smoothed using a four-quarter (annual) average to minimise the variability inherent in small
            area estimates.
          </p>
          <p>
            This page presents unemployment estimates for benchmark regions which are headline figures widely published
            by government and media sites but are not directly comparable to the LGA estimates as they are not annual
            averages. For more information, see the data notes.
          </p>
        </div>
      </PageIntroFullWidth>
      <ControlPanel />
      <ItemWrapper>
        <EntityChart data={lineChartBuilder()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(
            `https://profile.id.com.au/${clientAlias}/employment-status`,
            `Residents employment status by small area`,
          )}
        </CrossLink>
      )}
    </>
  );
};

export default UnemploymentPage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: Australian Bureau of Statistics,{' '}
    {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/6202.0`, `Labour force survey`)} catalogue number 6202.0,
    and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by{' '}
    <IdLink />.
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
  const anchorName = 'indicators---unemployment';
  const tableTitle = `Unemployment`;
  const distinctYears = [...new Set(data.map(({ Year }) => Year))];
  const parents: any = distinctYears.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        year: cur,
        children: data.filter(({ Year }) => Year === cur),
      },
    ],
    [],
  );
  const STE = data[0].GeonameSTE;
  const GCCSA = data[0].GeonameGCCSA;
  const rows = parents.reverse().map(({ year, children }) => {
    return {
      alreadyExpanded: true,
      expandable: children.length > 0,
      cssClass: 'plain',
      id: year,
      data: [year, '', '', '', '', '', ''],
      formattedData: [`${year}`, ' ', ' ', ' ', ' ', ' ', ' '],
      childRows: children
        .reverse()
        .map(
          ({
            Sort,
            LabelMonth,
            NumberUnemp,
            NumberLBF,
            NumberUnempRate,
            NumberUnempRateGCC,
            NumberUnempRateSTE,
            NumberUnempRateAUS,
          }) => ({
            id: Sort,
            data: [
              LabelMonth,
              NumberUnemp,
              NumberUnempRate,
              NumberUnempRateGCC,
              NumberUnempRateSTE,
              NumberUnempRateAUS,
            ],
            formattedData: [
              `${LabelMonth}`,
              formatNumber(NumberUnemp),
              formatNumber(NumberLBF),
              `${formatPercent(NumberUnempRate)}`,
              formatPercent(NumberUnempRateGCC),
              formatPercent(NumberUnempRateSTE),
              formatPercent(NumberUnempRateAUS),
            ],
          }),
        ),
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
            displayText: `${currentAreaName}`,
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: `${GCCSA}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${STE}`,
            colSpan: 1,
          },
          {
            cssClass: 'odd',
            displayText: 'Australia',
            colSpan: 1,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Quarter',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        displayText: 'Unemployed people',
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        displayText: 'Labour force',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        displayText: `Unemployment rate %`,
        cssClass: 'even int XXL',
      },
      {
        id: 4,
        displayText: 'Unemployment rate %',
        cssClass: 'odd int XXXL',
      },
      {
        id: 5,
        displayText: 'Unemployment rate %',
        cssClass: 'even int XXXL',
      },
      {
        id: 6,
        displayText: `Unemployment rate %`,
        cssClass: 'odd int ',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

const chartBuilder = () => {
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Labour force survey, catalogue number 6202.0, and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'quarterly-unemployment';
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatNumber(
      this.y,
    )} peple`;
  };
  const distinctYears = [...new Set(data.map(({ Year }) => Year))];

  const makeQuarterSerie = q => {
    let values = [];
    distinctYears.forEach(year => {
      const match = data.filter(item => item.Year === year).find(item => item.month === q);
      values.push(match != undefined ? match['NumberUnemp'] : null);
    });
    return values;
  };

  const Q1 = makeQuarterSerie(3);
  const Q2 = makeQuarterSerie(6);
  const Q3 = makeQuarterSerie(9);
  const Q4 = makeQuarterSerie(12);

  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
        styledMode: true,
        events: {
          load: function() {
            const xAxis = this.xAxis[0];
            xAxis.categories.forEach((category, index) => {
              if (index % 2 === 0) {
                xAxis.addPlotBand({
                  from: index - 0.5,
                  to: index + 0.5,
                });
              }
            });
          },
        },
      },
      title: {
        text: 'Quarterly unemployment',
      },
      series: [
        {
          name: 'Q1',
          data: Q1,
        },
        {
          name: 'Q2',
          data: Q2,
        },
        {
          name: 'Q3',
          data: Q3,
        },
        {
          name: 'Q4',
          data: Q4,
        },
      ],
      xAxis: {
        categories: distinctYears,
        title: {
          text: `Year`,
        },
        labels: {
          formatter: function() {
            return this.value;
          },
        },
      },
      yAxis: [
        {
          title: {
            text: `Number of unemployed people`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
      plotOptions: {
        series: {
          groupPadding: 0.08,
        },
      },
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

// #region chart
const lineChartBuilder = () => {
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const distinctYears = [...new Set(data.map(({ Year }) => Year))];
  const tickPos = distinctYears.map((year: number) => Date.UTC(year, 6, 1));
  const plotBands = distinctYears.map((year: number, i) => {
    return i % 2 === 0
      ? {
          from: Date.UTC(year, 0, 1), // Start of the plot band
          to: Date.UTC(year, 12, 1), // End of the plot band
        }
      : {};
  });
  const parents: any = distinctYears.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        year: cur,
        children: data.filter(({ Year }) => Year === cur),
      },
    ],
    [],
  );
  const STE = data[0].GeonameSTE;
  const GCCSA = data[0].GeonameGCCSA;
  const chartTitle = 'Quarterly unemployment rate';
  const xAxisTitle = 'Year';
  const yAxisTitle = 'Unemployment rate';
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Labour force survey, catalogue number 6202.0, and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'quarterly-unemployment-rate';

  const makeSerie = (arr, key) =>
    arr.reduce((acc, cur) => {
      return [
        ...acc,
        ...cur.children.map(item => {
          const theyear = cur.year;
          const themonth = item.month - 1;
          const theDate = Date.UTC(theyear, themonth, 1);
          const dateArr = [theDate, item[key]];
          return dateArr;
        }),
      ];
    }, []);

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
          name: `${currentAreaName}`,
          data: makeSerie(parents, 'NumberUnempRate'),
        },
        {
          name: `${GCCSA}`,
          data: makeSerie(parents, 'NumberUnempRateGCC'),
        },
        {
          name: `${STE}`,
          data: makeSerie(parents, 'NumberUnempRateSTE'),
        },
        {
          name: `Australia`,
          data: makeSerie(parents, 'NumberUnempRateAUS'),
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
