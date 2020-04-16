// #region imports
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper, PageIntro, SourceBubble } from '../../../styles/MainContentStyles';
import { PageContext, ClientContext } from '../../../utils/context';
import { LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';

const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion

// #region template page
const WorkersPlaceOfResidenceOccupationPage = () => {
  console.log('WorkersPlaceOfResidenceOccupationPage');
  const [mapLoaded, setMapLoaded] = useState(false);
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData,
    entityData: { currentGenderName, currentAreaName, currentBenchmarkName, currentIndustryName, prefixedAreaName },
  } = useContext(PageContext);

  const {
    contentData: { mapData },
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
      {/* <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper> */}
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
