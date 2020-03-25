import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
const COM_CLIENT_DB = 'CommClient';

const homeStatsDataQuery = filters =>
  `select * from ${COM_CLIENT_DB}.[dbo].[ClientEconomyBoxes] where ClientID = ${filters.ClientID} and WebID = 10 order by WebID`;

const GeomQuery = clientId => `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${clientId}`;

const TextDataQuery = (clientId, WebID) => `exec ${COM_CLIENT_DB}.[dbo].[spGetText] ${clientId}, ${WebID}`;

const fetchData = async ({ filters, clientAlias, mapLayers }) => {
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
  console.log('mapData: ', mapData);
  mapData = { ...mapData, geomData };
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
