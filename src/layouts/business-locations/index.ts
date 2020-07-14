import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
import { adjust, Largest } from '../../utils';
import _ from 'lodash';
const COM_CLIENT_DB = 'CommClient';

const GeomQuery = ({ ClientID }) => {
  const query = `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;
  return query;
};

// select * from [dbo].[fn_ABR_Businessloc_ALL_1and3Digit](102,23000)
const BusinessLocationQuery = ({ ClientID, IndkeyABR }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_ABR_Businessloc_ALL_1and3Digit](${ClientID},${IndkeyABR}) order by IndustryCode`;
  return query;
};

const fetchData = async ({ filters }) => {
  const { clientAlias, LongName, ClientID } = filters;
  const layersUrl = `https://economy.id.com.au/${clientAlias}/geo/areasbytypeid/104,4`;
  const thematicUrl = `https://economy.id.com.au/${clientAlias}/geo/data?ClientID=${ClientID}&IndkeyABR=${filters.IndkeyABR}&ShapeId=null&dataid=3969`;
  let mapData = await axios
    .all([axios.get(layersUrl), axios.get(thematicUrl)])
    .then(axios.spread((data, thematic) => ({ layerData: data.data, thematicData: thematic.data })));

  const geomData = await sqlConnection.raw(GeomQuery(filters));
  const BusinessByLocationData = await sqlConnection.raw(BusinessLocationQuery(filters));

  const { layerData, thematicData } = mapData;
  const defaultShapeOption = {
    color: '#ff0000',
    fillOpacity: 0.7,
    Rank: 0,
    InfoBox: {},
  };

  layerData.envelope = geomData[0].WKT;
  layerData.legend = thematicData.legend;
  layerData.layers.map(layer => {
    const isMainArea = parseInt(layer.id) === 4;
    layer.id = parseInt(layer.id);
    layer.layerName = layer.id === 104 ? 'Destination zones' : LongName;
    layer.zIndex = isMainArea ? 2 : 1;
    layer.layerOptions = {
      styles: {
        default: {
          color: isMainArea ? '#000' : adjust('#009a44', -60),
          fillOpacity: 0,
          stroke: !isMainArea,
          fill: !isMainArea,
          weight: isMainArea ? 4 : 1,
        },
      },
      zIndexPriority: isMainArea,
      Rank: 0,
      InfoBox: {},
    };
    layer.shapeType = layer.id === 4 ? 'polyline' : 'polygon';
    layer.initVisibility = true;
    layer.shapes.forEach(shape => {
      const options = { ...thematicData.data.find(obj => obj.GeoID === shape.id) };
      // Perfect example of technical debt created here
      if (!_.isEmpty(options) && options.InfoBox.hasOwnProperty('Geocode')) {
        delete options.InfoBox['Geocode'];
      }
      const darkened = adjust(options.color || '#009a44', -50);
      const styles = {
        default: {
          fill: !isMainArea,
          color: darkened,
          weight: isMainArea ? 3 : 1,
          fillOpacity: _.isEmpty(options) ? 0 : 0.7,
          fillColor: options.color,
          dashArray: _.isEmpty(options) ? '2' : '0',
        },
        hover: {
          fill: !isMainArea,
          color: _.isEmpty(options) ? '#fff' : '#f00',
          weight: isMainArea ? 3 : 3,
          fillColor: options.color,
          fillOpacity: _.isEmpty(options) ? 0 : 0.7,
        },
      };
      const InfoBox = _.isEmpty(options)
        ? { displayText: ['No businesses or unavailable'] }
        : {
            header: `Click/tap to select and combine multiple areas`,
            displayText: [`Number: ${options.Number}`, `Percentage: ${options.Percentage}`],
          };
      shape.clickable = !_.isEmpty(options);
      shape.shapeOptions = { ...options, styles, InfoBox } || defaultShapeOption;
    });
  });
  layerData.mapHeight = 500;
  layerData.thematic = true;
  return { mapData: layerData, tableData: BusinessByLocationData };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentIndustryName: getActiveToggle(filterToggles, 'IndkeyABR'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Business locations - ${data.currentIndustryName}`;
      },
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string => {
        return `Australian Business Register - filtered counts - Current at 20th Apr 2020`;
      },
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        const { tableData } = contentData;
        if (tableData.length <= 0) {
          return `${data.currentIndustryName} doesn't have any active and registered for GST businesses in ${data.prefixedAreaName}.`;
        }
        const IndustryTotal = tableData.filter(({ LabelKey }) => LabelKey === 99999)[0];
        const noTotal = tableData.filter(({ LabelKey }) => LabelKey != 99999);
        const largestSubInd = Largest(noTotal, 'Number');
        const mainHeadline = `${data.currentIndustryName} has ${IndustryTotal.Number} active and registered for GST businesses in ${data.prefixedAreaName}. The largest subcategory within this is ${largestSubInd.LabelName}.`;
        const mainHeadLineAlt = `${data.currentIndustryName} doesn't have any active and registered for GST businesses in ${data.prefixedAreaName}.`;
        return IndustryTotal.Number === 0 ? mainHeadLineAlt : mainHeadline;
      },
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '23000',
      Label: 'Industry:',
      Params: [
        {
          Indkey: '0',
        },
        {
          ClientID: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_IndustryABR',
      ParamName: 'IndkeyABR',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
