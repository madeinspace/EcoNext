import L from 'leaflet';
import Wkt from 'wicket';
import _ from 'lodash';

/**
 * Compiles a layer object ready to be consumed by the leaflet engine
 */
export const createMapLayers = ({ layers, LongName }) => {
  const mapLayers = layers.reduce((acc, currlayer) => {
    const decodedShapes = currlayer.shapes.map(shape => {
      const isMainArea = parseInt(currlayer.id) === 4;
      return {
        id: shape.id,
        clickable: shape.clickable,
        areaName: shape.shapeName,
        infoBox: shape.shapeOptions.InfoBox || {},
        rank: shape.shapeOptions.Rank || 0,
        styles: shape.shapeOptions.styles,
        type: currlayer.shapeType,
        zIndexPriority: isMainArea,
        leafletPolys: decodeArea(shape),
      };
    });
    acc.push({ ...currlayer, decodedLayer: decodedShapes });

    return acc;
  }, []);
  return mapLayers;
};

export const decodeArea = shape => {
  // each area can be just a simple polygon or a collection of polygons
  // (multipolygon shape) or a polygon with holes or a combination or both
  const polys = [];
  polys.push(decodePoints(shape.points, true));

  // if area has hole polys become a multidimensional array (https://leafletjs.com/reference-1.6.0.html#polygon)
  if (shape.holes.length > 0) {
    const holes = shape.holes.map(hole => decodePoints(hole.points, true));
    polys.push(holes);
  }

  if (shape.shapes.length > 0) {
    shape.shapes.forEach(shape => {
      polys.push(decodePoints(shape.points, true));
    });
  }
  return polys;
};

export const getBoundariesFromWKT = WKT => {
  const wkt = new Wkt.Wkt();
  wkt.read(WKT);
  const feature = wkt.toJson();
  const reversed = reverseCoordinates(feature.coordinates[0]);
  const p1 = [reversed[0][0], reversed[0][1]];
  const p2 = [reversed[2][0], reversed[2][1]];
  const bounds = [p1, p2];
  return bounds;
};

export const reverseCoordinates = coordinates => {
  return coordinates.map(arr => arr.reverse());
};

export const decodePoints = (encoded: string, flipLatLng: boolean = true) => {
  if (encoded === undefined) return [];
  let len = String(encoded).length;
  let index = 0;
  let ar = [];
  let lat = 0;
  let lng = 0;

  try {
    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      ar.push(L.latLng((flipLatLng ? lng : lat) * 1e-5, (flipLatLng ? lat : lng) * 1e-5));
    }
  } catch (ex) {
    console.log(ex);
  }
  return ar;
};
