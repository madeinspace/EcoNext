import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import { LayerControl } from './LayerControl';
import TileLayers, { minimapLayer } from './TileLayers';
import { ClientContext } from '../../utils/context';
import { getBoundariesFromWKT, createMapLayers } from './Utils';
import ToolTip from './ToolTip';
import { MapContainer, InfoPanel, Footer, Source } from './MapStyledComponents';
import MiniMap from 'leaflet-minimap';
import { IdLink } from '../ui/links';
import { LegendPanel } from './LegendPanel';

const LeafletMap = ({ mapData, onMapLoaded }) => {
  const { LongName } = useContext(ClientContext);
  const { layers, envelope, mapHeight, legend } = mapData;
  const [map, setMap] = useState(null);
  const [mapLayers, setMapLayers] = useState(null);
  const [featureGroups, setFeatureGroups] = useState(null);
  const [activeLayers, setActiveLayers] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!map) {
      initializeMap({ mapContainer });
    } else {
      useMiniMap();
    }
  }, [map]);

  useEffect(() => {
    !mapLayers ? initializeLayers() : createFeatureGroups();
  }, [mapLayers]);

  useEffect(() => {
    if (!activeLayers) {
    } else {
      const active = featureGroups.filter(fg => activeLayers.includes(fg.id));
      drawFeatureGroups(active);
    }
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

  const initializeLayers = () => {
    setMapLayers(createMapLayers({ layers, LongName }));
  };

  const createFeatureGroups = () => {
    const featureGroups = [];
    mapLayers.forEach(layer => {
      const featureGroup = {
        id: +layer.id,
        zIndex: layer.zIndex,
        featureGroup: createFeatureGroup(createLeafletLayer(layer)),
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

  const createFeatureGroup = shapes => L.featureGroup(shapes);

  const createLeafletLayer = layer => {
    return layer.decodedLayer.map(poly => {
      return applyStyles(poly.type === 'polygon' ? createPolygon(poly) : createPolyline(poly), poly);
    });
  };

  const createPolyline = polygon => L.polyline(polygon.leafletPolys).bindTooltip(ToolTip(polygon));
  const createPolygon = polygon => L.polygon(polygon.leafletPolys).bindTooltip(ToolTip(polygon));

  const applyStyles = (shape, poly) => {
    return shape
      .setStyle(poly.styles.default)
      .on('mouseover', function(e) {
        this.setStyle(poly.styles.hover);
        this.bringToFront();
      })
      .on('mouseout', function(e) {
        this.setStyle(poly.styles.default);
        poly.zIndexPriority ? this.bringToFront() : this.bringToBack();
      });
  };

  const handleLayerToggle = checkedItems => {
    setActiveLayers(checkedItems);
  };

  const handleLegendOver = Rank => {};

  const clearAllOverlays = () => featureGroups.forEach(({ featureGroup }) => removeFeatureGroup(featureGroup));

  const removeFeatureGroup = fg => fg.removeFrom(map);

  const drawFeatureGroups = active => {
    clearAllOverlays();
    active.sort((a, b) => b.id - a.id);
    active.forEach(({ featureGroup, zIndex }) => {
      featureGroup.addTo(map).setZIndex(zIndex);
    });
  };

  return (
    <MapContainer>
      <InfoPanel>
        {featureGroups && <LayerControl layers={mapLayers} onLayerToggle={handleLayerToggle} />}
        {legend && <LegendPanel legends={legend} onLegendOver={handleLegendOver} />}
      </InfoPanel>
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
