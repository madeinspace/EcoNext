// #region imports
import React, { useContext } from 'react';
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { PageIntro, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region page
const TourismVisitorSummaryPage = () => {
  const { isLite } = useContext(ClientContext);
  const {
    filters: { BMID },
    contentData,
    entityData: { currentBenchmarkName, currentAreaName },
  } = useContext(PageContext);

  const chart1Data = chartBuilder();
  const chart2Data = chartBuilderChange();

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
            Please note - the 2016/17 surveys use 2016 Census based SA2s and are not normally available at LGA level.
            .id have combined SA2s to form a best fit to LGA boundaries using a slightly different methodology to
            previous surveys, so users may notice some small differences between numbers here and those in the previous
            version of this table, for the earlier years. This difference is expected to be within the parameters of
            sample size variability.
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
        <EntityTable data={tableVisitorNightsNumbersBuilder()} name={'Visitor nights - Numbers'} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableQuartileRangesBuilder()} name={'Visitor nights - Percentage'} />
      </ItemWrapper>
      {!isLite && <ItemWrapper>{chart1Data && <EntityChart data={chart1Data} />}</ItemWrapper>}
      {!isLite && <ItemWrapper>{chart2Data && <EntityChart data={chart2Data} />}</ItemWrapper>}
    </>
  );
};

export default TourismVisitorSummaryPage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: {LinkBuilder('https://www.tra.gov.au/', 'Tourism Research Australia')}, Unpublished data from the National
    Visitor Survey and International Visitor Survey 2018/19. Note: "--" represents unavailable data or data that has
    been suppressed due to a sample size of 40 or less.
  </p>
);

const ChartSource = () => (
  <p>
    Source: Tourism Research Australia, Unpublished data from the National Visitor Survey and International Visitor
    Survey 2018/19.
  </p>
);
// #endregion

// #region table builders
const tableVisitorNightsNumbersBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentBenchmarkName },
  } = useContext(PageContext);
  const rawDataSource = `Source: Derived from the Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016. Compiled and presented in profile.id by .id , the population experts.`;
  const tableTitle = `Visitor nights - Numbers`;
  const firstColTitle = `Year`;

  const parentRows = contentData[0].data.map(row => ({
    id: row.LabelKey,
    data: [
      row.FinYearName,
      row['International Visitor Nights'],
      row['Domestic Visitor Nights'],
      row['Domestic Daytrips'],
      row['International Visitor NightsBM'],
      row['Domestic Visitor NightsBM'],
      row['Domestic DaytripsBM'],
    ],
    formattedData: [
      `${row.FinYearName}`,
      formatNumber(row['International Visitor Nights']),
      formatNumber(row['Domestic Visitor Nights']),
      formatNumber(row['Domestic Daytrips']),
      formatNumber(row['International Visitor NightsBM']),
      formatNumber(row['Domestic Visitor NightsBM']),
      formatNumber(row['Domestic DaytripsBM']),
    ],
  }));

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    allowSort: false,
    allowSortReset: false,
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
            displayText: `${currentAreaName} -  2010/11 to 2018/19`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentAreaName} `,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `${currentBenchmarkName}`,
            colSpan: 3,
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
        displayText: 'International Visitor Nights',
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        displayText: 'Domestic Visitor Nights',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        displayText: `Domestic Daytrips`,
        cssClass: 'even int XXL',
      },
      {
        id: 4,
        displayText: 'International Visitor Nights',
        cssClass: 'odd int XXL',
      },
      {
        id: 5,
        displayText: 'Domestic Visitor Nights',
        cssClass: 'odd int XXL',
      },
      {
        id: 6,
        displayText: `Domestic Daytrips`,
        cssClass: 'odd int XXL',
      },
    ],
    rows: parentRows,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region table builders
const tableQuartileRangesBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentBenchmarkName },
  } = useContext(PageContext);
  const rawDataSource = `Source: Derived from the Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016. Compiled and presented in profile.id by .id , the population experts.`;
  const tableTitle = `Visitor nights - Percentage`;
  const firstColTitle = `Year`;

  const parentRows = contentData[1].data.map(row => ({
    id: row.LabelKey,
    data: [
      row.FinYearName,
      row['International Visitor Nights'],
      row['Domestic Visitor Nights'],
      row['Domestic Daytrips'],
      row['International Visitor NightsBM'],
      row['Domestic Visitor NightsBM'],
      row['Domestic DaytripsBM'],
    ],
    formattedData: [
      `${row.FinYearName}`,
      formatPercent(row['International Visitor Nights'], '--'),
      formatPercent(row['Domestic Visitor Nights'], '--'),
      formatPercent(row['Domestic Daytrips'], '--'),
      formatPercent(row['International Visitor NightsBM'], '--'),
      formatPercent(row['Domestic Visitor NightsBM'], '--'),
      formatPercent(row['Domestic DaytripsBM'], '--'),
    ],
  }));

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    allowSort: false,
    allowSortReset: false,
    rawDataSource,
    anchorName: 'tourism-visitor-summary',
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
            displayText: `${currentAreaName} -  2010/11 to 2018/19`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentAreaName} `,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `${currentBenchmarkName}`,
            colSpan: 3,
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
        displayText: '	International Visitor Nights(%)',
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        displayText: 'Domestic Visitor Nights(%)',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        displayText: `Domestic Daytrips(%)`,
        cssClass: 'even int XXL',
      },
      {
        id: 4,
        displayText: 'International Visitor Nights(%)',
        cssClass: 'odd int XXL',
      },
      {
        id: 5,
        displayText: 'Domestic Visitor Nights(%)',
        cssClass: 'odd int XXL',
      },
      {
        id: 6,
        displayText: `Domestic Daytrips(%)`,
        cssClass: 'odd int XXL',
      },
    ],
    rows: parentRows,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    filters: { BMID },
    contentData,
    entityData: { currentBenchmarkName, currentAreaName },
  } = useContext(PageContext);
  const data = contentData[1].data.filter(({ FinYearName }) => FinYearName === '2018/19')[0];

  let isMoot =
    data['International Visitor Nights'] === null &&
    data['Domestic Visitor Nights'] === null &&
    data['Domestic Daytrips'] === null;

  if (isMoot) return null;

  const categories = +BMID === 50 ? [`${currentAreaName}`] : [`${currentAreaName}`, `${currentBenchmarkName}`];
  const serie1 =
    +BMID === 50
      ? [data['International Visitor Nights']]
      : [data['International Visitor Nights'], data['International Visitor NightsBM']];
  const serie2 =
    +BMID === 50
      ? [data['Domestic Visitor Nights']]
      : [data['Domestic Visitor Nights'], data['Domestic Visitor NightsBM']];
  const serie3 = +BMID === 50 ? [data['Domestic Daytrips']] : [data['Domestic Daytrips'], data['Domestic DaytripsBM']];

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
        text: 'Breakup of visitor nights 2018/19',
      },
      subtitle: {
        text: `${currentAreaName}`,
      },
      series: [
        {
          name: `Domestic Daytrip`,
          legendIndex: 2,
          data: serie3,
        },
        {
          name: `Domestic Visitor Night`,
          legendIndex: 1,
          data: serie2,
        },
        {
          name: `International Visitor Nights`,
          data: serie1,
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
      xAxis: {
        categories,
        title: {
          text: '',
        },
      },
      yAxis: [
        {
          min: 0,
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
    rawDataSource:
      'Source: Tourism Research Australia, Unpublished data from the National Visitor Survey and International Visitor Survey 2018/19.',
    dataSource: <ChartSource />,
    chartContainerID: 'chart1',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region chart builder change
const chartBuilderChange = () => {
  const {
    contentData,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const data = contentData[0].data;
  var reversedData = [...data].reverse();

  let isMoot = true;
  for (const el of data) {
    if (
      el['International Visitor Nights'] != null &&
      el['Domestic Visitor Nights'] != null &&
      el['Domestic Daytrips'] != null
    ) {
      isMoot = false;
      break;
    }
  }

  if (isMoot) return null;

  const domesticDayTripData = reversedData.map(item => item['Domestic Daytrips']);
  const domesticVisitorNightData = reversedData.map(item => item['Domestic Visitor Nights']);
  const internationalVisitorNightData = reversedData.map(item => item['International Visitor Nights']);
  const categories = reversedData.map(({ FinYearName }) => FinYearName);
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
        text: 'Breakup of visitor nights 2018/19',
      },
      subtitle: {
        text: `${currentAreaName}`,
      },
      series: [
        {
          name: `Domestic Daytrips`,
          legendIndex: 2,
          data: domesticDayTripData,
        },
        {
          name: `Domestic Visitor Nights`,
          legendIndex: 1,
          data: domesticVisitorNightData,
        },
        {
          name: `International Visitor Nights`,
          data: internationalVisitorNightData,
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
      xAxis: {
        categories,
        title: {
          text: 'Year',
        },
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: 'Visitors',
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
    rawDataSource:
      'Source: Tourism Research Australia, Unpublished data from the National Visitor Survey and International Visitor Survey 2018/19.',
    dataSource: <ChartSource />,
    chartContainerID: 'chart2',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};

// #endregion
