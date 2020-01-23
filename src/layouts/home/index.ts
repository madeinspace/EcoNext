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
  const grp = formatShortDecimal(contentData.statsData[0].Number);
  const gsp = contentData.statsData[0].PercOfState;

  return `${prefix}${areaName}'s Gross Regional Product is estimated at $${grp} billions, which represents ${gsp}% of the state's GSP (Gross State Product).`;
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
