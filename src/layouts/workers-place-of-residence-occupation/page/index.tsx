// #region imports
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper } from '../../../styles/MainContentStyles';
import { PageContext } from '../../../utils/context';

const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion

// #region template page
const WorkersPlaceOfResidenceOccupationPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    contentData: { mapData },
  } = useContext(PageContext);

  const onMapLoaded = () => setMapLoaded(true);

  return (
    <>
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
