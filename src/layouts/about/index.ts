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
  const layerLookup = [
    { id: 4, name: `${LongName}`, color: '#000' },
    { id: 1, name: 'Local Government Areas', color: '#00c5ff' },
  ];
  mapData.envelope = geomData[0].WKT;
  mapData.layers.map(layer => {
    const match = layerLookup.find(({ id }) => id === parseInt(layer.id));
    const isMainArea = parseInt(layer.id) === 4;
    layer.id = parseInt(layer.id);
    layer.layerName = match.name;
    layer.zIndex = isMainArea ? 100 : 10;
    layer.shapeOptions = {
      color: match.color,
      fillOpacity: 0.3,
      fill: !isMainArea,
      weight: isMainArea ? 4 : 1,
      zIndexPriority: isMainArea,
    };
    layer.shapeType = parseInt(layer.id) === 4 ? 'polyline' : 'polygon';
    layer.infoBox = { title: match.name };
    layer.initVisibility = true;
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
