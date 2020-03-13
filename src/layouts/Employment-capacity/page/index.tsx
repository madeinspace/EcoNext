// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatChangeOneDecimal,
  formatShortDecimal,
  idlogo,
  formatPercent,
  formatChangeInt,
} from '../../../utils/';
import { ItemWrapper, SourceBubble, PageIntro, CrossLink, ProfileProductIcon } from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import { useContext } from 'react';
import { ClientContext, PageContext } from '../../../utils/context';
import { IdLink, LinkBuilder, NierLink } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import useEntityText from '../../../utils/useEntityText';
import EntityChart from '../../../components/chart/EntityChart';
import RelatedPagesCTA from '../../../components/RelatedPages';
// #endregion

// #region population page
const EmploymentCapacityPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const {
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);
  return (
    <>
      <PageIntro>
        <div>
          <p>
            A goal of economic development is often to maximise the employment opportunities locally, leading to a more
            socially and environmentally sustainable community.
          </p>
          <p>
            Employment capacity is a simple way of looking at whether {prefixedAreaName} could theoretically provide
            jobs for all its residents if they were to choose to work locally.
          </p>
          <p>
            Employment capacity is simply the number of local jobs in an industry, divided by the number of local
            residents employed (anywhere) in that industry. A figure over 1.0 means there are more jobs available than
            residents employed in that industry. Under 1.0 means there are more residents employed than jobs available
            in that sector.
          </p>
          <p>
            This is a theoretical exercise as, even if there are enough jobs provided locally, there will always be some
            people who choose to commute out of the area.
          </p>
          <p>
            Employment capacity data should be viewed in conjunction with{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/employed-locally`, 'Employment self-containment')} and{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/journey-to-work`, 'Residents place of work')} data,
            which provides detail about the actual proportion of residents working locally, and{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/gross-regional-product`, 'Gross Regional Product')}{' '}
            and{' '}
            {LinkBuilder(
              `http://economy.id.com.au/${clientAlias}/worker-productivity-by-industry`,
              'Worker productivity',
            )}{' '}
            data which shows the economic contribution of residents and workers.
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
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>
      {hasProfile() && (
        <CrossLink>
          <ProfileProductIcon />
          {LinkBuilder(
            `https://profile.id.com.au/${clientAlias}/industries`,
            `Residents employment by industry by small area`,
          )}
        </CrossLink>
      )}
      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartCapacityBuilder()} />
      </ItemWrapper>
      <RelatedPagesCTA />
    </>
  );
};

export default EmploymentCapacityPage;
// #endregion

// #region Source
const Source = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: <NierLink /> ©2019. Compiled and presented in economy.id by <IdLink />. Data are based on a 2016-17 price
      base for all years. NIEIR-ID data are adjusted each year, using updated employment estimates. Each release may
      change previous years’ figures.
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

// #region chartBuilder
const chartBuilder = () => {
  const { LongName } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentComparaisonYear, currentStartYear },
  } = useContext(PageContext);
  const parents = _.sortBy(
    data.filter(({ LabelKey, Hierarchy }) => Hierarchy === 'P' && LabelKey !== 999999),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });
  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.LJNoYear1,
      drilldown: `${item.LabelName}-peryear`,
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.ERYear1,
      drilldown: `${item.LabelName}-change`,
    };
  });
  const drilldownPerYear1Serie = _.map(parents, parent => {
    return {
      name: `Local jobs`,
      id: `${parent.LabelName}-peryear`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.LJNoYear1];
      }),
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `Employed residents`,
      id: `${parent.LabelName}-change`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.ERYear1];
      }),
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);

  const chartType = 'column';
  const chartTitle = `Employment capacity by industry ${currentStartYear}`;
  const chartSubtitle = `${LongName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Number employed`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const chartHeight = 500;

  return {
    highchartOptions: {
      height: chartHeight,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatNumber(
            this.y,
          )}`;
        },
      },
      series: [
        {
          name: `Local jobs`,
          data: perYear1Serie,
        },
        {
          name: `Employed residents`,
          data: BMYear1Serie,
        },
      ],
      drilldown: {
        allowPointDrilldown: false,
        activeAxisLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        activeDataLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        series: drilldownPerYear1Serie,
      },
      xAxis: {
        type: 'category',
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
              return `${this.value}`;
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
// #endregion

// #region chartCapacityBuilder
const chartCapacityBuilder = () => {
  const { LongName } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentComparaisonYear, currentStartYear },
  } = useContext(PageContext);
  const parents = _.sortBy(
    data.filter(({ LabelKey, Hierarchy }) => Hierarchy === 'P' && LabelKey !== 999999),
    item => item.LabelKey,
  );
  console.log('parents: ', parents);
  const children = data.filter(item => item.Hierarchy === 'C');
  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });
  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.LJtoERYear1,
      drilldown: `${item.LabelName}-peryear`,
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.LJtoERYear2,
      drilldown: `${item.LabelName}-change`,
    };
  });
  const drilldownPerYear1Serie = _.map(parents, parent => {
    return {
      name: `Local jobs`,
      id: `${parent.LabelName}-peryear`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.LJtoERYear1];
      }),
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `Employed residents`,
      id: `${parent.LabelName}-change`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.LJtoERYear2];
      }),
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);

  const chartType = 'column';
  const chartTitle = `Employment capacity by industry ${currentStartYear}`;
  const chartSubtitle = `${LongName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Ration of jobs to residents`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019 Compiled and presented in economy.id by .id the population experts.';
  const chartContainerID = 'chart2';
  const chartTemplate = 'Standard';
  const chartHeight = 500;

  return {
    highchartOptions: {
      height: chartHeight,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatShortDecimal(this.y)}`;
        },
      },
      series: [
        {
          name: `${currentStartYear}`,
          data: perYear1Serie,
        },
        {
          name: `${currentComparaisonYear}`,
          data: BMYear1Serie,
        },
      ],
      drilldown: {
        allowPointDrilldown: false,
        activeAxisLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        activeDataLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        series: drilldownPerYear1Serie,
      },
      xAxis: {
        type: 'category',
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
              return `${this.value}`;
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, currentComparaisonYear, prefixedAreaName, currentStartYear },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2019. Compiled and presented in economy.id by .id the population experts. Data are based on a 2016-17 price base for all years. NIEIR-ID data are inflation adjusted each year to allow direct comparison, and annual data releases adjust previous years’ figures to a new base year.';
  const tableTitle = 'Employment capacity by industry';
  const firstColTitle = 'Industry';
  const footerRows = data.filter(({ LabelKey }) => LabelKey === 999999);

  const parents = _.sortBy(
    data.filter(({ LabelKey, Hierarchy }) => Hierarchy === 'P' && LabelKey != 999999),
    item => item.LabelKey,
  );
  const children = data.filter(item => item.Hierarchy === 'C');

  parents.forEach(parent => {
    parent.children = children.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 100,
    );
  });

  return {
    cssClass: '',
    clientAlias: currentAreaName,
    source: <Source />,
    rawDataSource,
    anchorName: 'jobs-to-workers-ratio',
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
            cssClass: 'sub first',
            displayText: `${currentAreaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: `${currentStartYear}`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `${currentComparaisonYear}`,
            colSpan: 3,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: firstColTitle,
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: 'Local jobs',
        cssClass: 'even L',
      },
      {
        id: 2,
        displayText: 'Employed residents',
        cssClass: 'even L',
      },
      {
        id: 3,
        displayText: `Ratio of jobs to residents`,
        cssClass: 'even L',
      },
      {
        id: 4,
        displayText: 'Local jobs',
        cssClass: 'odd L',
      },
      {
        id: 5,
        displayText: 'Employed residents',
        cssClass: 'odd L',
      },
      {
        id: 6,
        displayText: `Ratio of jobs to residents`,
        cssClass: 'odd L',
      },
    ],
    rows: parents.map(row => ({
      expandable: row.children.length > 0,
      id: row.LabelKey,
      data: [row.LabelName, row.LJNoYear1, row.ERYear1, row.LJtoERYear1, row.LJNoYear2, row.ERYear2, row.LJtoERYear2],
      formattedData: [
        `${row.LabelName}`,
        formatNumber(row.LJNoYear1),
        formatNumber(row.ERYear1),
        formatPercent(row.LJtoERYear1),
        formatNumber(row.LJNoYear2),
        formatNumber(row.ERYear2),
        formatPercent(row.LJtoERYear2),
      ],
      childRows: row.children.map(childRow => ({
        id: childRow.LabelKey,
        data: [
          childRow.LabelName,
          childRow.LJNoYear1,
          childRow.ERYear1,
          childRow.LJtoERYear1,
          childRow.LJNoYear2,
          childRow.ERYear2,
          childRow.LJtoERYear2,
        ],
        formattedData: [
          `${childRow.LabelName}`,
          formatNumber(childRow.LJNoYear1),
          formatNumber(childRow.ERYear1),
          formatPercent(childRow.LJtoERYear1),
          formatNumber(childRow.LJNoYear2),
          formatNumber(childRow.ERYear2),
          formatPercent(childRow.LJtoERYear2),
        ],
      })),
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: 'total',
        cols: [
          { cssClass: '', displayText: `Total industries`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.LJNoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.ERYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.LJtoERYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.LJNoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.ERYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(row.LJtoERYear2), colSpan: 1 },
        ],
      };
    }),
    noOfRowsOnInit: 0,
  };
};
// #endregion
