import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
const COM_CLIENT_DB = 'CommClient';

const homeStatsDataQuery = ({ ClientID, WebID }) => {
  const query = `select * from CommClient.[dbo].[ClientEconomyBoxes] where ClientID = ${ClientID} and WebID = ${WebID} order by WebID`;
  return query;
};

const GeomQuery = clientId => `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${clientId}`;

const TextDataQuery = (clientId, WebID) => `exec ${COM_CLIENT_DB}.[dbo].[spGetText] ${clientId}, ${WebID}`;

const fetchData = async ({ LongName, filters, clientAlias, mapLayers }) => {
  const statsData = await sqlConnection.raw(homeStatsDataQuery(filters));
  const geomData = await sqlConnection.raw(GeomQuery(filters.ClientID));
  const textData = await sqlConnection.raw(TextDataQuery(filters.ClientID, filters.WebID));
  const url = `https://economy.id.com.au/${clientAlias}/geo/MapMeta/${mapLayers}`;
  let mapData = await axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });

  mapData.layers = mapData.layers.filter(layer => +layer.id === 1 || +layer.id === 4);
  const layerName = layer => (layer.shapes.length > 1 ? 'Local Government Areas' : layer.shapes[0].shapeName);

  const clientLookup = mapData.layers.reduce((acc, cur) => {
    return [
      ...acc,
      {
        id: +cur.id,
        name: layerName(cur),
        color: +cur.id === 4 ? '#000' : '#00c5ff',
      },
    ];
  }, []);

  mapData.envelope = geomData[0].WKT;
  mapData.layers.map(layer => {
    const match = clientLookup.find(({ id }) => id === parseInt(layer.id));
    const isMainArea = parseInt(layer.id) === 4;
    layer.id = parseInt(layer.id);
    layer.layerName = match.name;
    layer.zIndex = isMainArea ? 100 : 10;
    layer.layerOptions = {
      styles: {
        default: {
          color: match.color,
          fillOpacity: 0.3,
          fill: !isMainArea,
          weight: isMainArea ? 4 : 1,
        },
        hover: { color: '#f00', fillColor: '#f00', fillOpacity: 0.3, fill: !isMainArea, weight: isMainArea ? 4 : 1 },
      },
      zIndexPriority: isMainArea,
    };
    layer.shapeType = parseInt(layer.id) === 4 ? 'polyline' : 'polygon';
    layer.infoBox = { title: match.name };
    layer.initVisibility = true;
    layer.shapes.forEach(shape => {
      const styles = {
        default: {
          fill: !isMainArea,
          color: isMainArea ? '#000' : '#00c5ff',
          weight: isMainArea ? 3 : 1,
          fillOpacity: 0.3,
          fillColor: '#00c5ff',
        },
        hover: {
          fill: !isMainArea,
          color: '#f00',
          weight: isMainArea ? 3 : 3,
          fillColor: '#f00',
          fillOpacity: 0.3,
        },
      };
      shape.shapeOptions = { Rank: 0, InfoBox: {}, styles };
    });
  });
  mapData.mapHeight = 500;
  return { statsData, mapData, textData };
};

const activeCustomToggles = ({ filterToggles }) => ({});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `About the area`,
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '10',
      Label: 'Current area:',
      Params: [
        {
          ClientID: '2',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area',
      ParamName: 'WebID',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
