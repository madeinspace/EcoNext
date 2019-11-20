import _ from 'lodash';
import { commClient, commDataEconomy } from '../../utils/sql';
import fetchNavigation from '../../utils/fetchNavigation';
import fetchClientData from '../../utils/fetchClientData';

const fetchData = async ({ containers, ...filters }) => {
  const { clientAlias } = filters;

  const client = await fetchClientData({ clientAlias, containers });

  const { ClientID, Pages } = client;

  const WebID = 10;

  const navigation = await fetchNavigation({ containers, Pages });

  const clientProducts = await commClient.raw(ClientProductsSQL({ ClientID }));
  const sitemapGroups = await commDataEconomy.raw(SitemapGroupsSQL());
  const tableData = await commDataEconomy.raw(BuildingApprovalsSQL({ ClientID, WebID }));

  return {
    client,
    tableData,
    navigation,
    clientProducts,
    filters,
    sitemapGroups,
  };
};

export default fetchData;

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
