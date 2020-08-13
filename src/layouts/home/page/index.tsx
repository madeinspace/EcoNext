// #region imports
import { useContext, useState } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import { StatsGrid } from './StatsGrid';
import { NewsGrid } from './NewsGrid';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper } from '../../../styles/MainContentStyles';
const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion
const SectionTitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  margin: 20px 0;
`;
// #region template page
const HomeTemplate = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    contentData: { statsData, newsData, mapData },
  } = useContext(PageContext);

  const { LongName } = useContext(ClientContext);

  const onMapLoaded = () => setMapLoaded(true);

  return (
    <>
      <SectionTitle>Key Statistics</SectionTitle>
      <StatsGrid tiles={statsData} />
      {mapData && (
        <>
          <SectionTitle>Economic Region</SectionTitle>
          <MapWrapper>
            <MapLoader loaded={mapLoaded} />
            <LeafletMap mapTitle={`${LongName} - Economic region`} mapData={mapData} onMapLoaded={onMapLoaded} />
          </MapWrapper>
        </>
      )}
      <SectionTitle>News</SectionTitle>
      <NewsGrid tiles={newsData} />
    </>
  );
};
export default HomeTemplate;
// #endregion
