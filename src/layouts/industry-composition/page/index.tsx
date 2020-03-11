// #region imports
import _ from 'lodash';
import { formatNumber, idlogo, formatPercent } from '../../../utils/';
import { ItemWrapper, TopList, PageIntroFullWidth } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import EntityChart from '../../../components/chart/EntityChart';
import RelatedPagesCTA from '../../../components/RelatedPages';
// #endregion

// #region Industry composition page
const IndustryCompositionPage = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  return (
    <>
      <PageIntroFullWidth>
        <div>
          <p>
            Understanding the economic role of {LongName} provides a framework for understanding what policy responses
            and investment may be appropriate to support the growth of businesses and maintenance of a vibrant economy
            in the future.
          </p>
          <p>
            The charts and table below give a broad overview of the role and function of your economy. It helps answer
            questions such as:
          </p>
          <TopList>
            <li>How much of {prefixedAreaName}'s economy is driven by meeting the local population needs?</li>
            <li>What proportion of jobs in the area are in goods production or selling of products?</li>
            <li>In which broad sectors are the key strengths of the local economy?</li>
            <li>What contribution do business services make in your area and is it growing?</li>
            <li>Is there a presence of local, state and federal government workers in in the area?</li>
          </TopList>
          <p>
            Once you have developed a broad picture of your economy, you can then drill down further with all the{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/size`, 'detail here')}.
          </p>
        </div>
      </PageIntroFullWidth>
      <ControlPanel />
      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>
      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
      <RelatedPagesCTA />
    </>
  );
};

export default IndustryCompositionPage;
// #endregion

// #region Source
const Source = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. Data are based on a 2016-17 price
      base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data
      releases adjust previous years’ figures to a new base year.
      {LinkBuilder(`http://economy.id.com.au/${clientAlias}/economic-model-updates`, 'Learn more')}.
    </p>
  );
};
const ChartSource = () => (
  <p>
    Source: <NierLink /> ©2019 Compiled and presented in economy.id by
    <IdLink />.
  </p>
);
// #endregion

// #region Chart builder
const chartBuilder = () => {
  const { contentData: nodes } = useContext(PageContext);
  const chartTitle = `Employment composition`;
  const chartType = 'column';
  const xAxisTitle = 'Broad industry type';
  const yAxisTitle = '% of total employment';
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts';
  const chartContainerID = 'grp-chart';
  const categories = _.map(nodes, 'LabelName');
  const noTotal = nodes.filter(node => node.LabelKey != 999999);
  const PerYear1 = noTotal.map(({ PerYear1 }) => PerYear1);
  const PerYear2 = noTotal.map(({ PerYear2 }) => PerYear2);
  const PerYear3 = noTotal.map(({ PerYear3 }) => PerYear3);
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category} ${
      this.series.name
    }: ${formatPercent(this.y)}% `;
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
          name: '2009',
          data: PerYear3,
        },
        {
          name: '2014',
          data: PerYear2,
        },
        {
          name: '2019',
          data: PerYear1,
        },
      ],
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
        },
      },
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

// #region tableBuilder
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName },
  } = useContext(PageContext);

  const rows = contentData
    .filter(item => item.LabelKey != 999999)
    .map(({ LabelKey, LabelName, NoYear1, PerYear1, NoYear2, PerYear2, NoYear3, PerYear3 }, i) => {
      const row = {
        data: [LabelName, NoYear1, PerYear1, NoYear2, PerYear2, NoYear3, PerYear3],
        formattedData: [
          LabelName,
          formatNumber(NoYear1),
          formatPercent(PerYear1),
          formatNumber(NoYear2),
          formatPercent(PerYear2),
          formatNumber(NoYear3),
          formatPercent(PerYear3),
        ],
        id: LabelKey,
      };
      return row;
    });
  const total = contentData.filter(item => item.LabelKey === 999999);
  const footerRow = total.map(({ LabelKey, LabelName, NoYear1, PerYear1, NoYear2, PerYear2, NoYear3, PerYear3 }, i) => {
    return {
      cssClass: 'total',
      id: LabelKey,
      cols: [
        { cssClass: '', displayText: `${LabelName}`, colSpan: 1 },
        { cssClass: '', displayText: formatNumber(NoYear1), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(PerYear1), colSpan: 1 },
        { cssClass: '', displayText: formatNumber(NoYear2), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(PerYear2), colSpan: 1 },
        { cssClass: '', displayText: formatNumber(NoYear3), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(PerYear3), colSpan: 1 },
      ],
    };
  });

  return {
    cssClass: '',
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias,
    source: <Source />,
    anchorName: 'industry-composition',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Employment composition',
            colSpan: 7,
          },
        ],
        key: 'hr0',
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentAreaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `2019`,
            colSpan: 2,
          },
          {
            cssClass: 'odd',
            displayText: `2014`,
            colSpan: 2,
          },
          {
            cssClass: 'even',
            displayText: `2009`,
            colSpan: 2,
          },
        ],
        key: 'hr1',
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Industry',
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: `$`,
        cssClass: 'even ',
      },
      {
        id: 2,
        displayText: `number`,
        cssClass: 'even',
      },

      {
        id: 3,
        displayText: `number`,
        cssClass: 'odd',
      },
      {
        id: 4,
        displayText: `%`,
        cssClass: 'odd',
      },

      {
        id: 5,
        displayText: `number`,
        cssClass: 'even ',
      },
      {
        id: 6,
        displayText: `%`,
        cssClass: 'even ',
      },
    ],
    footRows: footerRow,
    rows,
    noOfRowsOnInit: 0,
  };
};
// #endregion
