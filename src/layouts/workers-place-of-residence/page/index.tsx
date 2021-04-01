// #region imports
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper, PageIntro, SourceBubble, ItemWrapper } from '../../../styles/MainContentStyles';
import { PageContext, ClientContext } from '../../../utils/context';
import { LinkBuilder, IdLink } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
import EntityChart from '../../../components/chart/EntityChart';
import { formatPercent, idlogo, formatNumber } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import styled from 'styled-components';
import RelatedPagesCTA from '../../../components/RelatedPages';
const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion

const Split = styled.div`
  display: flex;
  ${ItemWrapper}:first-child {
    margin-right: 20px;
  }
  ${ItemWrapper} {
    width: 50%;
  }
`;

// #region template page
const WorkersPlaceOfResidencePage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { clientAlias } = useContext(ClientContext);
  const {
    contentData: { mapData },
    entityData: { currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const onMapLoaded = () => setMapLoaded(true);

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Journey to Work (workers) data shows where {prefixedAreaName}'s local workers come from and how far they are
            travelling to access employment in the area.
          </p>
          <p>
            This shows the degree to which the local economy draws on the wider region to supply labour for its
            industries, as well as in planning and advocacy for roads and public transport provision.
          </p>
          <p>
            The distance travelled by workers in different industry sectors may be influenced by the nature of
            employment opportunities (e.g. more specialist occupations may draw people from further afield); the number
            of jobs available in the industry sector; transport options available and commuting times to{' '}
            {prefixedAreaName}.
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
      <Split>
        <ItemWrapper>
          <EntityTable data={tableBuilder()} name={`Residential location of local workers - ${currentIndustryName}`} />
        </ItemWrapper>
        <ItemWrapper>
          <EntityChart
            data={chartBuilder()}
            name={`Residential location of local workers by LGA - ${currentIndustryName}`}
          />
        </ItemWrapper>
      </Split>

      <MapWrapper>
        <MapLoader loaded={mapLoaded} />
        <LeafletMap mapData={mapData} onMapLoaded={onMapLoaded} />
      </MapWrapper>
      <ItemWrapper>
        <EntityTable data={tableBuilderLGA()} />
      </ItemWrapper>
      <RelatedPagesCTA />
    </>
  );
};
export default WorkersPlaceOfResidencePage;
// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics, {LinkBuilder('http://www.abs.gov.au/census', 'Census of Population')} and
    Housing 2016. Compiled and presented in economy.id by <IdLink />
  </p>
);
const TableSourceAlt = () => (
  <p>
    Source: Australian Bureau of Statistics, {LinkBuilder('http://www.abs.gov.au/census', 'Census of Population')} and
    Housing 2016. Compiled and presented in economy.id by <IdLink /> Excludes residential locations with fewer than 10
    people.
  </p>
);

// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: { tableData },
    entityData: { currentIndustryName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id informed decisions.';
  const tableTitle = `Residential location of local workers`;

  const serie = tableData[0].map(({ LabelKey, LabelName, Number, Per }) => ({
    id: LabelKey,
    data: [LabelName, Number, Per],
    formattedData: [
      `${LabelKey === 1 || LabelKey === 2 ? '-  ' : ''}${LabelName}`,
      formatNumber(Number),
      formatPercent(Per),
    ],
  }));

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: '',
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
            displayText: `${LongName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: ' 2016',
            colSpan: 2,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Location',
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
    ],
    rows: serie,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region table builders
const tableBuilderLGA = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: { tableData },
    entityData: { currentIndustryName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id informed decisions.';
  const tableTitle = `Residential location of local workers by LGA`;

  const serie = tableData[1].map(({ LabelKey, GeoName, Number, Per }) => ({
    id: LabelKey,
    // cssClass: i === 0 ? 'highlight' : '',
    data: [GeoName, Number, Per],
    formattedData: [`${GeoName}`, formatNumber(Number), formatPercent(Per)],
  }));

  return {
    cssClass: '',
    clientAlias,
    source: <TableSourceAlt />,
    rawDataSource,
    anchorName: '',
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
            displayText: `${LongName}`,
            colSpan: 1,
          },
          {
            cssClass: 'even',
            displayText: ' 2016',
            colSpan: 2,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Location',
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'even XXL',
      },
      {
        id: 2,
        displayText: '%',
        cssClass: 'even XXL',
      },
    ],
    rows: serie,
    footRows: [],
    noOfRowsOnInit: 0,
  };
};
// #endregion

// #region chart builders
const chartBuilder = () => {
  const { LongName } = useContext(ClientContext);
  const {
    contentData: { tableData },
    entityData: { currentIndustryName },
  } = useContext(PageContext);

  const isRDA = tableData[0].some(({ LabelKey }) => LabelKey === 1 || LabelKey === 2);
  const noTotal = tableData[0].filter(({ LabelKey }) => LabelKey != 9);
  const final = isRDA ? noTotal.filter(({ LabelKey }) => LabelKey != 0) : noTotal;
  const serie = final.map(({ LabelName, Per }) => {
    return { name: LabelName, y: Per };
  });

  const chartType = 'pie';
  const chartTitle = `Residential location of local workers, 2016`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id informed decisions.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    rawDataSource,
    dataSource: <TableSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
    highchartOptions: {
      height: 300,
      chart: {
        type: chartType,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: `${LongName}`,
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="${this.className}">\u25CF</span> ${formatPercent(this.y)}%`;
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          data: serie,
          colorByPoint: true,
        },
      ],
      xAxis: {
        type: 'category',
        title: {
          text: '',
        },
      },
      legend: { enabled: true },
      yAxis: [
        {
          title: {
            text: '',
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
  };
};
// #endregion
