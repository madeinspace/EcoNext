// #region imports
import { formatNumber, formatPercent, formatChangeInt, formatShortDecimal, idlogo } from '../../../utils/';
import { ProfileProductIcon, ItemWrapper, PageIntroFullWidth, CrossLink } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region population page
const UnemploymentPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const hasProfile = () => clientProducts.some(product => product.AppID === 1);

  return (
    <>
      <PageIntroFullWidth>
        <div>
          <p>
            The unemployment rate is derived from the ABS labour force survey and Centrelink data and compiled by the
            Department of Employment. It is published quarterly in the Small Area Labour Markets publication, for Local
            Government Areas. The unemployment rate shown here is the proportion of the resident labour force (those in
            work or looking for work and aged over 15) who are looking for work. Unemployment does not include people
            who don’t have a job but are not seeking a job.
          </p>
          <p>
            Unemployment is an important indicator of the economic success of an area. A low unemployment rate can
            indicate an affluent area with a high rate of access to jobs, or a place where those who can’t find jobs
            leave the area. A high rate can indicate a declining economy with closures of key industries, or a
            residential area with a significantly disadvantaged population.
          </p>
          <p>
            Note: The Department of Employment advise that highly disaggregated labour force and unemployment estimates
            at the LGA level can display significant variability and should be viewed with caution. The figures are
            smoothed using a four-quarter (annual) average to minimise the variability inherent in small area estimates.
          </p>
          <p>
            This page presents unemployment estimates for benchmark regions which are headline figures widely published
            by government and media sites but are not directly comparable to the LGA estimates as they are not annual
            averages. For more information, see the data notes.
          </p>
        </div>
      </PageIntroFullWidth>
      <ControlPanel />
      <ItemWrapper>
        <EntityChart data={lineChartBuilder()} />
      </ItemWrapper>
      {/* <ItemWrapper>
        <EntityChart data={lineChartBuilder()} />
      </ItemWrapper> */}
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
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

export default UnemploymentPage;
// #endregion

// #region Source
const Source = () => (
  <p>
    Source: Australian Bureau of Statistics,{' '}
    {LinkBuilder(`http://www.abs.gov.au/ausstats/abs@.nsf/mf/6202.0`, `Labour force survey`)} catalogue number 6202.0,
    and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by{' '}
    <IdLink />.
  </p>
);

// #endregion

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const anchorName = 'indicators---unemployment';
  const tableTitle = `Unemployment`;
  const distinctYears = [...new Set(data.map(({ Year }) => Year))];
  const parents: any = distinctYears.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        year: cur,
        children: data.filter(({ Year }) => Year === cur),
      },
    ],
    [],
  );
  const STE = data[0].GeonameSTE;
  const GCCSA = data[0].GeonameGCCSA;
  const rows = parents.map(({ year, children }) => {
    return {
      alreadyExpanded: true,
      expandable: children.length > 0,
      cssClass: 'plain',
      id: year,
      data: [year, '', '', '', '', '', ''],
      formattedData: [`${year}`, ' ', ' ', ' ', ' ', ' ', ' '],
      childRows: children.map(
        ({
          Sort,
          LabelMonth,
          NumberUnemp,
          NumberLBF,
          NumberUnempRate,
          NumberUnempRateGCC,
          NumberUnempRateSTE,
          NumberUnempRateAUS,
        }) => ({
          id: Sort,
          data: [LabelMonth, NumberUnemp, NumberUnempRate, NumberUnempRateGCC, NumberUnempRateSTE, NumberUnempRateAUS],
          formattedData: [
            `${LabelMonth}`,
            formatNumber(NumberUnemp),
            formatNumber(NumberLBF),
            `${formatShortDecimal(NumberUnempRate)}`,
            formatShortDecimal(NumberUnempRateGCC),
            formatShortDecimal(NumberUnempRateSTE),
            formatShortDecimal(NumberUnempRateAUS),
          ],
        }),
      ),
    };
  });

  return {
    cssClass: '',
    allowExport: false,
    allowSort: false,
    allowSortReset: true,
    groupOn: '',
    clientAlias: clientAlias,
    source: <Source />,
    anchorName,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 7,
            rowSpan: 0,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: ` `,
            colSpan: 1,
          },
          {
            cssClass: 'even ',
            displayText: `${currentAreaName}`,
            colSpan: 3,
          },
          {
            cssClass: 'odd ',
            displayText: `${GCCSA}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${STE}`,
            colSpan: 1,
          },
          {
            cssClass: 'odd',
            displayText: 'Australia',
            colSpan: 1,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Quarter',
        cssClass: 'odd int first XXXXL ',
      },
      {
        id: 1,
        sortable: false,
        displayText: 'Unemployed people',
        cssClass: 'even int XXL',
      },
      {
        id: 2,
        sortable: false,
        displayText: 'Local resident workers',
        cssClass: 'even int XXL',
      },
      {
        id: 3,
        sortable: false,
        displayText: `Unemployment rate %`,
        cssClass: 'even int XXL',
      },
      {
        id: 4,
        sortable: false,
        displayText: 'Unemployment rate %',
        cssClass: 'odd int XXXL',
      },
      {
        id: 5,
        sortable: false,
        displayText: 'Unemployment rate %',
        cssClass: 'even int XXXL',
      },
      {
        id: 6,
        sortable: false,
        displayText: `Unemployment rate %`,
        cssClass: 'odd int ',
      },
    ],
    footRows: [],
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart
const lineChartBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const distinctYears = [...new Set(data.map(({ Year }) => Year))];

  const parents: any = distinctYears.reduce(
    (acc: any, cur: any) => [
      ...acc,
      {
        year: cur,
        children: data.filter(({ Year }) => Year === cur),
      },
    ],
    [],
  );
  const STE = data[0].GeonameSTE;
  const GCCSA = data[0].GeonameGCCSA;
  const chartTitle = 'Quarterly unemployment rate';
  const xAxisTitle = 'Year';
  const yAxisTitle = 'Unemployment rate';
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Labour force survey, catalogue number 6202.0, and Department of Employment, Small Area Labour Markets, December 2018. Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'quarterly-unemployment-rate';
  const categories = distinctYears.reverse();
  const serie0 = parents.reduce((acc, cur) => {
    return [
      ...acc,
      cur.children.map(({ NumberUnempRate }, id) => {
        return NumberUnempRate;
      }),
    ];
  }, []); //_.map(nodes, 'ChangePer3').reverse();
  const serie1 = []; //_.map(nodes, 'BMChangePer3').reverse();
  const serie2 = []; //_.map(nodes, 'BMChangePer3').reverse();
  const serie3 = []; //_.map(nodes, 'BMChangePer3').reverse();
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: $${formatNumber(
      this.y,
    )} millions`;
  };
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: 'line',
        styledMode: true,
      },
      title: {
        text: chartTitle,
      },
      series: [
        {
          name: `${currentAreaName}`,
          data: serie0,
        },
        {
          name: `${GCCSA}`,
          data: serie1,
        },
        {
          name: `${STE}`,
          data: serie2,
        },
        {
          name: `AUSTRALIA`,
          data: serie3,
        },
      ],
      xAxis: {
        categories,
        max: 4,
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
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo,
  };
};
// #endregion
