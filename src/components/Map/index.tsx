import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import { LayerControl } from './LayerControl';
import TileLayers, { minimapLayer } from './TileLayers';
import { ClientContext, PageContext } from '../../utils/context';
import { getBoundariesFromWKT, createMapLayers } from './Utils';
import ToolTip from './ToolTip';
import { MapContainer, InfoPanel } from './MapStyledComponents';
import MiniMap from 'leaflet-minimap';
import { LegendPanel } from './LegendPanel';
import ExportMapControl from './ExportMapControl';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';

const LeafletMap = (props: any) => {
  const { mapTitle, mapData, onMapLoaded, forwardRef } = props;
  const { LongName } = useContext(ClientContext);
  const { layers, envelope, mapHeight, legend } = mapData;
  const [map, setMap] = useState(null);
  const [mapLayers, setMapLayers] = useState(null);
  const [featureGroups, setFeatureGroups] = useState(null);
  const [activeLayers, setActiveLayers] = useState(null);
  const mapContainer = useRef(null);

  const resetLayerStyles = () => {
    if (featureGroups && activeLayers) {
      featureGroups.forEach(fg => {
        fg.featureGroup.eachLayer(function(layer) {
          layer.setStyle(layer.defaultStyle);
          layer.selected = false;
        });
      });
    }
  };

  if (forwardRef != undefined) {
    forwardRef.current = { resetLayerStyles };
  }

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

  const createPolyline = polyline => L.polyline(polyline.leafletPolys).bindTooltip(ToolTip(polyline));
  const createPolygon = polygon => L.polygon(polygon.leafletPolys).bindTooltip(ToolTip(polygon));

  const applyStyles = (shape, poly) => {
    shape.defaultStyle = poly.styles.default;
    shape.hoverStyle = poly.styles.hover;
    shape
      .setStyle(poly.styles.default)
      .on('mouseover', function(e) {
        shape.selected ? null : this.setStyle(poly.styles.hover).bringToFront();
      })
      .on('mouseout', function(e) {
        shape.selected ? null : this.setStyle(poly.styles.default);
        shape.selected ? null : shape.zIndexPriority ? this.bringToFront() : this.bringToBack();
      });

    if (poly.clickable) {
      shape.on('click', function(e) {
        this.setStyle(poly.selected ? poly.styles.default : { color: '#ff0000', weight: 3 }).bringToFront();
        shape.selected = !shape.selected;
        props.onShapeSelect(poly.id);
      });
    }
    return shape;
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

  const exportToImageDownload = () => {
    const node = document.querySelector(`.themap`);
    cloneAndFilterNode(node).then(({ nodeToExport, nodeToCleanup }) => {
      domtoimage
        .toBlob(nodeToExport)
        .then(function(blob) {
          saveAs(blob, mapTitle);
          nodeToCleanup.remove();
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const cloneAndFilterNode = node => {
    return new Promise(resolve => {
      const width = node.offsetWidth;
      const dupNode = node.cloneNode(true);
      const div = document.createElement('div');
      dupNode.querySelectorAll('.d-print-none').forEach(el => el.remove());
      div.style.height = '0';
      div.style.overflow = 'hidden';
      div.appendChild(dupNode);
      document.body.appendChild(div);
      dupNode.style.width = `${width}px`;

      const returnObj = {
        nodeToExport: dupNode,
        nodeToCleanup: div,
      };

      resolve(returnObj);
    });
  };

  return (
    <MapContainer className="themap">
      <InfoPanel>
        {featureGroups && <LayerControl layers={mapLayers} onLayerToggle={handleLayerToggle} />}
        {legend && <LegendPanel legends={legend} onLegendOver={handleLegendOver} />}
      </InfoPanel>
      <ExportMapControl handleClick={exportToImageDownload} />
      <div ref={el => (mapContainer.current = el)} style={{ width: '100%', height: `${mapHeight}px` }} />
    </MapContainer>
  );
};

export default LeafletMap;
