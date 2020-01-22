import L from 'leaflet';
import Wkt from 'wicket';

export const mashLayers = ({ entitylayers, layers, LongName }) => {
  const lookup = entitylayers.reduce((a, c) => {
    a[c.TypeID] = {
      id: c.TypeID,
      name: c.Name === '[C]' ? LongName : c.Name,
      shapeOptions: c.ShapeOptions,
      visible: c.InitVisibility,
      zIndex: c.ZIndex,
      shapeType: c.RenderAs,
    };
    return a;
  }, {});

  const mapLayers = layers.reduce((acc, currlayer) => {
    const match = lookup[parseInt(currlayer.id)];
    const key = match.name;
    if (!(key in acc)) {
      acc.push({ ...match, shapes: currlayer.shapes });
    }
    return acc;
  }, []);

  return mapLayers;
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
