import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import '../../styles/leaflet.css';
import { LayerControl } from './LayerControl';
import TileLayers from './TileLayers';
import { ClientContext } from '../../utils/context';
import { getBoundariesFromWKT, createMapLayers } from './Utils';
import ToolTip from './Tooltip';
import { MapContainer, InfoPanel, Footer, Source } from './MapStyledComponents';

const LeafletMap = ({ mapData, onLoaded }) => {
  const { LongName } = useContext(ClientContext);
  const { layers, entitylayers, geomData } = mapData;
  const [map, setMap] = useState(null);
  const [mapLayers, setMapLayers] = useState(null);
  const [featureGroups, setFeatureGroups] = useState([]);
  const [activeLayers, setActiveLayers] = useState([]);
  const mapContainer = useRef(null);

  useEffect(() => {
    !mapLayers ? initializeLayers() : DrawLayers();
  }, [mapLayers]);

  useEffect(() => {
    if (!map) initializeMap({ mapContainer });
  }, [map]);

  useEffect(() => {
    console.log('active layers are : ', activeLayers);
  }, [activeLayers]);

  const initializeMap = ({ mapContainer }) => {
    let map: L.map = L.map(mapContainer.current, {
      layers: TileLayers.road,
    });
    const bounds = getBoundariesFromWKT(geomData[0].WKT);
    map.fitBounds(bounds);
    setMap(map);
    onLoaded();
  };

  const initializeLayers = () => setMapLayers(createMapLayers({ entitylayers, layers, LongName }));

  const DrawLayers = () => {
    const featureGroups = [];
    mapLayers.forEach(layer => {
      const featureGroup = {
        id: layer.id,
        zIndex: layer.zIndex,
        featureGroup: createFeatureGroup(createLeafletLayer(layer))
          .setZIndex(layer.zIndex)
          .addTo(map),
      };
      featureGroups.push(featureGroup);
    });
    setFeatureGroups(featureGroups);
  };

  const createFeatureGroup = (shapes: L.Path[]): L.FeatureGroup => {
    const LayerFeatureGroup = L.featureGroup();
    shapes.forEach(shape => shape.addTo(LayerFeatureGroup));
    return LayerFeatureGroup;
  };

  const createLeafletLayer = ({ decodedLayer }): L.Path =>
    decodedLayer.map(poly => (poly.type === 'polygon' ? createPolygon(poly) : createPolyline(poly)));

  const createPolygon = (polygon, isThematicMap = false): L.Polygon =>
    L.polygon(polygon.leafletPolys).bindTooltip(ToolTip(polygon.areaName));

  const createPolyline = (polygon): L.Polyline =>
    L.polyline(polygon.leafletPolys).bindTooltip(ToolTip(polygon.areaName));

  const handleLayerToggle = checkedItems => {
    setActiveLayers(checkedItems);
  };

  return (
    <MapContainer>
      <InfoPanel>{mapLayers && <LayerControl layers={mapLayers} onLayerToggle={handleLayerToggle} />}</InfoPanel>
      <div ref={el => (mapContainer.current = el)} style={{ width: '100%', height: '400px' }} />
      <Footer>
        <Source>Compiled and presented in profile.id by .id, the population experts.</Source>
      </Footer>
    </MapContainer>
  );
};

export default LeafletMap;
