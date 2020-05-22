import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
import { adjust, Largest, formatNumber, formatPercent } from '../../utils';
import _ from 'lodash';
const COM_CLIENT_DB = 'CommClient';

const GeomQuery = ({ ClientID }) => {
  const query = `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;
  return query;
};

// select * from [dbo].[fn_ABR_Businessloc_ALL_1and3Digit](102,23000)
const BusinessLocationQuery = ({ ClientID, Indkey, EconSpace }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_DestinationZones_2016](${ClientID},2016,${Indkey},${EconSpace})`;
  return query;
};

const fetchData = async ({ filters }) => {
  const { clientAlias, LongName, ClientID } = filters;
  const layersUrl = `https://economy.id.com.au/${clientAlias}/geo/areasbytypeid/104,4,1`;
  const dataID = +filters.EconSpace === 0 ? '417' : '3955';
  const thematicUrl = `https://economy.id.com.au/${clientAlias}/geo/data?ClientID=${ClientID}&Year=2016&Indkey=${filters.Indkey}&EconSpace=${filters.EconSpace}&dataid=${dataID}`;
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
  layerData.layers = layerData.layers.filter(({ shapes }) => shapes.length > 0);
  layerData.envelope = geomData[0].WKT;
  layerData.legend = thematicData.legend;
  layerData.layers.map(layer => {
    const isMainArea = parseInt(layer.id) === 4;
    layer.id = parseInt(layer.id);
    layer.layerName = layer.id === 104 ? 'Destination zones' : layer.id === 1 ? 'Local Government Area' : LongName;
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
    layer.initVisibility = layer.id != 1;
    layer.shapes.forEach(shape => {
      const options = { ...thematicData.data.find(obj => obj.GeoID === shape.id) };
      // Perfect example of technical debt created here
      if (!_.isEmpty(options) && options.InfoBox.hasOwnProperty('Geocode')) {
        delete options.InfoBox['Geocode'];
      }
      const darkened = adjust(options.color || '#009a44', -50);
      const styles =
        layer.id === 1
          ? LGAstyles
          : {
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
        ? { displayText: ['No data available'] }
        : {
            header: `Click/tap to select and combine multiple areas`,
            displayText: [`Number: ${options.Number}`, `Percentage: ${options.Percentage}`],
          };
      shape.clickable = layer.id != 1;
      shape.shapeOptions = { ...options, styles, InfoBox } || defaultShapeOption;
    });
  });
  layerData.mapHeight = 500;
  layerData.thematic = true;
  return { mapData: layerData, tableData: BusinessByLocationData };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
    currentMeasureName: getActiveToggle(filterToggles, 'EconSpace'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Employment locations -  ${data.currentIndustryName}`;
      },
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string => {
        return `Australian Bureau of Statistics (ABS) – Census 2016 – by place of work`;
      },
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        const { tableData } = contentData;
        const greatest = Largest(tableData, 'Number');
        return `The destination zone with the greatest number (${formatNumber(
          greatest.Number,
        )}) of workers employs ${formatPercent(greatest.Per)}% of the local workers within ${data.prefixedAreaName}.`;
      },
    },
  ],
  filterToggles: [
    {
      Database: 'CommApp',
      DefaultValue: '23000',
      Label: 'Select industry:',
      Params: [
        {
          IGBMID: '0',
        },
        {
          a: '0',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Industry',
      ParamName: 'Indkey',
    },
    {
      Database: 'CommApp',
      DefaultValue: '0',
      Label: 'Measure:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_Spatial',
      ParamName: 'EconSpace',
    },
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };

const LGAstyles = {
  default: {
    color: '#00c5ff',
    weight: 1,
    fillOpacity: 0.3,
    fillColor: '#00c5ff',
  },
  hover: {
    color: '#f00',
    weight: 3,
    fillColor: '#f00',
    fillOpacity: 0.3,
  },
};
