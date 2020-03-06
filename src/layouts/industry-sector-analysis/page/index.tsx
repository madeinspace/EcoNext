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
} from '../../../utils';
import { ItemWrapper } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region population page
const TemplatePage = () => {
  const { clientAlias } = useContext(ClientContext);
  const { contentData } = useContext(PageContext);
  const chartData = chartBuilder(contentData);
  const chartLineData = chartLineBuilder(contentData);
  const tableParams = tableBuilder();

  return (
    <>
      <ItemWrapper>
        <ControlPanel />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={useEntityText('Subtitle')} />
      </ItemWrapper>

      {/* <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartLineData} />
      </ItemWrapper> */}
    </>
  );
};

// #endregion

export default TemplatePage;

// #region Source
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" rel="noopener" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: data,
    entityData,
    entityData: {
      currentAreaName,
      prefixedAreaName,
      currentBenchmarkName,
      currentComparisonYear,
      currentStartYear,
      currentIndustryName,
    },
  } = useContext(PageContext);
  console.log('data: ', data);
  console.log('prefixedAreaName: ', prefixedAreaName);
  console.log('currentBenchmarkName: ', currentBenchmarkName);
  console.log('currentComparisonYear: ', currentComparisonYear);
  console.log('currentStartYear: ', currentStartYear);
  console.log('currentIndustryName: ', currentIndustryName);
  const separator = {
    cssClass: 'plain',
    data: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    formattedData: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  };

  const pluckFromRange = (arr, start, end) => arr.filter((item, i) => i >= start && i <= end);

  const measure1 = pluckFromRange(data, 0, 2).map(
    ({ LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12 }, i) => {
      const row = {
        data: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        formattedData: [
          LabelName,
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(NoYear1) : formatNumber(NoYear1),
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(BMYear1) : formatNumber(BMYear1),
          formatPercent(PerYear1) === '0' ? '--' : `${formatPercent(PerYear1)}%`,
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(NoYear2) : formatNumber(NoYear2),
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(BMYear2) : formatNumber(BMYear2),
          formatPercent(PerYear2) === '0' ? '--' : `${formatPercent(PerYear2)}%`,
          LabelName === 'FTE to total employment ratio' ? formatChangeNumber(Change12) : formatChangeInt(Change12),
        ],
        id: i,
      };
      return row;
    },
  );

  const measure2 = pluckFromRange(data, 3, 11).map(
    ({ LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12 }, i) => {
      const row = {
        data: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        formattedData: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        id: i,
      };
      return row;
    },
  );
  const measure3 = [data[12]].map(
    ({ LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12 }, i) => {
      const row = {
        data: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        formattedData: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        id: i,
      };
      return row;
    },
  );
  const rows = [...measure1, separator, ...measure2, separator, ...measure3];

  return {
    cssClass: '',
    allowSort: true,
    groupOn: '',
    ClientAlias: clientAlias,
    source: <Source />,
    anchorName: 'service-age-groups',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Industry sector analysis',
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
            displayText: '{RDA BGLAP Region} - {All industries} - Constant prices',
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `2018/19`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `2017/18`,
            colSpan: 3,
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
        displayText: 'Economic measure',
        dataType: 'int',
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: `${currentAreaName}`,
        dataType: 'int',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: `${currentBenchmarkName}`,
        dataType: 'money',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
        dataType: 'money',
        cssClass: 'even int int ',
      },
      {
        id: 4,
        displayText: `${currentAreaName}`,
        title: '',
        cssClass: 'odd',
      },
      {
        id: 5,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: 'change',
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chartLineBuilder
const chartLineBuilder = nodes => {
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Estimated Resident Population (ERP)',
        align: 'left',
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatShortDecimal(this.y)}%`;
        },
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: nodes[0].Geoname,
          data: _.map(nodes, 'Changeper').reverse(),
        },
        {
          color: '',
          yAxis: 0,
          name: nodes[0].GeonameSTE,
          data: _.map(nodes, 'ChangeperSTE').reverse(),
        },
        {
          color: '',
          yAxis: 0,
          name: nodes[0].GeonameAUS,
          data: _.map(nodes, 'ChangeperAUS').reverse(),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'Year').reverse(),
        croshair: false,
        title: {
          text: 'Year ending June',
          align: 'low',
        },

        labels: {
          staggerLines: 0,
          format: '',
        },
        opposite: false,
        plotBands: [],
      },
      yAxis: [
        {
          croshair: false,
          title: {
            text: 'Percentage change',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatChangeNumber(this.value);
            },
          },
          opposite: false,
          plotBands: [],
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart2',
    logoUrl: 'http://profile.local.com.au:8666/dist/images/id-logo.png',
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = nodes => {
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Estimated Resident Population (ERP)',
      },
      subtitle: {
        text: nodes[0].Geoname,
      },
      series: [
        {
          name: nodes[0].Geoname,
          data: _.map(nodes, 'Number').reverse(),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'Year').reverse(),
        title: {
          text: 'Year ending June',
        },
      },
      yAxis: [
        {
          title: {
            text: 'Total Estimated Resident Population (ERP)',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: '/images/id-logo.png',
    chartTemplate: 'Standard',
  };
};
// #endregion
