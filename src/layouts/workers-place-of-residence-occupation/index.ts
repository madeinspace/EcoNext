import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
const COM_CLIENT_DB = 'CommClient';

const GeomQuery = ({ ClientID }) => `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;

const fetchData = async ({ filters }) => {
  const { clientAlias, LongName, ClientID } = filters;
  const geomData = await sqlConnection.raw(GeomQuery(filters));

  const url = `https://economy.id.com.au/${clientAlias}/geo/areasbyentityid/7329?ClientID=${ClientID}&WebID=10&LGACode=0&OccuKey=24000`;
  const thematicUrl = `https://economy.id.com.au/${clientAlias}/geo/data/workers-place-of-residence-occupation?ClientID=${ClientID}&WebID=10&LGACode=0&Occukey=24002&dataid=387&_dc=1586393764142`;
  const getMapData = () => axios.get(url);
  const getThematicData = () => axios.get(thematicUrl);

  let mapData = await axios.all([getMapData(), getThematicData()]).then(
    axios.spread(function(data, thematic) {
      // Both requests are now completereturn
      return [data.data, thematic.data];
    }),
  );

  mapData[0].envelope = geomData[0].WKT;
  mapData[0].layers.map((layer, { id }) => {
    const isMainArea = parseInt(layer.id) === 4;
    layer.id = parseInt(layer.id);
    layer.layerName = layer.id === 4 ? LongName : layer.layerName;
    layer.zIndex = isMainArea ? 100 : 10;
    layer.shapeOptions = {
      color: '#ff0000',
      fillOpacity: 0.3,
      fill: !isMainArea,
      weight: isMainArea ? 4 : 1,
      zIndexPriority: isMainArea,
    };
    layer.shapeType = layer.id === 4 ? 'polyline' : 'polygon';
    layer.infoBox = { title: 'match.name' };
    layer.initVisibility = true;
  });
  mapData[0].mapHeight = 500;
  return { mapData: mapData[0] };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentOccupationName: getActiveToggle(filterToggles, 'OccuKey'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: (): string => `Workers place of residence by occupation - {occupation}`,
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        return `Of the 29,983 local workers as Professionals in the Monash, 6,758 or 22.5% also live in the area.`;
      },
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '24000',
      Label: 'Occupation',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Occupation',
      ParamName: 'OccuKey',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
