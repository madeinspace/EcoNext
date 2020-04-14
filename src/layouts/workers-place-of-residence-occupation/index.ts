import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
const COM_CLIENT_DB = 'CommClient';

const GeomQuery = ({ ClientID }) => `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;

const fetchData = async ({ filters }) => {
  console.clear();
  const { clientAlias, LongName, ClientID } = filters;
  const geomData = await sqlConnection.raw(GeomQuery(filters));

  const layersUrl = `https://economy.id.com.au/${clientAlias}/geo/areasbyentityid/7329?ClientID=${ClientID}&WebID=10&LGACode=0&OccuKey=${filters.OccuKey}`;
  const thematicUrl = `https://economy.id.com.au/${clientAlias}/geo/data/workers-place-of-residence-occupation?ClientID=${ClientID}&WebID=10&LGACode=0&Occukey=${filters.OccuKey}&dataid=387`;

  let mapData = await axios
    .all([axios.get(layersUrl), axios.get(thematicUrl)])
    .then(axios.spread((data, thematic) => ({ layerData: data.data, thematicData: thematic.data })));

  const { layerData, thematicData } = mapData;
  console.log('mapData: ', mapData);

  layerData.envelope = geomData[0].WKT;
  layerData.thematicData = thematicData.data;
  layerData.legend = thematicData.legend;
  layerData.layers.map((layer, { id }) => {
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
  layerData.mapHeight = 500;
  layerData.thematic = true;
  // map thematic data geoID with the shapes of the layers
  console.log('map data: ', layerData);
  return { mapData: layerData };
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
