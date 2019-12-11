// #region imports
import _ from 'lodash';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent } from '../../../utils';
import { ItemWrapper, CrossLink, ForecastProductIcon } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
// #endregion

// #region population page
const PopulationPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const { tableData } = useContext(PageContext);

  const hasForecast = clientProducts => _.some(clientProducts, product => product.AppID === 3);

  const chartData = chartBuilder(tableData);
  const chartLineData = chartLineBuilder(tableData);
  const tableParams = tableBuilder(clientAlias, tableData);

  return (
    <>
      <ItemWrapper>
        <ControlPanel />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartLineData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Estimated Resident Population'} />
      </ItemWrapper>

      {hasForecast(clientProducts) && (
        <CrossLink>
          <ForecastProductIcon />
          <a
            href={`http://forecast.id.com.au/${clientAlias}/population-summary?WebId=10`}
            target="_blank"
            title="link to forecast"
          >
            Population forecasts
            <span className="hidden"> (opens a new window)</span>
          </a>
        </CrossLink>
      )}
    </>
  );
};

// #endregion

export default PopulationPage;

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
const tableBuilder = (alias, nodes) => {
  return {
    cssClass: '',
    clientAlias: alias,
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
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1,
          },
          {
            cssClass: 'xeven ',
            displayText: nodes[0].Geoname,
            colSpan: 3,
          },
          {
            cssClass: 'xodd ',
            displayText: nodes[0].GeonameSTE,
            colSpan: 3,
          },
          {
            cssClass: 'xeven ',
            displayText: nodes[0].GeonameAUS,
            colSpan: 3,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'xodd xfirst',
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'xeven int',
      },
      {
        id: 2,
        displayText: 'Change in number',
        cssClass: 'xeven int',
      },
      {
        id: 3,
        displayText: 'Change in percent',
        cssClass: 'xeven int',
      },
      {
        id: 4,
        displayText: 'Number',
        cssClass: 'xodd int',
      },
      {
        id: 5,
        displayText: 'Change in number',
        cssClass: 'xodd int',
      },
      {
        id: 6,
        displayText: 'Change in percent',
        cssClass: 'xodd int',
      },
      {
        id: 7,
        displayText: 'Number',
        cssClass: 'xeven int',
      },
      {
        id: 8,
        displayText: 'Change in number',
        cssClass: 'xeven int',
      },
      {
        id: 9,
        displayText: 'Change in percent',
        cssClass: 'xeven int',
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
  const clientSerie = _.map(nodes, 'Changeper').reverse();
  const stateSerie = _.map(nodes, 'ChangeperSTE').reverse();
  const australiaSerie = _.map(nodes, 'ChangeperAUS').reverse();

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
          name: nodes[0].Geoname,
          data: clientSerie,
        },
        {
          name: nodes[0].GeonameSTE,
          data: stateSerie,
        },
        {
          name: nodes[0].GeonameAUS,
          data: australiaSerie,
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'Year').reverse(),
        title: {
          text: 'Year ending June',
          align: 'low',
        },
        labels: {
          staggerLines: 0,
          format: '',
        },
      },
      yAxis: [
        {
          title: {
            text: 'Percentage change',
          },
          labels: {
            formatter: function() {
              return formatChangeNumber(this.value);
            },
          },
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'line',
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
