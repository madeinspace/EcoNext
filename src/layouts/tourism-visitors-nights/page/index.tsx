// #region imports
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import EntityTable from '../../../components/table/EntityTable';
import { LinkBuilder } from '../../../components/ui/links';
import { ItemWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import { formatChangeOneDecimal, formatNumber, formatOneDecimal, idlogo } from '../../../utils';
import { ClientContext, PageContext } from '../../../utils/context';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: {LinkBuilder('https://www.tra.gov.au/', 'Tourism Research Australia')} , Unpublished data from the
    International Visitor Survey 2018/19. Note: "--" represents unavailable data or data that has been suppressed due to
    a sample size of 40 or less. Suppressed figures are still used in the 5 year average calculations.
  </p>
);
const ChartSource = () => (
  <p>
    Source: {LinkBuilder('https://www.tra.gov.au/', 'Tourism Research Australia')} , Unpublished data from the
    International Visitor Survey 2018/19.
  </p>
);
// #endregion

// #region population page
const TourismVisitorsNightPage = (): JSX.Element => {
  const {
    filters: { Tourismtype },
  } = useContext(PageContext);
  return (
    <>
      <PageIntro>
        <p>
          Tourism is an important part of the economy. Tourism Research Australia (TRA) run annual visitor surveys to
          measure the size and composition of the tourism market in each area, and this data is presented here. Tourism
          may include overseas visitors in the country for a holiday, business or education, Australian visitors staying
          overnight, or local day trippers visiting the area. These different types of tourists will utilize different
          services within the economy, so understanding the different tourism markets is important for Local Government
          and businesses.
        </p>
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

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>
    </>
  );
};
// #endregion

export default TourismVisitorsNightPage;

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { currentBenchmarkName, currentAreaName, currentTourismtype },
    contentData,
  } = useContext(PageContext);
  const tableTitle = `${currentTourismtype}`;
  const anchorName = 'tourism-visitor-summary';

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
            displayText: `${currentAreaName} - 2010/11 to 2018/19`,
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
          {
            cssClass: 'even sub',
            displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
            colSpan: 2,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: 'Visitors',
        cssClass: 'even int XXXL',
      },
      {
        id: 2,
        displayText: 'Visitor nights',
        cssClass: 'even int XXXL',
      },
      {
        id: 3,
        displayText: '% Change from previous year',
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
        cssClass: 'odd int XXXL',
      },
      {
        id: 6,
        displayText: 'Visitor nights',
        cssClass: 'odd int XXXL',
      },
      {
        id: 7,
        displayText: '% Change from previous year',
        cssClass: 'odd int',
      },
      {
        id: 8,
        displayText: 'Average length of stay (days)',
        cssClass: 'odd int XS',
      },
      {
        id: 9,
        displayText: 'Visitors',
        cssClass: 'even int XS',
      },
      {
        id: 10,
        displayText: 'Visitor nights',
        cssClass: 'even int XS',
      },
    ],
    footRows: [],
    rows: contentData.map(
      (
        {
          FinYearName,
          Visitors,
          VisitorNights,
          Per,
          AvgStay,
          VisitorsBM,
          VisitorNightsBM,
          PerBM,
          AvgStayBM,
          VisitorsPer,
          VisitorNightsPer,
        },
        i: number,
      ) => ({
        cssClass: i === 0 ? 'highlight' : '',
        data: [
          FinYearName,
          Visitors,
          VisitorNights,
          Per,
          AvgStay,
          VisitorsBM,
          VisitorNightsBM,
          PerBM,
          AvgStayBM,
          VisitorsPer,
          VisitorNightsPer,
        ],
        formattedData: [
          FinYearName,
          formatNumber(Visitors),
          formatNumber(VisitorNights),
          formatChangeOneDecimal(Per, '--'),
          formatOneDecimal(AvgStay),
          formatNumber(VisitorsBM),
          formatNumber(VisitorNightsBM),
          formatChangeOneDecimal(PerBM),
          formatOneDecimal(AvgStayBM),
          formatOneDecimal(VisitorsPer),
          formatOneDecimal(VisitorNightsPer),
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
  const tableTitle = `${currentTourismtype}`;
  const anchorName = 'indicators---estimate-resident-population';

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
            displayText: `${currentAreaName} - 2010/11 to 2018/19`,
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
          {
            cssClass: 'even sub',
            displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: 'Visitors',
        cssClass: 'even int XXXL',
      },

      {
        id: 3,
        displayText: '% Change from previous year',
        cssClass: 'even int',
      },

      {
        id: 5,
        displayText: 'Visitors',
        cssClass: 'odd int XXXL',
      },

      {
        id: 7,
        displayText: '% Change from previous year',
        cssClass: 'odd int',
      },

      {
        id: 9,
        displayText: 'Visitors',
        cssClass: 'even int XS',
      },
    ],
    footRows: [],
    rows: contentData.map(({ FinYearName, Visitors, Per, VisitorsBM, PerBM, VisitorsPer }, i: number) => ({
      cssClass: i === 0 ? 'highlight' : '',
      data: [FinYearName, Visitors, Per, VisitorsBM, PerBM, VisitorsPer],
      formattedData: [
        FinYearName,
        formatNumber(Visitors),
        formatChangeOneDecimal(Per, '--'),
        formatNumber(VisitorsBM),
        formatChangeOneDecimal(PerBM),
        formatOneDecimal(VisitorsPer),
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
    contentData,
    entityData: { currentTourismtype },
  } = useContext(PageContext);
  const chartType = 'column';
  const chartTitle = `${currentTourismtype}`;
  const rawDataSource =
    'Source: Tourism Research Australia, Unpublished data from the International Visitor Survey 2018/19.';
  const xAxisTitle = 'Financial year';
  const yAxisTitle = 'Visitors';
  const chartContainerID = 'chart1';
  const without = [...contentData].reverse().filter(({ LabelKey }) => LabelKey != 9999);
  const categories = without.map(({ FinYearName }) => FinYearName);
  const serie = without.map(({ Visitors }) => Visitors);
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
      series: [
        {
          color: '',
          yAxis: 0,
          name: contentData[0].Geoname,
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
              return `${formatNumber(this.value)}`;
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion
