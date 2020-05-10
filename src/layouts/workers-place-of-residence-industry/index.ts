import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
import { adjust, formatNumber, formatPercent } from '../../utils';
import _ from 'lodash';
const COM_CLIENT_DB = 'CommClient';

const GeomQuery = ({ ClientID }) => `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;
const DestByOccupationQuery = ({ ClientID, Indkey }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_AD_JTW_Dest_LGA_by_Industry_Summ_2016](${ClientID},10,NULL,${Indkey}) order by LabelKey`;
  return query;
};

const DestByOccupationAllQuery = ({ ClientID, Indkey }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_AD_JTW_Dest_LGA_by_Industry_2016](${ClientID},10,NULL,${Indkey}) Where Number > 9 order by Number DESC`;
  return query;
};
const fetchData = async ({ filters }) => {
  const { clientAlias, LongName, ClientID } = filters;
  const geomData = await sqlConnection.raw(GeomQuery(filters));
  const DestByOccSumData = await sqlConnection.raw(DestByOccupationQuery(filters));
  const DestByOccData = await sqlConnection.raw(DestByOccupationAllQuery(filters));
  const layersUrl = `https://economy.id.com.au/${clientAlias}/geo/areasbyentityid/7313?ClientID=${ClientID}&WebID=10&LGACode=0&Indkey=${filters.Indkey}`;
  const thematicUrl = `https://economy.id.com.au/${clientAlias}/geo/data?ClientID=${ClientID}&WebID=10&LGACode=0&Indkey=${filters.Indkey}&dataid=383`;
  let mapData = await axios
    .all([axios.get(layersUrl), axios.get(thematicUrl)])
    .then(axios.spread((data, thematic) => ({ layerData: data.data, thematicData: thematic.data })));

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
    layer.layerName = layer.id === 4 ? LongName : layer.layerName;
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
          fillOpacity: 0.7,
          fillColor: options.color,
          dashArray: '2',
        },
        hover: {
          fill: !isMainArea,
          color: '#f00',
          weight: isMainArea ? 3 : 3,
          fillColor: options.color,
          fillOpacity: 0.7,
        },
      };
      const InfoBox = { displayText: [`${options.Number} workers`, `${options.Percentage}%`] };
      shape.shapeOptions = { ...options, styles, InfoBox } || defaultShapeOption;
    });
  });
  layerData.mapHeight = 500;
  layerData.thematic = true;
  return { mapData: layerData, tableData: [DestByOccSumData, DestByOccData] };
};

const activeCustomToggles = ({ filterToggles }) => {
  const activeCustomToggles = {
    currentIndustryName: getActiveToggle(filterToggles, 'Indkey'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Workers place of residence by industry - ${data.currentIndustryName}`;
      },
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string => {
        return `Australian Bureau of Statistics (ABS) – Census 2016 – by journey to work`;
      },
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        const mainArea = contentData.tableData[0].find(({ LabelName }) => LabelName === 'Live and work in the area');
        const total = contentData.tableData[0].find(({ IndustryWebKey }) => IndustryWebKey === 30000);
        return `Of the ${formatNumber(total.Number)} local workers in ${data.prefixedAreaName}, ${formatNumber(
          mainArea.Number,
        )} or ${formatPercent(mainArea.Per)}% also live in the area.`;
      },
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
