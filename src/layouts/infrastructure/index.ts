import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
const COM_CLIENT_DB = 'CommClient';

const TextDataQuery = ({ ClientID, WebID }) => {
  const query = `select * from CommClient.[dbo].[ClientEconomyText] where ClientID = ${ClientID} and WebID = ${WebID} order by WebID`;
  return query;
};

const LandUseSQL = ({ ClientID, WebID, IGBMID, Indkey }) =>
  `SELECT * from CommData_Economy.[dbo].[fn_LandUsePieChart](${ClientID},${WebID})`;

const GeomQuery = ({ ClientID }) => `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;
const InfrastructureLayersQuery = ({ ClientID }) =>
  `exec ${COM_CLIENT_DB}.[dbo].[sp_Sys_LayersEconomy_Infrastructure] ${ClientID}, 0`;

const fetchData = async ({ filters, clientAlias, LongName }) => {
  const textData = await sqlConnection.raw(TextDataQuery(filters));
  const landUse = await sqlConnection.raw(LandUseSQL(filters));
  const layersQuery = await sqlConnection.raw(InfrastructureLayersQuery(filters));
  const layerIds = layersQuery.map(({ TypeID }) => TypeID);
  const geomData = await sqlConnection.raw(GeomQuery(filters));

  const url = `https://economy.id.com.au/${clientAlias}/geo/areasbytypeid/4,${layerIds}`;
  let mapData = await axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
  const colorLookup = [
    { id: 4, name: `${LongName}`, color: '#000' },
    { id: 201, name: 'Residential', color: '#91e8e1' },
    { id: 203, name: 'Commercial', color: '#ff9800' },
    { id: 204, name: 'Industrial', color: '#b87d04' },
    { id: 205, name: 'Education', color: '#d400ff' },
    { id: 206, name: 'Hospital/Medical', color: '#ff0000' },
    { id: 207, name: 'Parkland', color: '#00ca00' },
    { id: 208, name: 'Transport', color: '#000000' },
    { id: 209, name: 'Water', color: '#042593' },
    { id: 210, name: 'Other', color: '#666666' },
    { id: 211, name: 'Primary Production', color: '#e4d354' },
  ];
  mapData.envelope = geomData[0].WKT;
  mapData.layers.map(layer => {
    const match = colorLookup.find(({ id }) => id === parseInt(layer.id));
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
    layer.shapeType = match.id === 4 ? 'polyline' : 'polygon';
    layer.infoBox = { title: match.name };
    layer.initVisibility = true;
  });
  mapData.mapHeight = 500;
  return { mapData, textData, landUse };
};

const activeCustomToggles = ({ filterToggles }) => ({});

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Infrastructure`,
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
