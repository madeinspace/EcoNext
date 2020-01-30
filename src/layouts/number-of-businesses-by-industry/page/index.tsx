// #region imports
import _ from 'lodash';
import {
  formatShortDecimal,
  formatNumber,
  formatChangeNumber,
  formatChangePercent,
  idlogo,
  formatChangeInt,
  formatPercent,
} from '../../../utils';
import { ItemWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import getActiveToggle from '../../../utils/getActiveToggle';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
// #endregion

const lookup = {
  'Non-employing': 'registered non-employing businesses',
  Employing: 'registered employing businesses',
  '1 to 4 ': 'businesses employing 1 to 4 people',
  '5 to 19': 'businesses employing 5 to 19 people',
  '200 or more': 'businesses employing 200 or more people',
  'Total businesses': 'total registered businesses',
};

// #region population page
const TemplatePage = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const { contentData, filterToggles } = useContext(PageContext);
  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);
  const currentYear = getActiveToggle(filterToggles, 'sStartYear', LongName);
  const benchmarkYear = getActiveToggle(filterToggles, 'sEndYear', LongName);
  const currentBtype = getActiveToggle(filterToggles, 'BType');
  const currentBenchmarkName = getActiveToggle(filterToggles, 'BMID');
  const tableParams = tableBuilder(
    currentBenchmarkName,
    currentBtype,
    currentYear,
    benchmarkYear,
    LongName,
    contentData,
  );
  const chartData = chartBuilder(
    currentBenchmarkName,
    lookup[currentBtype],
    currentYear,
    benchmarkYear,
    currentAreaName,
    contentData,
  );
  const chartChangeData = chartBuilderChange(
    currentBenchmarkName,
    lookup[currentBtype],
    currentYear,
    benchmarkYear,
    currentAreaName,
    contentData,
  );

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Registered business by industry shows how many businesses there are in {currentAreaName} within each
            industry sector using the Australian Bureau of Statistics (ABS) Business Register which itself is derived
            from the GST register held by the Australian Tax Office (ATO). Businesses are included if they are
            registered with the ATO, with an ABN used within the previous two financial years. Businesses are split up
            between employing and non-employing businesses. Non-employing businesses may include sole traders and
            registered ABNs which are part of larger enterprises.
          </p>
          <p>
            The distribution of businesses may reflect the industry structure of the area, or may differ significantly.
            For instance, the largest industry in an area may consist of one very large business, with a large number of
            employees, while a sector with a lower value added could have a lot of small and micro businesses.
          </p>

          <p>
            The number of businesses in the {currentAreaName} should be viewed in conjunction with{' '}
            {LinkBuilder('https://economy.id.com.au/tasmania/employment-by-industry', 'Employment by industry (Total)')}{' '}
            and {LinkBuilder('https://economy.id.com.au/tasmania/value-add-by-industry', 'Value added')} datasets to see
            the relative size of industries, and with{' '}
            {LinkBuilder('https://economy.id.com.au/tasmania/employment-locations', 'Employment locations')} data to see
            where business employment occurs within the area.
          </p>
          <p>
            Please note that this data set has several limitations which are explained in the{' '}
            {LinkBuilder(
              'https://economy.id.com.au/tasmania/topic-notes?#employment-size-of-registered-businesses',
              'data notes',
            )}{' '}
            for this topic. Business register counts are an approximation to LGA boundaries based on SA2 level data
            provided by the Australian Bureau of Statistics. As such, they may not exactly match figures sourced
            directly from the ATO, due to boundary issues and the application of ABS randomisation to the dataset.
            Notably, public sector institutions are not recorded which has a significant impact on the numbers for
            Health Care, Education and Public Administration and Safety.
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
  <p>
    Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in
    economy.id by <IdLink />
  </p>
);
// #endregion

// #region tableBuilder
const tableBuilder = (currentBenchmarkName, currentBtype, currentYear, benchmarkYear, currentAreaName, nodes) => {
  console.log(
    'currentBenchmarkName, currentBtype, currentYear, benchmarkYear, currentAreaName, nodes: ',
    currentBenchmarkName,
    currentBtype,
    currentYear,
    benchmarkYear,
    currentAreaName,
    nodes,
  );

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
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub',
            displayText: `${nodes[0].GeoName} - ${lookup[currentBtype]}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: currentYear,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: benchmarkYear,
            colSpan: 3,
          },
          {
            cssClass: 'even sml',
            displayText: 'change',
            colSpan: 3,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Industry',
        cssClass: 'odd first int',
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'even int',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: `% ${currentBenchmarkName}`,
        cssClass: 'even int',
      },
      {
        id: 4,
        displayText: 'Number',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: '%',
        cssClass: 'odd int',
      },
      {
        id: 6,
        displayText: `% ${currentBenchmarkName}`,
        cssClass: 'odd int',
      },
      {
        id: 7,
        displayText: `${benchmarkYear} to ${currentYear}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: nodes.map(({ LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12 }, i: number) => ({
      data: [LabelName, NoYear1, PerYear1, BMYear1, NoYear2, PerYear2, BMYear2, Change12],
      formattedData: [
        LabelName,
        formatNumber(NoYear1),
        formatPercent(PerYear1),
        formatPercent(BMYear1),
        formatNumber(NoYear2),
        formatPercent(PerYear2),
        formatPercent(BMYear2),
        formatChangeInt(Change12),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = (currentBenchmarkName, currentBtype, currentYear, benchmarkYear, currentAreaName, nodes) => {
  const totalBiz = 999999;
  const filterednodes = nodes.filter(item => item.LabelKey !== totalBiz);

  const perYear1Serie = filterednodes.map(item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
    };
  });
  const BMYear1Serie = filterednodes.map(item => {
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
        text: `${currentBtype}`,
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
          name: `${currentBenchmarkName}`,
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
            text: `% of ${currentBtype}`,
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
      'Source: Australian Bureau of Statistics, Counts of Australian Businesses, including Entries and Exits, 2016 to 2018 Cat. No. 8165.0',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};
// #endregion

// #region chart builder change
const chartBuilderChange = (currentBenchmarkName, currentBtype, currentYear, benchmarkYear, currentAreaName, nodes) => {
  const totalBiz = 999999;
  const filterednodes = nodes.filter(item => item.LabelKey !== totalBiz);
  const categories = _.map(filterednodes, 'LabelName');
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'bar',
      },
      title: {
        text: `Change in registered businesses by industry, ${benchmarkYear} to ${currentYear}`,
        align: 'left',
      },
      subtitle: {
        text: `${currentAreaName} - ${currentBtype}`,
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
          data: _.map(filterednodes, 'Change12'),
        },
      ],
      xAxis: {
        categories,
        croshair: false,
        title: {
          text: 'Industry sector',
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
            text: `Change in number of ${currentBtype}`,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatChangeInt(this.value);
            },
          },
          opposite: false,
        },
      ],
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Counts of Australian Businesses, including Entries and Exits, 2016 to 2018 Cat. No. 8165.0',
    dataSource: <Source />,
    chartContainerID: 'chart2',
    logoUrl: idlogo,
    chartTemplate: 'Standard',
  };
};

// // #endregion
