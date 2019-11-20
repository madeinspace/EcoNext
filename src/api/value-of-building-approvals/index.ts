import _ from 'lodash';
import { commClient, commDataEconomy } from '../../server/dbConnection';

const fetchData = async filters => {
  const { clientAlias } = filters;
  const client = await commClient
    .raw(ClientSQL({ clientAlias }))
    .then(res => res[0]);
  const ClientID = client.ClientID;
  const WebID = 10;
  const navigation = await commClient.raw(MainNavigationSQL({ ClientID }));
  const clientProducts = await commClient.raw(ClientProductsSQL({ ClientID }));
  const sitemapGroups = await commDataEconomy.raw(SitemapGroupsSQL());
  const tableData = await commDataEconomy.raw(
    BuildingApprovalsSQL({ ClientID, WebID })
  );

  return {
    client,
    tableData,
    navigation,
    clientProducts,
    filters,
    sitemapGroups
  };
};

export default fetchData;

const ignoreClients = _.isUndefined(process.env.IGNORE_CLIENTS)
  ? []
  : process.env.IGNORE_CLIENTS.split(' ');

const clientFromAlias = (clientAlias, clients) =>
  _.find(clients, { Alias: clientAlias });

const getScopedEnvVar = (scope, db_env_var) =>
  process.env[`${scope}_${db_env_var}`] || process.env[`DEFAULT_${db_env_var}`];

/* #region ClientSQL*/
const ClientSQL = ({ clientAlias }) => `
  SELECT
    client.ClientID,
    client.Name,
    client.ShortName,
    client.LongName,
    client.Alias
  FROM Client AS client
  INNER JOIN CommClient.dbo.ClientAppDisable AS clientMeta
    ON clientMeta.ClientID = client.ClientID
  WHERE clientMeta.IsDisabled = 0
    AND clientMeta.ApplicationID = 4
    AND Alias = '${clientAlias}'
`;
/* #endregion */

/* #region  MainNavigationSQL */
const MainNavigationSQL = ({ ClientID }) => `
SELECT [ClientID]
  ,cp.[PageID]
  ,COALESCE(cp.[Alias], p.Alias) AS Alias
  ,p.ParentPageID
  ,p.MenuTitle
  ,[Disabled]
  ,pg.Name AS GroupName
FROM [CommClient].[dbo].[ClientPage] cp
RIGHT JOIN [CommApp].dbo.Page p 
  ON cp.pageId = p.pageID 
INNER JOIN [CommApp].[dbo].[PageGroup] pg
  ON p.PageGroupID = pg.PageGroupID
  AND p.ApplicationID = 4
WHERE ClientID = ${ClientID}
`;
/* #endregion */

/* #region  ClientProductsSQL */
const ClientProductsSQL = ({ ClientID }) => `
  SELECT 
     c.Alias AS Alias
    ,c.name AS ClientLongName
    ,c.ShortName AS ClientShortName
    ,cad.ClientID
    ,cad.ApplicationID
    ,a.SubDomainName
    ,a.FullName AS ProductName
  FROM CommClient.dbo.ClientAppDisable AS cad
  LEFT OUTER JOIN [CommApp].[dbo].[Application] AS a 
    ON cad.ApplicationID = a.ApplicationID
  LEFT OUTER JOIN [CommClient].[dbo].[Client] AS c
    ON cad.ClientID = c.ClientID
  WHERE cad.IsDisabled = 0
    AND cad.ClientID = ${ClientID}
`;
/* #endregion */

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
