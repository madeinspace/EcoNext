import { sqlConnection } from '../../utils/sql';
import Page from './page';
import { formatShortDecimal } from '../../utils';
import axios from 'axios';
const DATABASE = 'WebProfile';

const newDataQuery = () => `exec ${DATABASE}.[dbo].[spGetNewsByApplicationID] 4`;

const topThreeQuery = ({ ClientID, WebID = 10, BMID = 40 }) => `
  select * from CommData_Economy.[dbo].[fn_COVID19_Headline_Industry_Top3](${+ClientID},${+WebID},${+BMID}) ORDER BY QtrChg DESC
`;
const headlineQuery = ({ ClientID, WebID = 10, BMID = 40 }) => {
  const query = `select * from CommData_Economy.[dbo].[fn_COVID19_Headline](${+ClientID},${+WebID},${+BMID})`;
  console.log('query: ', query);
  return query;
};

const fetchData = async ({ filters, clientAlias, mapLayers }) => {
  const newsData = await sqlConnection.raw(newDataQuery());
  const topThreeData = await sqlConnection.raw(topThreeQuery(filters));
  const headlineData = await sqlConnection.raw(headlineQuery(filters));
  return { newsData, topThreeData, headlineData };
};

const pageContent = {
  entities: [
    {
      Title: 'SubTitle',
      renderString: ({ data }): string => `COVID-19 Economic Outlook Tool (Last updated 23/04/2020)`,
    },
  ],
  filterToggles: [],
};

export { fetchData, Page, pageContent };
