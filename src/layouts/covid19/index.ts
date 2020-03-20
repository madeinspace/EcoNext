import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatShortDecimal } from '../../utils';
import axios from 'axios';
const DATABASE = 'WebProfile';

const homeStatsDataQuery = filters =>
  `select * from [CommClient].[dbo].[ClientEconomyBoxes] where ClientID = ${filters.ClientID} and WebID = 10 order by WebID`;

const newDataQuery = () => `exec ${DATABASE}.[dbo].[spGetNewsByApplicationID] 4`;

const GeomQuery = clientId => `exec CommClient.[dbo].[sp_GeomEconomyEnvelopeLGA] ${clientId}`;

const fetchData = async ({ filters, clientAlias, mapLayers }) => {
  const statsData = await sqlConnection.raw(homeStatsDataQuery(filters));
  const newsData = await sqlConnection.raw(newDataQuery());
  const geomData = await sqlConnection.raw(GeomQuery(filters.ClientID));
  const url = `https://economy.id.com.au/${clientAlias}/geo/MapMeta/${mapLayers}`;
  let mapData = await axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
  mapData = { ...mapData, geomData };
  return { statsData, newsData, mapData };
};

const headline = ({ data, contentData }) => {
  const prefix = data.HasPrefix ? 'The ' : '';
  const areaName = data.currentAreaName;
  return `${areaName} COVID 19 headline`;
};

const pageContent = {
  entities: [
    { Title: 'SubTitle', renderString: ({ data }): string => `Covid 19 info page` },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '177',
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData }): string => headline({ data, contentData }),
      StoredProcedure: 'sp_Condition_IsLiteClient',
      Params: [
        {
          ClientID: '0',
        },
      ],
      Value: '178',
    },
  ],
  filterToggles: [],
};

export { fetchData, Page, pageContent };
