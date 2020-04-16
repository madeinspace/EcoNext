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
import { formatPercent, idlogo } from '../../../utils';

const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion

// #region template page
const WorkersPlaceOfResidenceOccupationPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { clientAlias, LongName } = useContext(ClientContext);

  const {
    contentData: { mapData },
    entityData: { currentOccupationName, prefixedAreaName },
  } = useContext(PageContext);

  console.log('mapData: ', mapData);
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
            industries. It is also useful in planning and advocacy for roads and public transport provision.
          </p>
          <p>
            The distance and direction travelled by workers in different broad occupations is generally influenced by a
            few factors. These primarily include the type and skill level of jobs located within the local area, and the
            residential location where those skills are available in the population. The pay level of particular
            occupations is also a factor, as people will travel further for a high-paying job.
          </p>
          <p>
            Understanding how far people travel to access particular occupation categories in the area can help in
            developing programs for equity in the jobs market, and having affordable housing available for workers of
            all skill levels.
          </p>
          <p>
            Workers place of residence data should be viewed alongside Self-sufficiency and Jobs to workers ratio
            datasets for a summary of local employment opportunity by industry, as well as modelled Employment by
            industry (Total) numbers and Employment locations to understand the relative size of each industry sector
            and its distribution across the the City of Monash. To analyse the characteristics of local workers in each
            industry, go to the Local workers section.
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
      <MapWrapper>
        <MapLoader loaded={mapLoaded} />
        <LeafletMap mapData={mapData} onMapLoaded={onMapLoaded} />
      </MapWrapper>
      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>
      <p>
        NOTE: The land use shown in the map is derived from ABS Mesh Block categories. Mesh Blocks broadly identify land
        use and are not designed to provide definitive land use. It is purely an indicator of the main planned land use
        for a Mesh Blocks. For more information please refer to ABS Mesh Block categories.
      </p>
    </>
  );
};
export default WorkersPlaceOfResidenceOccupationPage;
// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics, 2011 and 2016. Compiled and presented by <IdLink />
  </p>
);

// #endregion

// #region chart builders
const chartBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: { mapData },
    entityData: { currentOccupationName, prefixedAreaName },
  } = useContext(PageContext);

  const rawData = mapData.layers.find(l => l.id === 7).shapes.map(({ shapeOptions }) => shapeOptions);
  const monash = rawData.filter(area => +area.GeoID === 24970)[0];
  const monashTotal = monash.RealPercentage;
  console.log('monashTotal: ', monashTotal);
  const rest = rawData.filter(area => +area.GeoID != 24970);
  const restTotal = rest.reduce((acc, cur) => {
    return acc + cur.RealPercentage;
  }, 0);
  console.log('rest: ', rest);
  // { name: LabelName, y: PerYear1, className: LabelName.match(/^[^\/ ]+/i) };
  const serie = [
    { name: 'Live and work in the area', y: monashTotal },
    { name: 'Work in the area but live outside', y: restTotal },
  ];
  console.log('serie: ', serie);

  const chartType = 'pie';
  const chartTitle = `Residential location of local workers, 2016`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    rawDataSource,
    dataSource: <TableSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
    highchartOptions: {
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
        text: `${LongName} - ${currentOccupationName}`,
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
            enabled: true,
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
      legend: { enabled: false },
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
