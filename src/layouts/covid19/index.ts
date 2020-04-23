import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatShortDecimal } from '../../utils';
import axios from 'axios';
const DATABASE = 'WebProfile';

const newDataQuery = () => `exec ${DATABASE}.[dbo].[spGetNewsByApplicationID] 4`;

const fetchData = async ({ filters, clientAlias, mapLayers }) => {
  const newsData = await sqlConnection.raw(newDataQuery());

  return { newsData };
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
