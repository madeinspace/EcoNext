import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import '../../styles/leaflet.css';
import { LayerControl } from './LayerControl';
import TileLayers, { minimapLayer } from './TileLayers';
import { ClientContext } from '../../utils/context';
import { getBoundariesFromWKT, createMapLayers } from './Utils';
import ToolTip from './Tooltip';
import { MapContainer, InfoPanel, Footer, Source } from './MapStyledComponents';
import MiniMap from 'leaflet-minimap';

const LeafletMap = ({ mapData, onMapLoaded }) => {
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
    else {
      useMiniMap();
    }
  }, [map]);

  useEffect(() => {
    const active = featureGroups.filter(fg => activeLayers.includes(fg.id));
    drawFeatureGroups(active);
  }, [activeLayers]);

  const initializeMap = ({ mapContainer }) => {
    let map: L.map = L.map(mapContainer.current, {
      layers: TileLayers.road,
    });
    const bounds = getBoundariesFromWKT(geomData[0].WKT);
    map.fitBounds(bounds);
    setMap(map);
    onMapLoaded();
  };

  const initializeLayers = () => setMapLayers(createMapLayers({ entitylayers, layers, LongName }));

  const DrawLayers = () => {
    const featureGroups = [];
    mapLayers.forEach(layer => {
      const PathOptions = { color: layer.shapeOptions.borderColor.color, weight: 2 };
      const featureGroup = {
        id: layer.id,
        zIndex: layer.zIndex,
        featureGroup: createFeatureGroup(createLeafletLayer(layer, PathOptions)).setZIndex(layer.zIndex),
        // .setStyle(PathOptions),
      };
      featureGroups.push(featureGroup);
    });
    setFeatureGroups(featureGroups);
  };

  const useMiniMap = () => {
    const minimapOptions = {
      width: '100',
      height: '100',
    };
    const layer = minimapLayer();

    return new MiniMap(layer, minimapOptions).addTo(map);
  };

  const createFeatureGroup = shapes => {
    const LayerFeatureGroup = L.featureGroup();

    shapes.forEach(shape => shape.addTo(LayerFeatureGroup));
    return LayerFeatureGroup;
  };

  const createLeafletLayer = ({ decodedLayer }, PathOptions) =>
    decodedLayer.map(poly =>
      applyStyles(poly.type === 'polygon' ? createPolygon(poly) : createPolyline(poly), PathOptions),
    );

  const createPolygon = polygon => L.polygon(polygon.leafletPolys).bindTooltip(ToolTip(polygon.areaName));

  const applyStyles = (shape, style) => {
    const hoverStyle = {
      color: '#ffffff',
      weight: 2,
    };

    shape
      .setStyle(style)
      .on('mouseover', function(e) {
        this.setStyle(hoverStyle);
        this.bringToFront();
      })
      .on('mouseout', function(e) {
        this.setStyle(style);
      });
    return shape;
  };

  const createPolyline = polygon => L.polyline(polygon.leafletPolys).bindTooltip(ToolTip(polygon.areaName));

  const handleLayerToggle = checkedItems => setActiveLayers(checkedItems);

  const clearAllOverlays = () => featureGroups.forEach(fg => removeFeatureGroup(fg.featureGroup));

  const removeFeatureGroup = fg => fg.removeFrom(map);

  const drawFeatureGroups = active => {
    clearAllOverlays();
    active.forEach(fg => {
      fg.featureGroup.addTo(map).setZIndex(fg.zIndex);
    });
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
