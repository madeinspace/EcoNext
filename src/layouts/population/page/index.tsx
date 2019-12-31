// #region imports
import _ from 'lodash';
import React from 'react';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent, idlogo } from '../../../utils';
import { ItemWrapper, CrossLink, ForecastProductIcon } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { IdLink } from '../../../components/ui/links';
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by <IdLink />
  </p>
);
// #endregion

// #region tableBuilder
const tableBuilder = (alias, nodes) => {
  const tableTitle = 'Annual change in Estimated Resident Population (ERP)';
  const anchorName = 'indicators---estimate-resident-population';
  const Geoname = nodes[0].Geoname;
  const GeonameSTE = nodes[0].GeonameSTE;
  const GeonameAUS = nodes[0].GeonameAUS;
  return {
    cssClass: '',
    clientAlias: alias,
    source: <Source />,
    anchorName,
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
            cssClass: '',
            displayText: '',
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: Geoname,
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: GeonameSTE,
            colSpan: 3,
          },
          {
            cssClass: 'even ',
            displayText: GeonameAUS,
            colSpan: 3,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: 'Change in number',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: 'Change in percent',
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: 'Number',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: 'Change in number',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: 'Change in percent',
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: 'Number',
        cssClass: 'even int',
      },
      {
        id: 8,
        displayText: 'Change in number',
        cssClass: 'even int',
      },
      {
        id: 9,
        displayText: 'Change in percent',
        cssClass: 'even int',
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
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chartLineBuilder
const chartLineBuilder = nodes => {
  const chartType = 'line';
  const clientSerie = _.map(nodes, 'Changeper').reverse();
  const stateSerie = _.map(nodes, 'ChangeperSTE').reverse();
  const australiaSerie = _.map(nodes, 'ChangeperAUS').reverse();
  const categories = _.map(nodes, 'Year').reverse();
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartTitle = 'Estimated Resident Population (ERP)';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Percentage change';
  const chartContainerID = 'lineChart';
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
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
            formatter: function() {
              const formatedNumber = `${formatChangePercent(this.value)}%`;
              return formatedNumber;
            },
          },
        },
      ],
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatShortDecimal(this.y)}%`;
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

// #region chartbuilder
const chartBuilder = nodes => {
  const chartType = 'column';
  const chartTitle = 'Estimated Resident Population (ERP)';
  const serieData = _.map(nodes, 'Number').reverse();
  const categories = _.map(nodes, 'Year').reverse();
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Total Estimated Resident Population (ERP)';
  const chartContainerID = 'chart1';
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
        text: nodes[0].Geoname,
      },
      series: [
        {
          color: '',
          yAxis: 0,
          name: nodes[0].Geoname,
          data: serieData,
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
        },
      ],
    },
    rawDataSource,
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion

// #region population page
const PopulationPage = (): JSX.Element => {
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
            rel="noopener"
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
