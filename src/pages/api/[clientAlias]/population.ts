import _ from 'lodash';
import { commClient, commDataEconomy } from '../../../server/dbConnection';

const handle = async (req, res) => {
  const { clientAlias } = req.query;
  const clients = await commClient.raw(ClientSQL);
  const client: any = clientFromAlias(clientAlias, clients);
  const navigation = await commClient.raw(MainNavigationSQL({ client }));
  const clientProducts = await commClient.raw(ClientProductsSQL({ client }));

  res.json({ clients, navigation, clientProducts });
};
export default handle;

const ignoreClients = _.isUndefined(process.env.IGNORE_CLIENTS)
  ? []
  : process.env.IGNORE_CLIENTS.split(' ');

const clientFromAlias = (clientAlias, clients) =>
  _.find(clients, { Alias: clientAlias });

const getScopedEnvVar = (scope, db_env_var) =>
  process.env[`${scope}_${db_env_var}`] || process.env[`DEFAULT_${db_env_var}`];

const ClientSQL = `
  WITH RDAS AS (
    SELECT
      DISTINCT(areas.ClientID),
      CASE WHEN RDAs.IsRDA IS NOT NULL THEN 1 ELSE 0 END AS IsRDA
      FROM [CommClient].[dbo].[ClientToAreas_Economy] areas
      LEFT OUTER JOIN (
      SELECT
        DISTINCT(ClientID),
        COUNT(WebID) AS IsRDA
      FROM [CommClient].[dbo].[ClientToAreas_Economy] areas
        WHERE WebID > 50
        GROUP BY (ClientID)
      ) AS RDAs
      ON areas.ClientID = RDAs.ClientID
    )
    SELECT
      client.ClientID,
      client.Name,
      client.ShortName,
      client.LongName,
      client.Alias
    FROM Client AS client
    INNER JOIN ClientAppDisable AS clientMeta
      ON clientMeta.ClientID = client.ClientID
    INNER JOIN RDAS
      ON client.ClientID = RDAS.ClientID
    WHERE clientMeta.IsDisabled = 0

    
      AND clientMeta.ApplicationID = 4
      AND RDAS.IsRDA = 0
    ${ignoreClients
      .map(clientAlias => `  AND NOT client.Alias = '${clientAlias}'`)
      .join('\n')}
`;

const MainNavigationSQL = ({ client }) => `
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
  WHERE ClientID = ${client.ClientID}
`;

const ClientProductsSQL = ({ client }) => `
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
    AND cad.ClientID = ${client.ClientID}
`;
