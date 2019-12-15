// #region imports
import _ from 'lodash';
import { formatShortDecimal, formatNumber, formatChangeNumber, formatChangePercent } from '../../../utils';
import { ItemWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import getActiveToggle from '../../../utils/getActiveToggle';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
// #endregion

// #region population page
const TemplatePage = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const { tableData, filterToggles } = useContext(PageContext);
  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);
  const currentYear = getActiveToggle(filterToggles, 'sStartYear', LongName);
  const benchmarkYear = getActiveToggle(filterToggles, 'sEndYear', LongName);
  const tableParams = tableBuilder(currentYear, benchmarkYear, clientAlias, tableData);
  const chartData = chartBuilder(currentYear, benchmarkYear, currentAreaName, tableData);
  const chartChangeData = chartBuilderChange(currentYear, benchmarkYear, currentAreaName, tableData);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Registered business by industry shows how many businesses there are in City of Monash within each industry
            sector using the Australian Bureau of Statistics (ABS) Business Register which itself is derived from the
            GST register held by the Australian Tax Office (ATO). Businesses are included if they are registered with
            the ATO, with an ABN used within the previous two financial years. Businesses are split up between employing
            and non-employing businesses. Non-employing businesses may include sole traders and registered ABNs which
            are part of larger enterprises.
          </p>
          <p>
            The distribution of businesses may reflect the industry structure of the area, or may differ significantly.
            For instance, the largest industry in an area may consist of one very large business, with a large number of
            employees, while a sector with a lower value added could have a lot of small and micro businesses.
          </p>

          <p>
            The number of businesses in the City of Monash should be viewed in conjunction with Employment by industry
            (Total) and Value added datasets to see the relative size of industries, and with Employment locations data
            to see where business employment occurs within the area.
          </p>
          <p>
            Please note that this data set has several limitations which are explained in the data notes for this topic.
            Business register counts are an approximation to LGA boundaries based on SA2 level data provided by the
            Australian Bureau of Statistics. As such, they may not exactly match figures sourced directly from the ATO,
            due to boundary issues and the application of ABS randomisation to the dataset. Notably, public sector
            institutions are not recorded which has a significant impact on the numbers for Health Care, Education and
            Public Administration and Safety.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>
              Australian Bureau of Statistics (ABS) – Census 2011 (experimental imputed) &amp; 2016 – by place of work
            </p>
          </div>
        </SourceBubble>
      </PageIntro>
      <ControlPanel />
      <ItemWrapper>
        <EntityTable data={tableParams} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartChangeData} />
      </ItemWrapper>
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
    <a href="http://home.id.com.au/about-us/" target="_blank" title=".id website">
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region tableBuilder
const tableBuilder = (currentYear, benchmarkYear, currentAreaName, nodes) => {
  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    ClientAlias: currentAreaName,
    source: <Source />,
    anchorName: 'Registered businesses by industry',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Registered businesses by industry',
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
            displayText: `${currentAreaName}`,
            colSpan: 1,
            rowSpan: 0,
          },
          {
            cssClass: 'even start-year',
            displayText: currentYear,
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'odd end-year',
            displayText: benchmarkYear,
            colSpan: 3,
            rowSpan: 0,
          },
          {
            cssClass: 'even start-year',
            displayText: 'change',
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
        displayText: 'Industry',
        dataType: 'int',
        sortable: true,
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: 'Number',
        dataType: 'int',
        sortable: true,
        cssClass: 'even latest',
        format: '{0:#,0}',
      },
      {
        id: 2,
        displayText: 'Change in number',
        dataType: 'money',
        sortable: true,
        cssClass: 'even latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 3,
        displayText: 'Change in percent',
        dataType: 'money',
        sortable: true,
        cssClass: 'even latest',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 4,
        displayText: 'Number',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'odd',
        format: '{0:#,0}',
      },
      {
        id: 5,
        displayText: 'Change in number',
        dataType: 'money',
        sortable: true,
        cssClass: 'per odd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 6,
        displayText: 'Change in percent',
        dataType: 'money',
        sortable: true,
        cssClass: 'odd',
        format: '{0:+#,0;-#,0;0}',
      },
      {
        id: 7,
        displayText: 'Number',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'even',
        format: '{0:#,0}',
      },
    ],
    footRows: [],
    rows: nodes.map(({ LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12 }, i: number) => ({
      data: [LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12],
      formattedData: [
        LabelName,
        formatNumber(NoYear1),
        formatChangeNumber(PerYear1, '--'),
        formatChangePercent(BMYear1, '--'),
        formatNumber(NoYear2),
        formatChangeNumber(PerYear2, '--'),
        formatChangePercent(BMYear2, '--'),
        formatNumber(Change12),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = (currentYear, benchmarkYear, currentAreaName, nodes) => {
  const perYear1Serie = _.map(nodes, item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
    };
  });
  const BMYear1Serie = _.map(nodes, item => {
    return {
      name: item.LabelName,
      y: item.BMYear1,
    };
  });

  return {
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: `Registered businesses by industry ${currentYear}`,
        align: 'left',
      },
      subtitle: {
        text: `${currentAreaName} - ${currentYear} - ${benchmarkYear}`,
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
          name: `${currentAreaName}`,
          data: perYear1Serie,
        },
        {
          name: `BMID`,
          data: BMYear1Serie,
        },
      ],
      xAxis: {
        type: 'category',
        title: {
          text: 'Industry sector',
          align: 'low',
        },
      },
      yAxis: [
        {
          title: {
            text: `Total of [BType]`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return `${this.value}%`;
            },
          },
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: 'http://profile.local.com.au:8666/dist/images/id-logo.png',
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region chart builder change
const chartBuilderChange = (currentYear, benchmarkYear, currentAreaName, nodes) => {
  const categories = _.map(nodes, 'LabelName');
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Change in local workers field of qualification, 2016',
        align: 'left',
      },
      subtitle: {
        text: `subtitle`,
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
          name: `serie's name`,
          data: _.map(nodes, 'Change12'),
        },
      ],
      xAxis: {
        categories,
        croshair: false,
        title: {
          text: 'Field of qualification',
          align: 'low',
        },

        labels: {
          staggerLines: 0,
          format: '',
        },
        opposite: false,
      },
      yAxis: [
        {
          title: {
            text: `Change in [] local workers`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatChangeNumber(this.value);
            },
          },
          opposite: false,
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

// // #endregion
