// #region imports
import _ from 'lodash';
import React from 'react';
import { formatNumber, idlogo, formatOneDecimal, formatPercent } from '../../../utils';
import { ItemWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: {LinkBuilder('https://www.tra.gov.au/', 'Tourism Research Australia')} , Unpublished data from the
    International Visitor Survey 2018/19. Note: "--" represents unavailable data or data that has been suppressed due to
    a sample size of 40 or less. A 5 year aggregate is used here to minimize the figures which need to be suppressed,
    but sample sizes may still be too small for some categories.
  </p>
);
const ChartSource = () => (
  <p>
    Source: {LinkBuilder('https://www.tra.gov.au/', 'Tourism Research Australia')}, Unpublished data from the
    International Visitor Survey 2018/19.
  </p>
);
// #endregion

// #region population page
const TourismVisitorsReasonPage = (): JSX.Element => {
  const {
    filters: { Tourismtype },
  } = useContext(PageContext);
  const chart1Data = chartBuilder();
  return (
    <>
      <PageIntro>
        <div>
          <p>
            Tourism is an important part of the economy. Tourism Research Australia (TRA) run annual visitor surveys to
            measure the size and composition of the tourism market in each area, and this data is presented here.
            Tourism may include overseas visitors in the country for a holiday, business or education, Australian
            visitors staying overnight, or local day trippers visiting the area. These different types of tourists will
            utilize different services within the economy, so understanding the different tourism markets is important
            for Local Government and businesses.
          </p>
          <p>
            <strong>NB:</strong> In February 2018, concerns were identified with the quality of the main purpose of
            visit component of the passenger data supplied to TRA by the Department of Home Affairs. This has resulted
            in the International Visitor Survey results from the March quarter onwards not including any data relating
            to the purpose of visit. As such, the data is starting to skew towards "other reason". TRA have said they
            are working to resolve these issues and may re-supply data. Read more from the TRA here.
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
        <EntityTable data={+Tourismtype === 3 ? tableBuilderAlt() : tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>

      <ItemWrapper>{chart1Data && <EntityChart data={chart1Data} />}</ItemWrapper>
    </>
  );
};
// #endregion

export default TourismVisitorsReasonPage;

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { currentBenchmarkName, currentAreaName, currentTourismtype },
    contentData,
  } = useContext(PageContext);
  const tableTitle = `${currentTourismtype} - 5 year total`;
  const anchorName = 'tourism-visitor-summary';
  console.log('contentData: ', contentData);

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    anchorName,
    allowSort: false,
    allowSortReset: false,
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
            displayText: `${currentAreaName} - 2014/15 to 2018/19`,
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: `${currentAreaName}`,
            colSpan: 4,
          },
          {
            cssClass: 'odd ',
            displayText: `${currentBenchmarkName}`,
            colSpan: 4,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Main reason for trip',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: 'Visitors',
        cssClass: 'even int XL',
      },
      {
        id: 2,
        displayText: 'Visitor nights',
        cssClass: 'even int XL',
      },
      {
        id: 3,
        displayText: '%',
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: 'Average length of stay (days)',
        cssClass: 'even int',
      },
      {
        id: 5,
        displayText: 'Visitors',
        cssClass: 'odd int XL',
      },
      {
        id: 6,
        displayText: 'Visitor nights',
        cssClass: 'odd int XL',
      },
      {
        id: 7,
        displayText: '%',
        cssClass: 'odd int',
      },
      {
        id: 8,
        displayText: 'Average length of stay (days)',
        cssClass: 'odd int XS',
      },
    ],
    footRows: contentData
      .filter(({ LabelKey }) => LabelKey === 9999)
      .map(row => {
        return {
          cssClass: 'total',
          cols: [
            { cssClass: '', displayText: `Total`, colSpan: 1 },
            { cssClass: '', displayText: formatNumber(row.Visitors), colSpan: 1 },
            { cssClass: '', displayText: formatNumber(row.VisitorNights), colSpan: 1 },
            { cssClass: '', displayText: formatOneDecimal(row.Per, '--'), colSpan: 1 },
            { cssClass: '', displayText: formatOneDecimal(row.AvgStay, '--'), colSpan: 1 },
            { cssClass: '', displayText: formatNumber(row.VisitorsBM), colSpan: 1 },
            { cssClass: '', displayText: formatNumber(row.VisitorNightsBM), colSpan: 1 },
            { cssClass: '', displayText: formatOneDecimal(row.PerBM, '--'), colSpan: 1 },
            { cssClass: '', displayText: formatOneDecimal(row.AvgStayBM, '--'), colSpan: 1 },
          ],
        };
      }),
    rows: contentData
      .filter(({ LabelKey }) => LabelKey != 9999)
      .map(
        (
          { ReasonName, Visitors, VisitorNights, Per, AvgStay, VisitorsBM, VisitorNightsBM, PerBM, AvgStayBM },
          i: number,
        ) => ({
          data: [ReasonName, Visitors, VisitorNights, Per, AvgStay, VisitorsBM, VisitorNightsBM, PerBM, AvgStayBM],
          formattedData: [
            ReasonName,
            formatNumber(Visitors),
            formatNumber(VisitorNights),
            formatOneDecimal(Per, '--'),
            formatOneDecimal(AvgStay, '--'),
            formatNumber(VisitorsBM),
            formatNumber(VisitorNightsBM),
            formatOneDecimal(PerBM, '--'),
            formatOneDecimal(AvgStayBM, '--'),
          ],
          id: i,
        }),
      ),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region tableBuilder
const tableBuilderAlt = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { currentBenchmarkName, currentAreaName, currentTourismtype },
    contentData,
  } = useContext(PageContext);
  const tableTitle = `${currentTourismtype} - 5 year total`;
  const anchorName = 'indicators---estimate-resident-population';
  console.log('contentData: ', contentData);

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    anchorName,
    allowSort: false,
    allowSortReset: false,
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
            displayText: `${currentAreaName} - 2014/15 to 2018/19`,
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: `${currentAreaName}`,
            colSpan: 2,
          },
          {
            cssClass: 'odd ',
            displayText: `${currentBenchmarkName}`,
            colSpan: 2,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Main reason for trip',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: 'Visitors',
        cssClass: 'even int XXXL',
      },
      {
        id: 3,
        displayText: '%',
        cssClass: 'even int',
      },
      {
        id: 5,
        displayText: 'Visitors',
        cssClass: 'odd int XXXL',
      },
      {
        id: 7,
        displayText: '%',
        cssClass: 'odd int',
      },
    ],
    footRows: contentData
      .filter(({ LabelKey }) => LabelKey === 9999)
      .map(row => {
        return {
          cssClass: 'total',
          cols: [
            { cssClass: '', displayText: `Total`, colSpan: 1 },
            { cssClass: '', displayText: formatNumber(row.Visitors), colSpan: 1 },
            { cssClass: '', displayText: formatOneDecimal(row.Per, '--'), colSpan: 1 },
            { cssClass: '', displayText: formatNumber(row.VisitorsBM), colSpan: 1 },
            { cssClass: '', displayText: formatOneDecimal(row.PerBM), colSpan: 1 },
          ],
        };
      }),
    rows: contentData
      .filter(({ LabelKey }) => LabelKey != 9999)
      .map(({ ReasonName, Visitors, Per, VisitorsBM, PerBM, VisitorsPer }, i: number) => ({
        data: [ReasonName, Visitors, Per, VisitorsBM, PerBM, VisitorsPer],
        formattedData: [
          ReasonName,
          formatNumber(Visitors),
          formatPercent(Per, '--'),
          formatNumber(VisitorsBM),
          formatPercent(PerBM),
        ],
        id: i,
      })),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chartbuilder
const chartBuilder = () => {
  const {
    filters: { BMID },
    contentData,
    entityData: { currentTourismtype, currentBenchmarkName, currentAreaName },
  } = useContext(PageContext);
  const data = contentData.filter(({ LabelKey }) => LabelKey === 1001)[0];
  let isMoot = false;
  for (const el of contentData) {
    if (el['Visitors'] === null || el['Per'] === null || el['VisitorNights'] === null) {
      isMoot = true;
      break;
    }
  }

  if (isMoot) return null;
  const chartType = 'bar';
  const chartTitle = `${currentTourismtype} - 5 year total`;
  const rawDataSource =
    'Source: Tourism Research Australia, Unpublished data from the International Visitor Survey 2018/19.';
  const xAxisTitle = 'Financial year';
  const yAxisTitle = 'Visitors';
  const chartContainerID = 'chart1';
  const without = [...contentData].reverse().filter(({ LabelKey }) => LabelKey != 9999);
  const categories = [`${currentAreaName}`, `${currentBenchmarkName}`];
  const serie = without.reduce((acc, { ReasonName, Per, PerBM }, i) => {
    return [
      ...acc,
      { legendIndex: without.length - i, name: ReasonName, data: categories.length > 1 ? [Per, PerBM] : [Per] },
    ];
  }, []);
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, - ${
      this.series.name
    }: ${formatPercent(this.y)}%`;
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
        text: contentData[0].Geoname,
      },
      series: serie,
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
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
              return `${formatNumber(this.value)}`;
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
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion
