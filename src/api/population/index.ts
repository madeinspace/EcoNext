import _ from 'lodash';
import { commClient, commDataEconomy } from '../../server/dbConnection';

const fetchData = async filters => {
  const { clientAlias } = filters;
  const client = await commClient
    .raw(ClientSQL({ clientAlias }))
    .then(res => res[0]);
  const ClientID = client.ClientID;
  const navigation = await commClient.raw(MainNavigationSQL({ ClientID }));
  const clientProducts = await commClient.raw(ClientProductsSQL({ ClientID }));
  const sitemapGroups = await commDataEconomy.raw(SitemapGroupsSQL());
  const tableData = await commDataEconomy.raw(PopulationDataSQL({ ClientID }));

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

const PopulationDataSQL = ({ ClientID }) => `
  With CTE AS (
    select 
      [ClientID]
      ,[WebID]
      ,[GeoName]
      ,[Year]
      ,[Number]
      ,CASE WHEN [WebID] = 10 THEN 1 ELSE 2 END as [GeoType]
    from CommData_Economy.[dbo].[v_IN_ERPPivot]
    where WebID IN (10, 40, 50)
      AND ClientID = ${ClientID}
  ),
  CTE2 AS (
    select [ClientID]
      ,[WebID]
      ,[GeoName]
      ,[Year] + 1 as [Year]
      ,[Number]
      ,[GeoType]
    from CTE
  )
  
  select C.ClientID as ClientID
    ,C.WebID as ClientWebID
    ,C.Geoname as ClientGeoName
    ,C.Year as ClientYear
    ,C.Number as ClientNumber
    ,C.ChangeYear1Year2 as ClientChangeYear1Year2
    ,C.Changeper as ClientChangeper
    
    ,BM.WebID as BenchmarkWebID
    ,BM.Geoname as BenchmarkGeoName
    ,BM.Year as BenchmarkYear
    ,BM.Number as BenchmarkNumber
    ,BM.ChangeYear1Year2 as BenchmarkChangeYear1Year2
    ,BM.Changeper as BenchmarkChangeper
    
    ,AUS.WebID as AusWebID
    ,AUS.Geoname as AusGeoName
    ,AUS.Year as AusYear
    ,AUS.Number as AusNumber
    ,AUS.ChangeYear1Year2 as AusChangeYear1Year2
    ,AUS.Changeper as AusChangeper
  from (
    SELECT CTE_1.ClientID, 
      CTE_1.WebID,
      CTE_1.GeoName, 
      CTE_1.Year, 
      CTE_1.Number,
      CTE_1.Number  - CTE4.Number as  ChangeYear1Year2,
      (CAST((CTE_1.Number - CTE4.Number) as float)/CTE4.Number)*100 as ChangePer
    from CTE as CTE_1 
    Left Hash Join CTE2 as CTE4
            on  CTE_1.ClientId = CTE4.ClientId
            and CTE_1.Webid = CTE4.Webid
            and CTE_1.Year = CTE4.Year
    where CTE_1.webid=10
  ) as C
    
  inner join (
    SELECT CTE_1.ClientID, 
      CTE_1.WebID,
      CTE_1.GeoName,
      CTE_1.Year, 
      CTE_1.Number,
      CTE_1.Number  - CTE4.Number as  ChangeYear1Year2,
      (CAST((CTE_1.Number - CTE4.Number) as float)/CTE4.Number)*100 as ChangePer
    from CTE as CTE_1 
    Left Hash Join CTE2 as CTE4 on CTE_1.ClientId = CTE4.ClientId and  CTE_1.Webid = CTE4.Webid and  CTE_1.Year = CTE4.Year
    where CTE_1.WebID=40
  ) as BM
    on  C.ClientID=BM.ClientID
    AND C.Year=BM.Year
  
  inner join (
    SELECT CTE_1.ClientID, 
      CTE_1.WebID,
      CTE_1.GeoName,
      CTE_1.Year, 
      CTE_1.Number,
      CTE_1.Number  - CTE4.Number as  ChangeYear1Year2,
      (CAST((CTE_1.Number - CTE4.Number) as float)/CTE4.Number)*100 as ChangePer
    from CTE as CTE_1 
    Left Hash Join CTE2 as CTE4 on CTE_1.ClientId = CTE4.ClientId and  CTE_1.Webid = CTE4.Webid and  CTE_1.Year = CTE4.Year
    where CTE_1.WebID=50
  ) as AUS
    on  C.Year=AUS.Year
    AND C.ClientID=AUS.ClientID

    ORDER BY ClientID, ClientYear ASC
            `;