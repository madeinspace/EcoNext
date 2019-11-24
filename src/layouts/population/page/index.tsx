// #region imports
import _ from 'lodash';
import Layout from '../../main';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent } from '../../../utils';
import {
  MainTitle,
  SubTitle,
  Headline,
  ItemWrapper,
  CrossLink,
  PageIntroFullWidth,
  ForecastProductIcon,
} from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import PageHeader from '../../../components/PageHeader';
import { Context } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
// #endregion

// #region population page
const PopulationPage = () => (
  <Context.Consumer>
    {({ clientData, clientAlias, handle, tableData, navigation, clientProducts, sitemapGroups }) => {
      const { LongName: prettyName } = clientData;
      const hasForecast = clientProducts => _.some(clientProducts, product => product.AppID === 3);

      const FormattedNumber = number => <>{formatNumber(number)}</>;
      const handleExport = async () => {
        const IDReportRequest = {
          FileName: `Population - ${prettyName}`,
          Urls: [
            {
              Title: `Population - ${prettyName}`,
              url: window.location.href,
            },
          ],
          Action: 0,
          EmailAddress: 'fabrice@id.com.au',
        };

        try {
          const data = await postData(
            'https://idreportserviceweb.azurewebsites.net/api/IDReportService/RequestReport/',
            IDReportRequest,
          ).then(res => {
            console.log('Report Ok: ', res);
          });
          console.log(`Page report request: Population - ${prettyName}`);
        } catch (error) {
          console.error(error);
        }
      };

      const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.json();
      };

      const chartData = chartBuilder(tableData);
      const chartLineData = chartLineBuilder(tableData);
      const tableParams = tableBuilder(clientAlias, tableData);

      return (
        <Layout
          client={clientData}
          navnodes={navigation}
          products={clientProducts}
          sitemapGroup={sitemapGroups}
          handle={handle}
        >
          <PageHeader handleExport={handleExport}>
            <MainTitle>{prettyName}</MainTitle>
            <SubTitle>Population</SubTitle>
          </PageHeader>
          <Headline>
            The Estimated Resident Population of the {prettyName} was <FormattedNumber number={12} /> as of the 30th
            June [latestYear].
          </Headline>
          <PageIntroFullWidth>
            <p>
              The Estimated Resident Population (ERP) is the official population of the area. It is updated annually by
              the Australian Bureau of Statistics, and reassessed every Census. The chart and table show last 10 years
              ERP for {prettyName}, the state and Australia, with percentage comparisons. A growing population can
              indicate a growing economy, but this is not necessarily the case and depends on the residential role and
              function of the area.
            </p>
          </PageIntroFullWidth>

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
            <EntityTable data={tableParams} name={'Local workers - field of qualification'} />
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
        </Layout>
      );
    }}
  </Context.Consumer>
);

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
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
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
