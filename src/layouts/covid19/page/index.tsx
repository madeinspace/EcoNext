// #region imports
import _ from 'lodash';
import { useContext, useState } from 'react';
import { PageContext } from '../../../utils/context';
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
const CovidPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    contentData: { statsData, newsData, mapData },
  } = useContext(PageContext);

  const onMapLoaded = () => setMapLoaded(true);

  return (
    <>
      <SectionTitle>News</SectionTitle>
      <NewsGrid tiles={newsData} />
    </>
  );
};
export default CovidPage;
// #endregion
