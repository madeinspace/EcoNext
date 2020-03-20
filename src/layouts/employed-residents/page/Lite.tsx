// #region imports
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import { formatNumber, formatChangeNumber, idlogo, formatShortDecimal } from '../../../utils';
import { ItemWrapper, PageIntroFullWidth, CrossLink, ProfileProductIcon } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import _ from 'lodash';
import EntityTable from '../../../components/table/EntityTable';
import getActiveToggle from '../../../utils/getActiveToggle';
import { ABSLink, NierLink, IdLink, ABSLinkBuilder, LinkBuilder } from '../../../components/ui/links';
// #endregion
// #region LiteContent
const LiteContent = () => {
  const { LongName, clientAlias, clientProducts } = useContext(ClientContext);
  const { contentData, filterToggles } = useContext(PageContext);
  const currentBenchmark = getActiveToggle(filterToggles, 'BMID');
  const chartData = chartBuilder(LongName, contentData);
  const tableParams = tableBuilder(currentBenchmark, clientAlias, LongName, contentData);
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
      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable data={tableParams} name={'Local jobs lite'} />
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

export default LiteContent;
// #endregion
// #region tableBuilder
const tableBuilder = (currentBenchmark, clientAlias, LongName, nodes) => {
  const tableTitle = 'Employed residents';
  const anchorName = 'indicators---local-jobs';

  return {
    cssClass: '',
    clientAlias,
    source: <Source />,
    anchorName,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 6,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: '',
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: LongName,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: currentBenchmark,
            colSpan: 2,
          },
          {
            cssClass: 'even',
            displayText: '',
            colSpan: 1,
          },
        ],
      },
    ],
    cols: [
      { id: 0, displayText: 'Year (ending June 30)', cssClass: 'odd first int' },
      { id: 1, displayText: 'Number', cssClass: 'even int' },
      {
        id: 2,
        displayText: '%change',
        cssClass: 'even int',
      },
      {
        id: 3,
        displayText: 'Number',
        cssClass: 'odd int',
      },
      {
        id: 4,
        displayText: '%change',
        cssClass: 'odd int',
      },
      {
        id: 5,
        displayText: `${LongName} as a % of ${currentBenchmark}`,
        cssClass: 'even int',
      },
    ],
    footRows: [],
    rows: nodes.map(({ Yr, ValWebID, PerWebID, ValBM, PerBM, PerWebIDofBM }, i: number) => ({
      data: [Yr, ValWebID, PerWebID, ValBM, PerWebID, PerWebIDofBM],
      formattedData: [
        Yr,
        formatNumber(ValWebID),
        formatChangeNumber(PerWebID, '--'),
        formatNumber(ValBM),
        formatChangeNumber(PerBM, '--'),
        formatShortDecimal(PerWebIDofBM, '--'),
      ],
      id: i,
    })),
    noOfRowsOnInit: 0,
  };
};
// #endregion
// #region TableSource
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
const rawDataSource =
  'Source: National Institute of Economic and Industry Research(NIEIR) ©2019. Compiled and presented in economy.id by.id, the population experts Data are based on a 2016 - 17 price base for all years.NIEIR - ID data are inflation adjusted each year to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.Learn more * Cumulative change uses 2010 as the base year.';

// #endregion
// #endregion
// #region ChartSource
const ChartSource = () => (
  <p>
    Source: <NierLink /> ©2019 Compiled and presented in economy.id by <IdLink />
  </p>
);
// #endregion
// #region chartbuilder
const chartBuilder = (LongName, nodes) => {
  const chartType = 'column';
  const chartTitle = 'Employed residents';
  const xAxisTitle = 'Year ending June';
  const yAxisTitle = 'Employed residents';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'JobsLite';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${LongName}: ${formatNumber(this.y)}`;
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
        text: LongName,
      },
      series: [
        {
          name: LongName,
          data: _.map(nodes, 'ValWebID').reverse(),
        },
      ],
      xAxis: {
        categories: _.map(nodes, 'Yr').reverse(),
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
