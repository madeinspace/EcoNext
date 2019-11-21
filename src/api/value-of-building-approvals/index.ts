import _ from 'lodash';
import { sqlConnection } from '../../utils/sql';
import fetchNavigation from '../../utils/fetchNavigation';
import fetchClientData from '../../utils/fetchClientData';
import fetchSitemap from '../../utils/fetchSitemap';

const fetchData = async ({ containers, ...filters }) => {
  const { clientAlias } = filters;

  const client = await fetchClientData({ clientAlias, containers });

  const { ClientID, Pages, Applications } = client;

  const WebID = 10;

  const navigation = await fetchNavigation({ containers, Pages });
  const sitemapGroups = await fetchSitemap();

  const tableData = await sqlConnection.raw(BuildingApprovalsSQL({ ClientID, WebID }));

  return {
    client,
    tableData,
    navigation,
    clientProducts: Applications,
    filters,
    sitemapGroups,
  };
};

export default fetchData;

const BuildingApprovalsSQL = ({ ClientID, WebID }) => `
 SELECT * from CommData_Economy.[dbo].[fn_IN_BuildingApprovals](${ClientID}, ${WebID}, 40 )
`;
