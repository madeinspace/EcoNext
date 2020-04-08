import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import '../../styles/leaflet.css';
import { LayerControl } from './LayerControl';
import TileLayers, { minimapLayer } from './TileLayers';
import { ClientContext } from '../../utils/context';
import { getBoundariesFromWKT, createMapLayers } from './Utils';
import ToolTip from './ToolTip';
import { MapContainer, InfoPanel, Footer, Source } from './MapStyledComponents';
import MiniMap from 'leaflet-minimap';
import { IdLink } from '../ui/links';

const LeafletMap = ({ mapData, onMapLoaded }) => {
  const { LongName } = useContext(ClientContext);
  const { layers, envelope, mapHeight } = mapData;
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
    const bounds = getBoundariesFromWKT(envelope);
    map.fitBounds(bounds);
    setMap(map);
    onMapLoaded();
  };

  const initializeLayers = () => setMapLayers(createMapLayers({ layers, LongName }));

  const DrawLayers = () => {
    const featureGroups = [];
    mapLayers.forEach(layer => {
      const PathOptions = layer.shapeOptions;
      const featureGroup = {
        id: +layer.id,
        zIndex: layer.zIndex,
        featureGroup: createFeatureGroup(createLeafletLayer(layer, PathOptions)),
      };
      featureGroups.push(featureGroup);
    });
    setFeatureGroups(featureGroups);
  };

  const useMiniMap = () => {
    const minimapOptions = {
      width: '150',
      height: '130',
      aimingRectOptions: { color: '#ff0000', fill: false, weight: 2 },
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

  const applyStyles = (shape, PathOptions) => {
    const style = {
      fill: PathOptions.fill,
      color: PathOptions.color,
      fillOpacity: PathOptions.fillOpacity,
      fillColor: PathOptions.fillColor,
      weight: PathOptions.weight,
    };
    const hoverStyle = {
      fill: PathOptions.fill,
      color: '#f00',
      weight: 3,
      fillColor: '#f00',
      fillOpacity: PathOptions.fillOpacity,
    };

    shape
      .setStyle(style)
      .on('mouseover', function(e) {
        this.setStyle(hoverStyle);
        this.bringToFront();
      })
      .on('mouseout', function(e) {
        this.setStyle(style);
        PathOptions.zIndexPriority ? this.bringToFront() : this.bringToBack();
      });
    return shape;
  };

  const createPolyline = polygon => L.polyline(polygon.leafletPolys).bindTooltip(ToolTip(polygon.areaName));

  const handleLayerToggle = checkedItems => setActiveLayers(checkedItems);

  const clearAllOverlays = () => featureGroups.forEach(({ featureGroup }) => removeFeatureGroup(featureGroup));

  const removeFeatureGroup = fg => fg.removeFrom(map);

  const drawFeatureGroups = active => {
    clearAllOverlays();
    active.forEach(({ featureGroup, zIndex }) => {
      featureGroup.addTo(map);
      featureGroup.setZIndex(zIndex);
    });
  };

  return (
    <MapContainer>
      <InfoPanel>{mapLayers && <LayerControl layers={mapLayers} onLayerToggle={handleLayerToggle} />}</InfoPanel>
      <div ref={el => (mapContainer.current = el)} style={{ width: '100%', height: `${mapHeight}px` }} />
      <Footer>
        <Source>
          Compiled and presented in economy.id by <IdLink />
        </Source>
      </Footer>
    </MapContainer>
  );
};

export default LeafletMap;
