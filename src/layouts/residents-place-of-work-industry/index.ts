import { sqlConnection } from '../../utils/sql';
import Page from './page';
import axios from 'axios';
import getActiveToggle from '../../utils/getActiveToggle';
import { adjust, formatNumber, formatPercent } from '../../utils';
import _ from 'lodash';
const COM_CLIENT_DB = 'CommClient';

const GeomQuery = ({ ClientID }) => {
  const query = `exec ${COM_CLIENT_DB}.[dbo].[sp_GeomEconomyEnvelopeLGA] ${ClientID}`;
  return query;
};

const DestByIndustryQuery = ({ ClientID, Indkey }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_AD_JTW_Origin_LGA_by_Industry_Summ_2016](${ClientID},10,NULL,${Indkey}) order by LabelKey`;
  return query;
};

const DestByIndustryAllQuery = ({ ClientID, Indkey }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_AD_JTW_Origin_LGA_by_Industry_2016](${ClientID},10,NULL,${Indkey}) Where Number > 9 order by Number DESC`;
  return query;
};
const fetchData = async ({ filters }) => {
  const { clientAlias, LongName, ClientID } = filters;
  const layersUrl = `https://economy.id.com.au/${clientAlias}/geo/areasbyentityid/7328?ClientID=${ClientID}&WebID=10&LGACode=0&Indkey=${filters.Indkey}`;
  const thematicUrl = `https://economy.id.com.au/${clientAlias}/geo/data/residents-place-of-work-Industry?ClientID=${ClientID}&WebID=10&LGACode=0&Indkey=${filters.Indkey}&dataid=386`;
  let mapData = await axios
    .all([axios.get(layersUrl), axios.get(thematicUrl)])
    .then(axios.spread((data, thematic) => ({ layerData: data.data, thematicData: thematic.data })));

  const geomData = await sqlConnection.raw(GeomQuery(filters));
  const DestByOccData = await sqlConnection.raw(DestByIndustryAllQuery(filters));
  const DestByOccSumData = await sqlConnection.raw(DestByIndustryQuery(filters));

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
    currentOccupationName: getActiveToggle(filterToggles, 'Indkey'),
  };
  return activeCustomToggles;
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => {
        return `Residents place of work by industry - ${data.currentOccupationName}`;
      },
    },
    {
      Title: 'DataSource',
      renderString: ({ data }): string => {
        return `Australian Bureau of Statistics (ABS) – Census 2016 – by place to work`;
      },
    },
    {
      Title: 'Headline',
      renderString: ({ data, contentData, filters }): string => {
        console.log('filters: ', filters);
        const occupationText = +filters.Indkey === 23000 ? '' : ` in ${data.currentOccupationName}`;
        const mainArea = contentData.tableData[0].find(({ LabelKey }) => LabelKey === 3);
        return `${formatNumber(mainArea.Number)} or ${formatPercent(mainArea.Per)}% of ${
          data.prefixedAreaName
        }’s resident workers ${occupationText} travel outside of the area to work.`;
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
  ],
};

export { fetchData, activeCustomToggles, Page, pageContent };
