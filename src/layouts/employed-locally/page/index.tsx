// #region imports
import _ from 'lodash';
import {
  formatNumber,
  formatShortDecimal,
  formatPercent,
  idlogo,
  getParameterByName,
  formatChangeOneDecimal,
} from '../../../utils/';
import EntityTable from '../../../components/table/EntityTable';
import React, { useContext, useEffect, useState } from 'react';
import EntityChart from '../../../components/chart/EntityChart';
import {
  PageIntro,
  SourceBubble,
  ItemWrapper,
  Headline,
  Note,
  CrossLink,
  ProfileProductIcon,
} from '../../../styles/MainContentStyles';
import RelatedPagesCTA from '../../../components/RelatedPages';
import { ClientContext, PageContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import styled from 'styled-components';
import useEntityText from '../../../utils/useEntityText';
import qs from 'qs';

// #endregion

// #region autotext / dynamic content

const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;

// #endregion
const Tabs = styled.ul`
  display: flex;
  border-bottom: 1px solid #d7dbdd;
`;
const Tab = styled.li`
  cursor: pointer;
  padding: 15px 40px;
  font-size: 16px;
  color: ${props => (props.Pane === props.id ? 'white' : '#5f6062')};
  background-color: ${props => (props.Pane === props.id ? '#70b859' : '#e0e0e0')};
  &:hover {
    background-color: #70b859;
    color: #fff;
  }
`;
// #region page
const EmployedLocallyPage = () => {
  const { clientAlias, clientProducts, LongName } = useContext(ClientContext);
  const {
    handle,
    contentData,
    entityData: { prefixedAreaName },
  } = useContext(PageContext);
  const [Pane, setPane] = useState(1);

  useEffect(() => {
    const tabNumber = getParameterByName('t');
    tabNumber && setPane(+tabNumber);
  });

  const handleTabChange = (key, value) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query[key] = value;
    const stringiifiedQuery = qs.stringify(query);
    const href = `/${clientAlias}/${handle}?${stringiifiedQuery}`;
    window.history.replaceState(query, '', href);
    setPane(value);
  };

  const hasProfile = () => _.some(clientProducts, product => product.AppID === 1);
  const ProfileCrossLink = () => {
    return (
      hasProfile && (
        <CrossLink>
          <ProfileProductIcon />
          <a
            href={`http://profile.id.com.au/${clientAlias}/industries`}
            target="_blank"
            rel="noopener"
            title="link to forecast"
          >
            Residents employment by industry by small area
          </a>
        </CrossLink>
      )
    );
  };
  const total = contentData[0].data.filter(({ LabelKey }) => LabelKey === 99999)[0];
  const headingIndustry = `In 2016, ${formatPercent(
    total.SelContper1,
  )}% of ${prefixedAreaName}’s resident workers were employed locally.`;
  return (
    <>
      <Headline>{headingIndustry}</Headline>
      <PageIntro>
        <div>
          <p>
            Self-containment measures the proportion of resident workers who are employed within the boundaries of the
            Local Government Area or region. It indicates the propensity of residents to seek employment outside the
            Local Government Area or region in which they live.
          </p>
          <p>
            Self containment is likely to be higher for regional areas and, lower in metropolitan areas and is
            influenced by:
          </p>
          <TopList>
            <li>The nature of employment opportunities versus the skills and qualifications of residents;</li>
            <li>Transport options available and commuting times;</li>
            <li>Relationship between wages and salaries and house prices in the area; and</li>
            <li>The geographic size of the area.</li>
          </TopList>
          <p>
            Employment self-containment data should be viewed in conjunction with detailed{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/journey-to-work`, 'Residents place of work')}
            data to see where resident workers are accessing employment, along with{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/Employment-capacity`, 'Jobs to workers')} ratio data
            which provides the theoretical number of jobs which could be provided to residents of {prefixedAreaName} in
            the local area, and is updated annually. The{' '}
            {LinkBuilder(`https://economy.id.com.au/${clientAlias}/labourforce-key-statistics`, 'Resident workers')}{' '}
            section will provide the characteristics of resident workers.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>{useEntityText('DataSource')}</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <Note>
        <strong>Please note: </strong> The 2016 Census used a new methodology to "impute" a work location to people who
        didn’t state their workplace address. As a result, 2016 and 2011 place of work data are not normally comparable.
        To allow comparison between 2011 and 2016, .id has sourced a 2011 dataset from the ABS which was experimentally
        imputed using the same methodology. To provide this detail, {LongName} in 2011 had to be constructed from a best
        fit of Work Destination Zones (DZNs). While it may not be an exact match to the LGA or region boundary, it is
        considered close enough to allow some comparison. Users should treat this time series data with caution,
        however, and not compare directly with 2011 data from any other source.
      </Note>

      <ControlPanel />
      <Tabs>
        <Tab Pane={Pane} id={1} onClick={() => handleTabChange('t', 1)}>
          Industry
        </Tab>
        <Tab Pane={Pane} id={2} onClick={() => handleTabChange('t', 2)}>
          Occupations
        </Tab>
      </Tabs>

      {Pane === 1 && (
        <>
          <ItemWrapper>
            <EntityTable data={tableBuilder()} name={useEntityText('SubTitle')} />
          </ItemWrapper>
          <ProfileCrossLink />

          <ItemWrapper>
            <EntityChart data={chartBuilder()} />
          </ItemWrapper>

          <ItemWrapper>
            <EntityChart data={chartBuilderChange()} />
          </ItemWrapper>
        </>
      )}
      {Pane === 2 && (
        <>
          <ItemWrapper>
            <EntityTable data={tableBuilder2()} name={'occupation'} />
          </ItemWrapper>

          <ProfileCrossLink />

          <ItemWrapper>
            <EntityChart data={chartBuilderOccupation()} />
          </ItemWrapper>

          <ItemWrapper>
            <EntityChart data={chartBuilderOccupationChange()} />
          </ItemWrapper>
        </>
      )}

      <RelatedPagesCTA />
    </>
  );
};

export default EmployedLocallyPage;

// #endregion

// #region sources
const TableSource = () => {
  const { clientAlias } = useContext(ClientContext);
  return (
    <p>
      Source: {LinkBuilder(`https://www.abs.gov.au/census`, `Australian Bureau of Statistics`)}, Census of Population
      and Housing 2011 and 2016 Compiled and presented in economy.id by <IdLink />.
    </p>
  );
};
const ChartSource = () => <p>Source: Australian Bureau of Statistics, Census of Population and Housing 2016.</p>;
const ChartSourceChange = () => (
  <p>Source: Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016.</p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, prefixedAreaName, currentTypeName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016 Compiled and presented in economy.id by .id , the population experts.';
  const tableTitle = `Employment self-containment by ${currentTypeName}`;
  const firstColTitle = 'Industry';
  const footerRows = data[0].data.filter(({ LabelKey }) => LabelKey === 99999);
  const parents = data[0].data.filter(({ LabelKey }) => LabelKey != 99999);

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'self-containment---industry',
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
            displayText: `2016`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `2011`,
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
        displayText: 'Total resident workers',
        cssClass: 'even int M',
      },
      {
        id: 2,
        displayText: `Resident workers residing in ${prefixedAreaName}%`,
        cssClass: 'even int M',
      },
      {
        id: 3,
        displayText: `% resident workers employed in ${prefixedAreaName}`,
        cssClass: 'even int ',
      },
      {
        id: 4,
        displayText: 'Total resident workers',
        cssClass: 'odd int M',
      },
      {
        id: 5,
        displayText: `Resident workers residing in ${prefixedAreaName}%`,
        cssClass: 'odd int M',
      },
      {
        id: 6,
        displayText: `% resident workers employed in ${prefixedAreaName}`,
        cssClass: 'odd int ',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int XS',
      },
    ],
    rows: parents.map(
      ({ LabelKey, LabelName, TotalYear1, ResYear1, SelContper1, TotalYear2, ResYear2, SelContper2, Change12 }) => ({
        id: LabelKey,
        data: [LabelName, TotalYear1, ResYear1, SelContper1, TotalYear2, ResYear2, SelContper2, Change12],
        formattedData: [
          `${LabelName}`,
          formatNumber(TotalYear1),
          formatNumber(ResYear1),
          formatPercent(SelContper1),
          formatNumber(TotalYear2),
          formatNumber(ResYear2),
          formatPercent(SelContper2),
          `${formatChangeOneDecimal(Change12, '--')}%`,
        ],
      }),
    ),
    footRows: footerRows.map(({ TotalYear1, ResYear1, SelContper1, TotalYear2, ResYear2, SelContper2, Change12 }) => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total Industries`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(TotalYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(ResYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(SelContper1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(TotalYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(ResYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(SelContper2), colSpan: 1 },
          { cssClass: '', displayText: `${formatChangeOneDecimal(Change12)}%`, colSpan: 1 },
        ],
      };
    }),
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region table builders
const tableBuilder2 = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: data,
    entityData: { currentAreaName, prefixedAreaName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.';
  const tableTitle = 'Employment self-containment by occupation';
  const firstColTitle = 'Occupation';
  const footerRows = data[1].data.filter(({ LabelKey }) => LabelKey === 99999);

  const parents = data[1].data.filter(({ LabelKey }) => LabelKey != 99999);

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: 'self-containment---occupation',
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
            displayText: `2016`,
            colSpan: 3,
          },
          {
            cssClass: 'odd',
            displayText: `2011`,
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
        displayText: 'Total local workers',
        cssClass: 'even int M',
      },
      {
        id: 2,
        displayText: `Resident workers employed in ${prefixedAreaName}%`,
        cssClass: 'even int M',
      },
      {
        id: 3,
        displayText: `% resident workers employed in ${prefixedAreaName}`,
        cssClass: 'even int M',
      },
      {
        id: 4,
        displayText: 'Total local workers',
        cssClass: 'odd int M',
      },
      {
        id: 5,
        displayText: `Resident workers employed in ${prefixedAreaName}%`,
        cssClass: 'odd int M',
      },
      {
        id: 6,
        displayText: `% resident workers employed in ${prefixedAreaName}`,
        cssClass: 'odd int M',
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        cssClass: 'even int',
      },
    ],
    rows: parents.map(
      ({ LabelKey, LabelName, TotalYear1, ResYear1, SelContper1, TotalYear2, ResYear2, SelContper2, Change12 }) => ({
        id: LabelKey,
        data: [LabelName, TotalYear1, ResYear1, SelContper1, TotalYear2, ResYear2, SelContper2, Change12],
        formattedData: [
          `${LabelName}`,
          formatNumber(TotalYear1),
          formatNumber(ResYear1),
          formatPercent(SelContper1),
          formatNumber(TotalYear2),
          formatNumber(ResYear2),
          formatPercent(SelContper2),
          `${formatChangeOneDecimal(Change12, '--')}%`,
        ],
      }),
    ),
    footRows: footerRows.map(({ TotalYear1, ResYear1, SelContper1, TotalYear2, ResYear2, SelContper2, Change12 }) => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total Occupation`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(TotalYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(ResYear1), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(SelContper1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(TotalYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(ResYear2), colSpan: 1 },
          { cssClass: '', displayText: formatPercent(SelContper2), colSpan: 1 },
          { cssClass: '', displayText: `${formatChangeOneDecimal(Change12)}%`, colSpan: 1 },
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
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const parents = data[0].data.filter(({ LabelKey }) => LabelKey !== 99999 && LabelKey != 23020);
  const totalLocalWorkers = parents.map(({ TotalYear1 }) => TotalYear1);
  const workersResigingLocally = parents.map(({ ResYear1 }) => ResYear1);
  const industrySelfcontainment = parents.map(({ SelContper1 }) => SelContper1);
  const categories = parents.map(({ LabelName }) => LabelName);
  const chartType = 'column';
  const chartTitle = `Employment self-containment by industry 2016`;
  const chartSubtitle = `${currentAreaName}`;
  const rawDataSource = 'Source: Australian Bureau of Statistics, Census of Population and Housing 2016.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${
      this.series.name
    }: ${formatNumber(this.y)}`;
  };
  const tooltipScatter = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${
      this.series.name
    }: ${formatPercent(this.y)}%`;
  };
  return {
    highchartOptions: {
      height: 500,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      legend: {
        enabled: true,
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
          name: 'Total local workers',
          type: 'column',
          yAxis: 1,
          data: totalLocalWorkers,
          tooltip: {
            headerFormat: '',
            pointFormatter: function() {
              return tooltip.apply(this);
            },
          },
        },
        {
          name: 'Local workers residing locally',
          type: 'column',
          yAxis: 1,
          data: workersResigingLocally,
          tooltip: {
            headerFormat: '',
            pointFormatter: function() {
              return tooltip.apply(this);
            },
          },
        },
        {
          name: '% of industry self-containment ',
          type: 'scatter',
          className: 'scatt',
          data: industrySelfcontainment,
          tooltip: {
            headerFormat: '',
            pointFormatter: function() {
              return tooltipScatter.apply(this);
            },
          },
          marker: {
            radius: 4,
          },
        },
      ],
      xAxis: [
        {
          categories: categories,
          crosshair: true,
        },
      ],
      yAxis: [
        {
          // Secondary yAxis
          title: {
            text: '% of industry self-containment',
          },
          labels: {
            format: '{value}%',
          },
          opposite: true,
        },
        {
          // Primary yAxis
          labels: {
            formatter: function() {
              return formatNumber(this.value);
            },
          },
          title: {
            text: 'Number employed',
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
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const parents = data[0].data.filter(({ LabelKey }) => LabelKey !== 99999 && LabelKey != 23020 && LabelKey != 24090);
  const change = parents.map(({ TotalYear1 }) => TotalYear1);
  const categories = _.map(parents, 'LabelName');
  const chartType = 'column';
  const chartTitle = 'Change in self-containment percentage by industry, 2011 to 2016';
  const chartSubtitle = `${currentAreaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `% employed`;
  const rawDataSource = 'Source: Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${currentAreaName} - ${
      this.series.name
    }: ${formatChangeOneDecimal(this.y)}%`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      height: 500,
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
          name: `${currentAreaName}`,
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
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSourceChange />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};

// #endregion

// #region chart builders
const chartBuilderOccupation = () => {
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const parents = data[1].data.filter(({ LabelKey }) => LabelKey !== 99999 && LabelKey != 24090);
  const totalLocalWorkers = parents.map(({ TotalYear1 }) => TotalYear1);
  const workersResigingLocally = parents.map(({ ResYear1 }) => ResYear1);
  const industrySelfcontainment = parents.map(({ SelContper1 }) => SelContper1);
  const categories = parents.map(({ LabelName }) => LabelName);
  const chartType = 'column';
  const chartTitle = `Employment self-containment by occupation 2016`;
  const chartSubtitle = `${currentAreaName}`;
  const rawDataSource = 'Source: Australian Bureau of Statistics, Census of Population and Housing 2016.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';
  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${
      this.series.name
    }: ${formatNumber(this.y)}`;
  };
  const tooltipScatter = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${
      this.series.name
    }: ${formatPercent(this.y)}%`;
  };
  return {
    highchartOptions: {
      height: 500,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      legend: {
        enabled: true,
      },

      series: [
        {
          name: 'Total local workers',
          type: 'column',
          yAxis: 1,
          data: totalLocalWorkers,
          tooltip: {
            headerFormat: '',
            pointFormatter: function() {
              return tooltip.apply(this);
            },
          },
        },
        {
          name: 'Local workers residing locally',
          type: 'column',
          yAxis: 1,
          data: workersResigingLocally,
          tooltip: {
            headerFormat: '',
            pointFormatter: function() {
              return tooltip.apply(this);
            },
          },
        },
        {
          name: '% of industry self-containment ',
          type: 'scatter',
          className: 'scatt',
          data: industrySelfcontainment,
          tooltip: {
            headerFormat: '',
            pointFormatter: function() {
              return tooltipScatter.apply(this);
            },
          },
          marker: {
            radius: 4,
          },
        },
      ],
      xAxis: [
        {
          categories: categories,
          crosshair: true,
        },
      ],
      yAxis: [
        {
          title: {
            text: 'industry self-containment %',
          },
          labels: {
            format: '{value}%',
          },
          opposite: true,
        },
        {
          labels: {
            formatter: function() {
              return formatNumber(this.value);
            },
          },
          title: {
            text: 'NUmber employed',
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
const chartBuilderOccupationChange = () => {
  const {
    contentData: data,
    entityData: { currentAreaName },
  } = useContext(PageContext);
  const parents = data[1].data.filter(({ LabelKey }) => LabelKey !== 99999 && LabelKey != 23020 && LabelKey != 24090);
  const categories = _.map(parents, 'LabelName');
  const chartType = 'column';
  const chartTitle = 'Change in self-containment percentage by occupation, 2011 to 2016';
  const chartSubtitle = `${currentAreaName}`;
  const serie = _.map(parents, 'Change12');
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `% employed`;
  const rawDataSource = 'Source: Australian Bureau of Statistics, Census of Population and Housing 2011 and 2016.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.category}, ${
      this.series.name
    }: ${formatChangeOneDecimal(this.y)}%`;
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
          name: `${currentAreaName}`,
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
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSourceChange />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};

// #endregion
