// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, formatOneDecimal, multiplesOf } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import { PageIntro, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import styled from 'styled-components';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region page
const ValueOfAgriculturePage = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <>
      <PageIntro>
        <div>
          <p>
            Agricultural production is a very important contributor to Australia's economy, and is a key industry in
            many rural and regional areas, as well as some outer metropolitan areas.
          </p>
          <p>
            The data presented here are sourced from the 2015-16 Agricultural Census, run by the Australian Bureau of
            Statistics. The data show the gross value of agricultural commodities in broad categories, measured across
            two Agricultural Census periods.
          </p>
          <p>
            Agriculture value data should be viewed in conjunction with the{' '}
            {LinkBuilder(
              `http://economy.id.com.au/${clientAlias}/industry-sector-analysis`,
              `Industry Sector Analysis`,
            )}{' '}
            page for the Agriculture sector, which has modelled estimates of the size of the industry on an annual
            basis. The
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/employment-locationss`, `Employment Locations`)} page
            will show where agricultural activity is taking place and the{' '}
            {LinkBuilder(`http://economy.id.com.au/${clientAlias}/workers-key-statistics`, `Workforce Profiles`)}{' '}
            section will reveal the characteristics of agricultural workers.
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
      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a data row in the table you will be able to see sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
      </ItemWrapper>

      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a category in the chart below you will be able to drilldown to
          the sub categories.
        </span>
      </InfoBox>

      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>

      <RelatedPagesCTA />
    </>
  );
};

export default ValueOfAgriculturePage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics,{' '}
    {LinkBuilder(`https://www.abs.gov.au/ausstats/abs@.nsf/mf/7503.0`, 'Value of Agricultural Commodities Produced')},
    Australia, 2015-16. Cat. No. 7503.0
  </p>
);

const ChartSource = () => (
  <p>
    Source: Australian Bureau of Statistics, Value of Agricultural Commodities Produced, Australia, 2015-16. Cat. No.
    7503.0
  </p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentAreaName, currentBenchmarkName, currentGenderName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Value of Agricultural Commodities Produced, Australia, 2015-16. Cat. No. 7503.0';
  const tableTitle = 'Value of agricultural production';
  const firstColTitle = 'Commodity (Click rows to view sub-categories)';
  const tableSubtitle = `${currentAreaName}`;

  const total = contentData.filter(({ LabelKey }) => LabelKey === 90000);
  const withoutTotal = contentData.filter(({ LabelKey }) => LabelKey != 90000);
  const parents = multiplesOf(withoutTotal, 1000).sort((a, b) => (a.LabelName > b.LabelName ? 1 : -1));
  parents.forEach(parent => {
    parent.children = withoutTotal.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 1000,
    );
  });
  console.log('parents: ', parents);

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'value-of-agricultural-commodities-produced',
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
            displayText: `${tableSubtitle}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: ' 2015/16',
            colSpan: 4,
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
        displayText: '$',
        cssClass: 'even int XXXXL',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even int XXXL',
      },
      {
        id: 3,
        displayText: `${currentBenchmarkName} %`,
        cssClass: 'even int XXXL',
      },
      {
        id: 4,
        displayText: `${currentAreaName}as a % of ${currentBenchmarkName}`,
        cssClass: 'odd int XXXXL',
      },
    ],
    rows: parents.map(({ children, LabelKey, LabelName, NoYear1, PerYear1, BMYear1, LGAPerBm1 }) => ({
      expandable: children.length > 0,
      id: LabelKey,
      data: [LabelName, NoYear1, PerYear1, BMYear1],
      formattedData: [
        `${LabelName}`,
        formatNumber(NoYear1),
        formatPercent(PerYear1, '--'),
        formatPercent(BMYear1, '--'),
        formatPercent(LGAPerBm1, '--'),
      ],
      childRows: children.map(({ LabelKey, LabelName, NoYear1, PerYear1, BMYear1, LGAPerBm1 }) => ({
        id: LabelKey,
        data: [LabelName, NoYear1, PerYear1, BMYear1],
        formattedData: [
          `${LabelName}`,
          formatNumber(NoYear1),
          formatPercent(PerYear1, '--'),
          formatPercent(BMYear1, '--'),
          formatPercent(LGAPerBm1, '--'),
        ],
      })),
    })),
    footRows: total.map(({ NoYear1, PerYear1, BMYear1, LGAPerBm1 }) => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Agriculture - Total Value`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(PerYear1, '--'), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(BMYear1, '--'), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(LGAPerBm1, '--'), colSpan: 1 },
        ],
      };
    }),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    filters: { IGBMID },
    contentData,
    entityData: { currentAreaName, currentBenchmarkName, currentIndustryName, currentGenderName },
  } = useContext(PageContext);
  const withoutTotal = contentData.filter(({ LabelKey }) => LabelKey != 90000);
  const parents = multiplesOf(withoutTotal, 1000).sort((a, b) => (a.LabelName > b.LabelName ? 1 : -1));
  parents.forEach(parent => {
    parent.children = withoutTotal.filter(
      child => child.LabelKey > parent.LabelKey && child.LabelKey < parent.LabelKey + 1000,
    );
  });

  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
      drilldown: `${item.LabelName}-peryear`,
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.BMYear1,
      drilldown: `${item.LabelName}-change`,
    };
  });
  const drilldownPerYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentAreaName}`,
      id: `${parent.LabelName}-peryear`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.PerYear1];
      }),
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentBenchmarkName}`,
      id: `${parent.LabelName}-change`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.BMYear1];
      }),
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);
  const chartType = 'bar';
  const chartTitle = `Value of agricultural production 2015/16`;
  const xAxisTitle = 'Commodity type';
  const yAxisTitle = `% total production`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id the population experts.';
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
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
            this.series.name
          }: ${formatOneDecimal(this.y)}%`;
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
              return `${this.value}%`;
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
