import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatShortDecimal } from '../../utils';
import axios from 'axios';
const DATABASE = 'WebProfile';

const homeStatsDataQuery = filters =>
  `select * from [CommClient].[dbo].[ClientEconomyBoxes] where ClientID = ${filters.ClientID} and WebID = 10 order by WebID`;

const newDataQuery = () => `exec ${DATABASE}.[dbo].[spGetNewsByApplicationID] 4`;

const GeomQuery = clientId => `exec CommClient.[dbo].[sp_GeomEconomyEnvelopeLGA] ${clientId}`;

const fetchData = async ({ filters, LongName, clientAlias, mapLayers }) => {
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
  return { statsData, newsData, mapData };
};

const headline = ({ data, contentData }) => {
  const prefix = data.HasPrefix ? 'The ' : '';
  const areaName = data.currentAreaName;
  const grp = formatShortDecimal(contentData.statsData[0].Number);
  const gsp = contentData.statsData[0].PercOfState;
  return `${prefix}${areaName}'s Gross Regional Product is estimated at $${grp} billion, which represents ${gsp}% of the state's GSP (Gross State Product).`;
};

const pageContent = {
  entities: [
    {
      Title: 'Description',
      renderString: ({ data }): string => {
        const prefix = data.HasPrefix ? 'The ' : '';
        const areaName = `${prefix}${data.currentAreaName}`;
        return `<p>${areaName}'s economic profile presents economic information that enables you to describe the area's role within the broader economy, explore options for economic development and promote the area's strengths. The information presented here is derived from official sources of information (Australian Bureau of Statistics) as well as Australia's leading economic modellers <a href='http://www.nieir.com.au/' target='_blank' rel='noopener'>(NIEIR)</a>. The latest data from each series is always presented in this site. <br /><br />Economy.id industry structure and industry sector profiles use a National Accounts regional econometric model developed by National Economics <a href='http://www.nieir.com.au/' target='_blank' rel='noopener'>(NIEIR)</a>.</p>`;
      },
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
