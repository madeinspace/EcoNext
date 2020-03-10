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
  idlogo,
  formatLongNumber,
} from '../../../utils';
import { ItemWrapper, PageIntro, TopList, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import { IdLink, NierLink, LinkBuilder } from '../../../components/ui/links';
// #endregion

// #region population page
const TemplatePage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName, currentBenchmarkName },
  } = useContext(PageContext);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Industry sector profiles reveal the way in which each industry contributes to the economy in{' '}
            {prefixedAreaName} using ten economic measures generated by NIEIR economic modelling. This helps in
            understanding the role each industry sector plays in the economy.
          </p>
          <p>
            For example, some industry sectors generate substantial output (turnover), but are not big employers and
            targeting those industry sectors may not meet the economic development objective of maximising employment.
          </p>
          <p>
            In the first chart, you can also see how the output of an industry is divided between local sales, domestic
            exports and international exports. This information can reveal how an industry is structured, and whether it
            is focused on exporting or on serving the local population.
          </p>
          <p>
            The table and second chart also show how {prefixedAreaName} contributes to the wider economy. For example,
            Agriculture in {prefixedAreaName} contributes 0.3% of {currentBenchmarkName}’s Agriculture employment.
          </p>
          <p>
            Industry sector analysis data should be viewed in conjunction with{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/employment-by-industry`,
              `Employment by industry (Total)`,
            )}
            ,{' '}
            {LinkBuilder(
              `https://economy.id.com.au/${clientAlias}/employment-by-industry-fte`,
              `Employment by industry (FTE)`,
            )}
            , {LinkBuilder(`https://economy.id.com.au/${clientAlias}/value-add-by-industry`, `Value added`)},{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/imports-by-industry`, `Imports`)}
            and {LinkBuilder(`https://economy.id.com.au/${clientAlias}/exports-by-industry`, `Exports`)} to see how each
            specific industry fits into the wider picture of all industries within {prefixedAreaName}. To see how
            concentrated each industry sector is, visit the{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/employment-locations`, `Employment locations`)}{' '}
            section.
          </p>
          <p>
            The third chart refers to how employment in {prefixedAreaName} has changed overtime and how it compares to
            expected changes based on benchmark and industry trends. This type of analysis is explored further within
            the {LinkBuilder(`https://economy.id.com.au/${clientAlias}/shift-share`, `Shift-share analysis`)} economic
            tool.”
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
        <EntityTable data={tableBuilder()} name={useEntityText('Subtitle')} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartBuilderContribution()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartBuilderShiftShare()} />
      </ItemWrapper>

      {/*<ItemWrapper>
        <EntityChart data={chartLineData} />
      </ItemWrapper> */}
    </>
  );
};

// #endregion

export default TemplatePage;

// #region Source
const Source = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. Data are based on a 2016-17 price
      base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data
      releases adjust previous years’ figures to a new base year.
      {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};
const ChartSource = () => (
  <p>
    Source: <NierLink /> Compiled and presented in economy.id by <IdLink />.
  </p>
);
// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentBenchmarkName, currentComparisonYear, currentStartYear, currentIndustryName },
  } = useContext(PageContext);
  const separator = {
    cssClass: 'plain',
    data: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    formattedData: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  };

  const pluckFromRange = (arr, start, end) => arr.filter((item, i) => i >= start && i <= end);

  const measure1 = pluckFromRange(data[0].data, 0, 2).map(
    ({ LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12 }, i) => {
      const row = {
        data: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        formattedData: [
          LabelName,
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(NoYear1) : formatNumber(NoYear1),
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(BMYear1) : formatNumber(BMYear1),
          `${formatPercent(PerYear1)}%`,
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(NoYear2) : formatNumber(NoYear2),
          LabelName === 'FTE to total employment ratio' ? formatShortDecimal(BMYear2) : formatNumber(BMYear2),
          `${formatPercent(PerYear2)}%`,
          LabelName === 'FTE to total employment ratio' ? formatChangeNumber(Change12) : formatChangeInt(Change12),
        ],
        id: i,
      };
      return row;
    },
  );

  const measure2 = pluckFromRange(data[0].data, 3, 11).map(
    ({ LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12 }, i) => {
      const row = {
        data: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        formattedData: [
          LabelName,
          formatLongNumber(NoYear1),
          formatLongNumber(BMYear1),
          `${formatPercent(PerYear1)}%`,
          formatLongNumber(NoYear2),
          formatLongNumber(BMYear2),
          `${formatPercent(PerYear2)}%`,
          formatChangeNumber(Change12),
        ],
        id: i,
      };
      return row;
    },
  );
  const measure3 = [data[0].data[12]].map(
    ({ LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12 }, i) => {
      const row = {
        data: [LabelName, NoYear1, BMYear1, PerYear1, NoYear2, BMYear2, PerYear2, Change12],
        formattedData: [
          LabelName,
          formatNumber(NoYear1),
          formatNumber(BMYear1),
          `${formatPercent(PerYear1)}%`,
          formatNumber(NoYear2),
          formatNumber(BMYear2),
          `${formatPercent(PerYear2)}%`,
          formatChangeInt(Change12),
        ],
        id: i,
      };
      return row;
    },
  );
  const rows = [...measure1, separator, ...measure2, separator, ...measure3];

  return {
    cssClass: '',
    allowSort: false,
    allowSortReset: false,
    groupOn: '',
    ClientAlias: clientAlias,
    source: <Source />,
    anchorName: 'industry-sector-analysis',
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
            displayText: `${currentAreaName} - ${currentIndustryName} - Constant prices`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparisonYear}`,
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
        sortable: false,
        displayText: 'Economic measure',
        cssClass: 'odd first',
      },
      {
        id: 1,
        sortable: false,
        displayText: `${currentAreaName}`,
        cssClass: 'even int',
      },
      {
        id: 2,
        sortable: false,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'even int',
      },
      {
        id: 3,
        sortable: false,
        displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
        cssClass: 'even int int ',
      },
      {
        id: 4,
        sortable: false,
        displayText: `${currentAreaName}`,
        cssClass: 'odd',
      },
      {
        id: 5,
        sortable: false,
        displayText: `${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 6,
        sortable: false,
        displayText: `${currentAreaName} as a % of ${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        sortable: false,
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
const chartBuilder = () => {
  const {
    contentData,
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName },
  } = useContext(PageContext);
  const data = contentData[0].data;
  const totalExports = data.filter(({ LabelName }) => LabelName === 'Output/Total Sales ($m)')[0];
  const localSales = data.filter(({ LabelName }) => LabelName === 'Local Sales ($m)')[0];
  const exportsInt = data.filter(({ LabelName }) => LabelName === 'Exports (international) ($m)')[0];
  const exportsDom = data.filter(({ LabelName }) => LabelName === 'Exports (domestic) ($m)')[0];
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
        text: 'Economic output by destination',
      },
      subtitle: {
        text: `${currentAreaName} - ${currentIndustryName}`,
      },
      series: [
        {
          name: `Local Sales`,
          data: [(localSales.NoYear1 / totalExports.NoYear1) * 100, (localSales.BMYear1 / totalExports.BMYear1) * 100],
        },
        {
          name: `Exports (domestic)`,
          data: [(exportsDom.NoYear1 / totalExports.NoYear1) * 100, (exportsDom.BMYear1 / totalExports.BMYear1) * 100],
        },
        {
          name: `Exports (international)`,
          data: [(exportsInt.NoYear1 / totalExports.NoYear1) * 100, (exportsInt.BMYear1 / totalExports.BMYear1) * 100],
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
          minPointLength: 3,
        },
      },
      xAxis: {
        categories: [`${currentAreaName}`, `${currentBenchmarkName}`],
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
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'chart1',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region  chartbuilder
const chartBuilderContribution = () => {
  const {
    contentData,
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName, currentStartYear },
  } = useContext(PageContext);
  const withoutWorkersProd = contentData[0].data.slice(0, -1);
  const serie = withoutWorkersProd.map(item => item.PerYear1);
  const categories = withoutWorkersProd.map(item => item.LabelName);
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
        text: `Industry contribution to ${currentBenchmarkName} ${currentStartYear}`,
      },
      subtitle: {
        text: ``,
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          name: `${currentAreaName} - ${currentIndustryName}`,
          data: serie,
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      xAxis: {
        categories,
        title: {
          text: 'Economy measure',
        },
        allowDecimals: true,
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: `% of ${currentBenchmarkName}`,
          },
          // tickInterval: 0.5,
          labels: {
            staggerLines: 0,
            formatter: function() {
              return `${this.value > 0 ? '+' : '-'}${formatPercent(this.value)}%`;
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
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'contribution',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion
// #region  chartbuilder
const chartBuilderShiftShare = () => {
  const {
    contentData: data,
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName, currentComparisonYear, currentStartYear },
  } = useContext(PageContext);
  const categories = data[1].data.map(({ Topic }) => Topic);
  const serie = data[1].data.map(({ Number }) => Number);
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> Net change in ${this.category}, - ${
      this.series.name
    }: ${formatLongNumber(this.y)}`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: `Shift-share analysis for Employment (Total) ${currentComparisonYear} to ${currentStartYear}`,
      },
      subtitle: {
        text: `${currentIndustryName}`,
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          name: `${currentAreaName} relative to  ${currentBenchmarkName}`,
          data: serie,
        },
      ],
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Shift share component effect',
        },
        allowDecimals: true,
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: `Change of number of employment (estimated)`,
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
    rawDataSource: 'Source: National Institute of Economic and Industry Research (NIEIR) ©2019',
    dataSource: <ChartSource />,
    chartContainerID: 'shiftShare',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion
