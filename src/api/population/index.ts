import _ from 'lodash';
import { sqlConnection } from '../../utils/sql';
import fetchNavigation from '../../utils/fetchNavigation';
import fetchClientData from '../../utils/fetchClientData';
import fetchSitemap from '../../utils/fetchSitemap';

const fetchData = async ({ containers, ...filters }) => {
  const { clientAlias, WebID, IGBMID } = filters;

  const client = await fetchClientData({ clientAlias, containers });

  const { ClientID, Applications, Pages } = client;

  const navigation = await fetchNavigation({ containers, Pages });
  const sitemapGroups = await fetchSitemap();

  const tableData = await sqlConnection.raw(PopulationDataSQL({ ClientID, WebID, IGBMID }));

  return {
    client,
    tableData,
    navigation,
    clientProducts: Applications,
    filters: { clientAlias },
    sitemapGroups,
  };
};

export default fetchData;

const PopulationDataSQL = ({ ClientID, WebID, IGBMID }) => `
  select * from CommData_Economy.[dbo].[fn_IN_ERPPivot](${+ClientID},${+WebID},${+IGBMID})
`;
