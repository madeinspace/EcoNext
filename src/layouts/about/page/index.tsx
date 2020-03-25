// #region imports
import { useContext, useState, useEffect } from 'react';
import { PageContext } from '../../../utils/context';
import { StatsGrid } from './StatsGrid';
import { NewsGrid } from './NewsGrid';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper, SubTitleAlt } from '../../../styles/MainContentStyles';
import _ from 'lodash';
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
const AboutPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    contentData: { statsData, mapData, textData },
  } = useContext(PageContext);

  const onMapLoaded = () => setMapLoaded(true);
  const data = { ...textData[0] };
  delete data['ClientID'];
  delete data['WebID'];
  delete data['LabelKey'];
  delete data['LabelName'];
  delete data['GeoName'];
  const textArray = Object.keys(data).map(key => ({
    key,
    title: key.replace(/([a-z])([A-Z])/g, `$1 $2`),
    displayText: data[key],
  }));

  return (
    <>
      <SectionTitle>Key Statistics</SectionTitle>
      <StatsGrid tiles={statsData} />
      {textArray.map(({ title, displayText, key }) => {
        return (
          displayText != '' && (
            <div>
              <SubTitleAlt>{title}</SubTitleAlt>
              {displayText.replace(/(<([^>]+)>)/gi, '')}
              {key === 'IncludedAreas' && (
                <>
                  <SubTitleAlt>Economic Region</SubTitleAlt>
                  <MapWrapper>
                    <MapLoader loaded={mapLoaded} />
                    <LeafletMap mapData={mapData} onMapLoaded={onMapLoaded} />
                  </MapWrapper>
                </>
              )}
            </div>
          )
        );
      })}
    </>
  );
};
export default AboutPage;
// #endregion
