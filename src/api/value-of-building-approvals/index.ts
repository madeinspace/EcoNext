import _ from 'lodash';
import { commClient, commDataEconomy } from '../../utils/sql';
import fetchNavigation from '../../utils/fetchNavigation';
import fetchClientData from '../../utils/fetchClientData';

const fetchData = async ({ containers, ...filters }) => {
  const { clientAlias } = filters;

  const client = await fetchClientData({ clientAlias, containers });

  const { ClientID, Pages, Applications } = client;

  const WebID = 10;

  const navigation = await fetchNavigation({ containers, Pages });

  const sitemapGroups = await commDataEconomy.raw(SitemapGroupsSQL());
  const tableData = await commDataEconomy.raw(BuildingApprovalsSQL({ ClientID, WebID }));

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

/* #region  SitemapGroupsSQL */
const SitemapGroupsSQL = () => `
  SELECT TOP (1000) [ApplicationID]
    ,[GroupName]
    ,[SitemapName]
    ,[ColNumber]
    ,[SortOrder]
    ,[Pages]
  FROM [CommApp].[dbo].[SitemapInfo]
  where SitemapName like 'footer'
  and ApplicationID = 4
`;
/* #endregion */

const BuildingApprovalsSQL = ({ ClientID, WebID }) => `
 SELECT * from CommData_Economy.[dbo].[fn_IN_BuildingApprovals](${ClientID}, ${WebID}, 40 )
`;
