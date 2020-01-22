import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import '../../styles/leaflet.css';
import { LayerControl } from './LayerControl';
import styled from 'styled-components';
import TileLayers from './TileLayers';
import { ClientContext } from '../../utils/context';
import { mashLayers, reverseCoordinates, getBoundariesFromWKT } from './Utils';

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

const InfoPanel = styled.div`
  position: absolute;
  z-index: 401;
  background: white;
  padding: 10px;
  align-self: flex-end;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 0px;
  right: 10px;
  top: 10px;
`;

const Footer = styled.div`
  padding: 10px;
`;
const Source = styled.p`
  margin: 0;
`;

const LeafletMap = ({ mapData, onLoaded }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const { layers, entitylayers, geomData } = mapData;

  const { LongName } = useContext(ClientContext);

  const maplayers = mashLayers({ entitylayers, layers, LongName });

  useEffect(() => {
    const initializeMap = ({ mapContainer }) => {
      let map: L.map = L.map(mapContainer.current, {
        layers: TileLayers.road,
      });

      map.on('load', ev => {
        onLoaded();
        setMap(map);
      });

      const bounds = getBoundariesFromWKT(geomData[0].WKT);
      map.fitBounds(bounds);
    };

    if (!map) initializeMap({ mapContainer });
  }, [map]);

  const handleLayerToggle = checkedItems => {
    console.log('layer toggled: ', checkedItems);
  };

  return (
    <MapContainer>
      <InfoPanel>
        <LayerControl layers={maplayers} onLayerToggle={handleLayerToggle} />
      </InfoPanel>
      <div ref={el => (mapContainer.current = el)} style={{ width: '100%', height: '400px' }} />
      <Footer>
        <Source>Compiled and presented in profile.id by .id, the population experts.</Source>
      </Footer>
    </MapContainer>
  );
};

export default LeafletMap;
