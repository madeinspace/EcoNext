import { PageContext, ClientContext } from '../../../utils/context';
import { useContext } from 'react';
import getActiveToggle from '../../../utils/getActiveToggle';
import {
  ItemWrapper,
  CrossLink,
  ProfileProductIcon,
  PageIntro,
  PageIntroFullWidth,
} from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import { formatNumber, formatChangeNumber, idlogo, formatPercent, formatShortDecimal } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import { NierLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
const FullContent = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const { contentData, filterToggles } = useContext(PageContext);
  const currentBenchmark = getActiveToggle(filterToggles, 'BMID');
  const GRPChartData = JobsChartBuilder(contentData);
  const AnnualChangeChartData = AnnualChangeJobsChartBuilder(contentData, currentBenchmark);
  const tableParams = tableBuilder(currentBenchmark, clientAlias, contentData);
  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);

  return (
    <>
      <PageIntroFullWidth>
        <p>
          This indicator shows the estimated number of employed residents of the local area, on an annual basis back to
          2001. Employed residents may have a workplace anywhere, inside or outside the area. The dataset is derived
          from the National Economics microsimulation model, based on the ABS labour force survey.
        </p>
        <p>
          A growing number of resident employed can indicate a growing economy, or a growing residential population,
          supplying labour to other areas. To build a more complete picture of the residential economy, this dataset
          should be viewed in conjunction with{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/local-jobs`, 'Local employment')},{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/employed-locally`, 'Employment self-containment')},{' '}
          {LinkBuilder(
            `https://economy.id.com.au/${clientAlias}/residents-place-of-work-industry`,
            'Residents place of work by industry',
          )}{' '}
          and{' '}
          {LinkBuilder(
            `https://economy.id.com.au/${clientAlias}/residents-place-of-work-occupation`,
            'Residents place of work by occupation',
          )}{' '}
          datasets.
        </p>
      </PageIntroFullWidth>
      <ControlPanel />
      <ItemWrapper>
        <EntityChart data={GRPChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityChart data={AnnualChangeChartData} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
      </ItemWrapper>
      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(
            `https://profile.id.com.au/${clientAlias}/employment-status`,
            `Residents employment status by small area`,
          )}
        </CrossLink>
      )}
    </>
  );
};

export default FullContent;

// #region Source
const Source = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: National Institute of Economic and Industry Research (NIEIR) ©2019. Compiled and presented in economy.id
      by <IdLink />. NIEIR-ID data are adjusted each year, using updated employment estimates. Each release may change
      previous years’ figures.{' '}
      {LinkBuilder(`https://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}
    </p>
  );
};
const ChartSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by
      .id the population experts
    </p>
  );
};
const rawDataSource =
  'Source: National Institute of Economic and Industry Research(NIEIR) ©2019. Compiled and presented in economy.id by.id, the population experts Data are based on a 2016 - 17 price base for all years.NIEIR - ID data are inflation adjusted each year to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.Learn more * Cumulative change uses 2010 as the base year.';

// #endregion

// #region Employed resident charts
const tableBuilder = (currentBenchmark, clientAlias, rows) => {
  const tableTitle = 'Employed residents';
  const clientLongName = rows[0].GeoName;
  const totalColSpan = 8;

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    anchorName: `employed-residents`,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: totalColSpan,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: clientLongName,
            colSpan: 2,
          },
          {
            cssClass: 'odd ',
            displayText: currentBenchmark,
            colSpan: 2,
          },
          {
            cssClass: 'even',
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'odd first XXXL',
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'even S',
      },
      {
        id: 2,
        displayText: '% change',
        cssClass: 'even S',
      },
      {
        id: 3,
        displayText: 'Number',
        cssClass: 'odd S',
      },
      {
        id: 4,
        displayText: '% change',
        cssClass: 'odd S',
      },
      {
        id: 5,
        displayText: `${clientLongName} as a % of ${currentBenchmark}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: rows.map(({ Year_End, LocalJobs, ChangePer, BMchangePer, BMLJ, WEBperBM }, i: number) => ({
      data: [Year_End, LocalJobs, ChangePer, BMLJ, BMchangePer, WEBperBM],
      formattedData: [
        Year_End,
        formatNumber(LocalJobs),
        formatChangeNumber(ChangePer, '--'),
        formatNumber(BMLJ),
        formatChangeNumber(BMchangePer, '--'),
        formatShortDecimal(WEBperBM),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region Employed resident charts
const JobsChartBuilder = nodes => {
  const chartTitle = 'Employed residents';
  const chartType = 'column';
  const geoName = nodes[0].GeoName;
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Employed residents';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'grp-chart';
  const categories = _.map(nodes, 'Year_End').reverse();
  const serie = _.map(nodes, 'LocalJobs').reverse();
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${geoName}: ${formatNumber(this.y)}`;
  };
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
        text: geoName,
      },
      series: [
        {
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
              return formatNumber(this.value);
            },
          },
        },
      ],
      tooltip: {
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion

// #region Source
const AnnualChangeJobsChartBuilder = (nodes, currentBenchmark) => {
  const chartType = 'line';
  const chartTitle = 'Annual change in employed residents';
  const yAxisTitle = '% change from previous year'; // vert axis
  const xAxisTitle = 'Year ending June'; // horizontal axis
  const categories = _.map(nodes, 'Year_End').reverse();
  const clientSerie = _.map(nodes, 'ChangePer').reverse();
  const benchmarkSerie = _.map(nodes, 'BMchangePer').reverse();
  const averageSerie = _.map(nodes, 'ChangePer2').reverse();
  const geoName = nodes[0].GeoName;
  const chartContainerID = 'annual-chart';
  const averageSerieName = 'Average annual growth rate';
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatPercent(
      this.y,
    )}%`;
  };
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
          name: geoName,
          data: clientSerie,
        },
        {
          name: currentBenchmark,
          data: benchmarkSerie,
        },
        {
          name: averageSerieName,
          data: averageSerie,
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
              return `${formatNumber(this.value)}%`;
            },
          },
        },
      ],
      tooltip: {
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion
