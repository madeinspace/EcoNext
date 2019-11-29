// #region imports
import _ from 'lodash';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent } from '../../../utils';
import {
  Headline,
  ItemWrapper,
  CrossLink,
  PageIntroFullWidth,
  ForecastProductIcon,
} from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { useContext } from 'react';
import getActiveToggle from '../../../utils/getActiveToggle';
// #endregion

const GrossProductPage = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const { tableData, toggles } = useContext(PageContext);

  // const currentAreaName = getActiveToggle(toggles, 'WebID', LongName);

  // const chartData = chartBuilder(tableData);
  // const chartLineData = chartLineBuilder(tableData);
  // const tableParams = tableBuilder(clientAlias, tableData);

  // const latestPop = tableData[0].Number;
  // const latestYear = tableData[0].Year;

  return (
    <>
      <ControlPanel />
      {/* <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartLineData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Local workers - field of qualification'} />
      </ItemWrapper> */}
    </>
  );
};

export default GrossProductPage;

// #region Source
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by{' '}
    <a href="http://home.id.com.au/about-us/" target="_blank" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region tableBuilder
const tableBuilder = (clientAlias, nodes) => {
  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias,
    source: <Source />,
    anchorName: 'service-age-groups',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Annual change in Estimated Resident Population (ERP)',
            colSpan: 10,
            rowSpan: 0,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: '',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: nodes[0].Geoname,
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xodd end-year',
            displayText: nodes[0].GeonameSTE,
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'xeven start-year',
            displayText: nodes[0].GeonameAUS,
            colSpan: 3,
            rowSpan: 0,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: 'Number',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:#,0}',
      },
      {
        id: 2,
        displayText: 'Change in number',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 3,
        displayText: 'Change in percent',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 4,
        displayText: 'Number',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:#,0}',
      },
      {
        id: 5,
        displayText: 'Change in number',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 6,
        displayText: 'Change in percent',
        dataType: 'money',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 7,
        displayText: 'Number',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven',
        format: '{0:#,0}',
      },
      {
        id: 8,
        displayText: 'Change in number',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xeven',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 9,
        displayText: 'Change in percent',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven',
        format: '{0:+#,0;-#,0;0}',
      },
    ],
    footRows: [],
    rows: nodes.map(
      (
        {
          Year,
          Number,
          ChangeYear1Year2,
          Changeper,
          NumberSTE,
          ChangeYear1Year2STE,
          ChangeperSTE,
          NumberAUS,
          ChangeYear1Year2AUS,
          ChangeperAUS,
        },
        i: number,
      ) => ({
        data: [
          Year,
          Number,
          ChangeYear1Year2,
          Changeper,
          NumberSTE,
          ChangeYear1Year2STE,
          ChangeperSTE,
          NumberAUS,
          ChangeYear1Year2AUS,
          ChangeperAUS,
        ],
        formattedData: [
          Year,
          formatNumber(Number),
          formatChangeNumber(ChangeYear1Year2, '--'),
          formatChangePercent(Changeper, '--'),
          formatNumber(NumberSTE),
          formatChangeNumber(ChangeYear1Year2STE, '--'),
          formatChangePercent(ChangeperSTE, '--'),
          formatNumber(NumberAUS),
          formatChangeNumber(ChangeYear1Year2AUS, '--'),
          formatChangePercent(ChangeperAUS, '--'),
        ],
        id: i,
      }),
    ),
    noOfRowsOnInit: 11,
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
    entityID: 1,
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
        styledMode: true,
      },
      title: {
        text: 'Estimated Resident Population (ERP)',
        align: 'left',
      },
      subtitle: {
        text: nodes[0].Geoname,
        align: 'left',
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: nodes[0].Geoname,
          data: _.map(nodes, 'Number').reverse(),
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
            text: 'Total Estimated Resident Population (ERP)',
            align: 'low',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatNumber(this.value);
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
    chartContainerID: 'chart1',
    logoUrl: '/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard',
  };
};
// #endregion
