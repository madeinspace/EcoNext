// #region imports
import _ from 'lodash';
import { formatNumber, formatPercent, idlogo, formatChangeInt, absSort, getSerieByKey } from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  PageIntro,
  Highlight,
  AnalysisContainer,
  SourceBubble,
  ItemWrapper,
  Note,
} from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { ABSCensusHousingLink, IdLink, LinkBuilder } from '../../../components/ui/links';
import styled from 'styled-components';
import useEntityText from '../../../utils/useEntityText';
// #endregion

// #region autotext / dynamic content
const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;
const TopLevelQualifications = data => data.filter(qual => qual.LabelKey < 97000);
const HighestQualifications = (quals, sortKey) => _.sortBy(_.filter(quals, sortKey), sortKey);
const Top = n => quals =>
  _(quals)
    .takeRight(n)
    .reverse()
    .value();

const TopFour = Top(4);
const MajorDifferencesHeading = () => {
  const {
    filters: { Indkey },
    entityData: { currentBenchmarkName, prefixedAreaName, currentIndustryName },
  } = useContext(PageContext);
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;

  return (
    <Highlight>
      The major differences between the method of travel to work of the {industryText} resident workers in{' '}
      {prefixedAreaName} and the {currentBenchmarkName} workforce were:
    </Highlight>
  );
};

const MajorDifferences = () => {
  const { contentData } = useContext(PageContext);

  const majorDifferences = _.sortBy(contentData, qual => {
    const compare = [qual.PerYear1, qual.BMYear1];
    return _.max(compare) - _.min(compare);
  });
  const topFour = TopFour(majorDifferences);
  const transportText = qual => {
    let text = '';
    switch (qual.LabelKey) {
      case 2020:
        text = 'did not go to work';
        break;
      case 2018:
        text = 'walked only';
        break;
      case 2019:
        text = 'worked at home';
        break;
      default:
        text = `travelled by ${qual.LabelName.toLowerCase()}`;
    }
    return text;
  };

  return (
    <>
      <MajorDifferencesHeading />
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            A <em>{qual.PerYear1 > qual.BMYear1 ? 'larger' : 'smaller'}</em> percentage of resident workers who{' '}
            {transportText(qual)} ({formatPercent(qual.PerYear1)}% compared to {formatPercent(qual.BMYear1)}%)
          </li>
        ))}
      </TopList>
    </>
  );
};

const EmergingGroupsHeading = () => {
  const {
    filters: { Indkey },
    entityData: { currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);
  const industryText = +Indkey === 23000 ? '' : `${currentIndustryName}`;
  return (
    <Highlight>
      The largest changes in the method of travel to work of the {industryText} resident workers in {prefixedAreaName}{' '}
      between 2011 and 2016 were:
    </Highlight>
  );
};

const EmergingGroups = () => {
  const { contentData } = useContext(PageContext);
  const totalTravelling = contentData.filter(({ LabelKey }) => LabelKey != 2021);
  const topquals = TopLevelQualifications(totalTravelling);
  const highestQuals = HighestQualifications(topquals, 'Change12');
  const topFour = TopFour(absSort(highestQuals, 'Change12'));

  return (
    <>
      <TopList>
        {topFour.map((qual: any, i) => (
          <li key={i}>
            {qual.LabelName} ({formatChangeInt(qual.Change12)} resident workers)
          </li>
        ))}
      </TopList>
    </>
  );
};

const total = (arr, param) => arr.reduce((acc, curr) => acc + curr[param], 0);
// #endregion

// #region page
const ResidentWorkerMethodOfTravelToWorkPage = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    filters: { Indkey, IGBMID },
    entityData: { currentBenchmarkName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const industryText = +Indkey === 23000 ? '' : `of the ${currentIndustryName} resident workers`;
  const industryTextAlt = +Indkey === 23000 ? '' : `in ${currentIndustryName}`;
  const benchmarkText = IGBMID < 23000 ? currentBenchmarkName : ` ${currentBenchmarkName} within ${prefixedAreaName}`;
  const tableParams = tableBuilder();
  const chartData = chartBuilder();
  const chartChangeData = chartBuilderChange();

  const PublicTLabelKeys = [2003, 2007, 2011, 2012];
  const PrivateTLabelKeys = [2001, 2002, 2013, 2014];
  const publicTransport = data.filter(({ LabelKey }) => PublicTLabelKeys.includes(LabelKey));
  const privateTransport = data.filter(({ LabelKey }) => PrivateTLabelKeys.includes(LabelKey));

  const numberPublicTransportArea = formatNumber(total(publicTransport, 'NoYear1'));
  const percPublicTransportArea = formatPercent(total(publicTransport, 'PerYear1'));
  const percPrivateTransportArea = formatPercent(total(privateTransport, 'PerYear1'));
  const numberPrivateTransportArea = formatNumber(total(privateTransport, 'NoYear1'));
  const percPublicTransportBM = formatPercent(total(publicTransport, 'BMYear1'));
  const percPrivateTransportBM = formatPercent(total(privateTransport, 'BMYear1'));

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Maximising access to employment is a key objective in any economic development strategy. Understanding the
            modes of transport {prefixedAreaName}'s local resident workers use (either within or outside the local
            area), informs decision-makers about the effectiveness of transport modes, routes and availability of local
            public transport.
          </p>
          <p>There are a number of reasons why people use different Modes of Transport to get to work including:</p>
          <TopList>
            <li>
              The availability of affordable and effective public transport options between place of residence and place
              of work;
            </li>
            <li>The number of motor vehicles available within a household; and</li>
            <li>
              The travel distance to work, which for example, can allow people to walk or bicycle to their place of
              employment.
            </li>
          </TopList>
          <p>
            Method of Travel to Work data should be viewed in conjunction with{' '}
            {LinkBuilder(
              `http://economy.id.com.au/${clientAlias}/residents-place-of-work-industry`,
              `resident place of work`,
            )}{' '}
            for a clearer picture of where working residents are employed.
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
        <EntityTable data={tableParams} name={useEntityText('SubTitle')} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartChangeData} />
      </ItemWrapper>

      <AnalysisContainer>
        <h3>Dominant groups</h3>
        <p>
          In 2016, there were {numberPublicTransportArea} resident workers {industryTextAlt} who caught public transport
          to work (train, bus, tram or ferry) in {prefixedAreaName}, compared with {numberPrivateTransportArea} who
          drove in private vehicles (car – as driver, car – as passenger, motorbike, or truck).
        </p>
        <p>
          Analysis of the method of travel to work of the resident workers in {prefixedAreaName} shows that{' '}
          {percPublicTransportArea}% used public transport, while {percPrivateTransportArea}% used a private vehicle,
          compared with {percPublicTransportBM}% and {percPrivateTransportBM}% respectively in {benchmarkText}.
        </p>

        <MajorDifferences />
      </AnalysisContainer>
      <AnalysisContainer>
        <h3>Emerging groups</h3>
        <EmergingGroupsHeading />
        <EmergingGroups />
      </AnalysisContainer>
      <RelatedPagesCTA />
    </>
  );
};

export default ResidentWorkerMethodOfTravelToWorkPage;

// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics, <ABSCensusHousingLink /> 2011 and 2016. Compiled and presented by{' '}
    <IdLink />
  </p>
);

const ChartSource = () => (
  <p>
    Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id
    by <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentBenchmarkName, currentAreaName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Resident workers method of travel to work';
  const firstColTitle = `Main method of travel`;
  const rows = contentData
    .filter(node => node.LabelKey !== 999999)
    .map(row => ({
      id: row.LabelKey,
      data: [
        row.LabelName,
        row.NoYear1,
        row.PerYear1,
        row.BMYear1,
        row.NoYear2,
        row.PerYear2,
        row.BMYear2,
        row.Change12,
      ],
      formattedData: [
        `${row.LabelName}`,
        formatNumber(row.NoYear1),
        formatPercent(row.PerYear1),
        formatPercent(row.BMYear1),
        formatNumber(row.NoYear2),
        formatPercent(row.PerYear2),
        formatPercent(row.BMYear2),
        formatChangeInt(row.Change12, '--'),
      ],
    }));
  const total = contentData.filter(node => node.LabelKey === 999999);
  const totalGender = total.map(row => {
    return {
      cssClass: 'total',
      cols: [
        { cssClass: '', displayText: `Total `, colSpan: 1 },
        { cssClass: '', displayText: formatNumber(row.NoYear1), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(row.PerYear1), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(row.BMYear1), colSpan: 1 },
        { cssClass: '', displayText: formatNumber(row.NoYear2), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(row.PerYear2), colSpan: 1 },
        { cssClass: '', displayText: formatPercent(row.BMYear2), colSpan: 1 },
        {
          cssClass: '',
          displayText: formatChangeInt(row.Change12),
          colSpan: 1,
        },
      ],
    };
  });

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'resident-workers---method-of-travel-to-work',
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
        cssClass: 'heading ',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${currentAreaName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: ' 2016',
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: '2011',
            colSpan: 3,
          },
          {
            cssClass: 'sub even',
            displayText: 'Change',
            colSpan: 1,
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
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'even int L',
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
        displayText: `${currentBenchmarkName}%`,
        cssClass: 'odd int L',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int',
      },
    ],
    rows,
    footRows: totalGender,
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    contentData,
    filters: { IGBMID },
    entityData: { currentBenchmarkName, currentIndustryName, currentAreaName },
  } = useContext(PageContext);

  const parents = _.sortBy(
    contentData.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );

  const perYear1Serie = getSerieByKey(parents, 'PerYear1');
  const BMYear1Serie = getSerieByKey(parents, 'BMYear1');

  const chartType = 'bar';
  const chartTitle = `Resident workers method of travel to work, 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} `;
  const serieTitle = +IGBMID < 23000 ? `${currentAreaName}` : `${currentIndustryName}`;
  const xAxisTitle = 'Main method used';
  const yAxisTitle = `% of resident workers`;
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const rawDataSource = useEntityText('ChartRawDataSource');

  return {
    highchartOptions: {
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
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatPercent(
            this.y,
          )}%`;
        },
      },
      series: [
        {
          name: `${serieTitle}`,
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

// #region chart builder change
const chartBuilderChange = () => {
  const {
    contentData: data,
    entityData: { currentIndustryName, currentAreaName },
  } = useContext(PageContext);

  const parents = _.sortBy(
    data.filter(item => item.LabelKey != 999999),
    item => item.LabelKey,
  );

  const categories = parents.map(({ LabelName }) => LabelName);
  const chartType = 'bar';
  const chartTitle = `Change in resident workers method of travel to work, 2011 to 2016`;
  const chartSubtitle = `${currentAreaName} - ${currentIndustryName} `;
  const serie = getSerieByKey(parents, 'Change12');
  const xAxisTitle = 'Main method used';
  const yAxisTitle = `Change in resident workers`;
  const rawDataSource = useEntityText('ChartRawDataSource');
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${currentAreaName} - ${
      this.series.name
    }: ${formatChangeInt(this.y)}`;
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
        text: chartSubtitle,
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      series: [
        {
          name: `${currentIndustryName}`,
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
              return formatChangeInt(this.value);
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
