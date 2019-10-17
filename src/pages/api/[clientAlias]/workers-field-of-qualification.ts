import _ from 'lodash';
const knex = require('knex');
import { commClient, commDataEconomy } from '../../../server/dbConnection';

const handle = async (req, res) => {
  const { clientAlias, Indkey, IGBMID, Sex } = req.query;
  const clients = await commClient.raw(ClientSQL);
  const client: any = clientFromAlias(clientAlias, clients);
  const navigation = await commClient.raw(MainNavigationSQL({ client }));
  const Industries = await commDataEconomy.raw(BenchMarkIndustriesQuery(40));
  const IGBM = await commDataEconomy.raw(BenchMarkGeoQuery(client.ClientID));
  const Sexes = [
    { ID: 1, Name: 'Males' },
    { ID: 2, Name: 'Females' },
    { ID: 3, Name: 'Persons' }
  ];
  const clientProducts = await commClient.raw(ClientProductsSQL({ client }));
  const tableData = await commDataEconomy.raw(
    tableDataQuery({
      ClientID: client.ClientID,
      IGBMID,
      Indkey,
      Sex
    })
  );

  res.json({
    title: 'Workers fields of qualification',
    clients,
    tableData,
    Industries,
    IGBM,
    Sexes,
    navigation,
    clientProducts
  });
};

const clientFromAlias = (clientAlias, clients) =>
  _.find(clients, { Alias: clientAlias });

const ignoreClients = _.isUndefined(process.env.IGNORE_CLIENTS)
  ? []
  : process.env.IGNORE_CLIENTS.split(' ');

export default handle;

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

const BenchMarkIndustriesQuery = IGBMID => `
  SELECT
    CAST(23000 AS INT) AS ID,
    'All industries' AS Name
  WHERE 23000 != ${IGBMID}
  UNION
  SELECT
    CAST(I.IndustryWebKey as INT) AS ID,
    I.IndustryWebName AS Name
  FROM CommData_Economy.dbo.vS_IndustryCodes AS I
  INNER JOIN CommData_Economy.dbo.vS_IndustryCodesParents AS IP
      ON I.Industrycode = IP.IndustryCode
  WHERE I.IndustryWebKey != ${IGBMID} AND (I.IndustryWebKey NOT IN(23020,23045))
    AND I.IndustryWebKey = IP.IndustryWebKey
`;

const BenchMarkGeoQuery = ClientID =>
  `
    SELECT
      WebID AS ID,
      GeoName AS Name
    FROM [CommClient].[dbo].[ClientToAreas_Economy]
    WHERE ClientID = ${ClientID}
    AND NOT WebID = 10
  `;

const tableDataQuery = ({ ClientID, IGBMID, Sex, Indkey }) =>
  `select * from CommData_Economy.[dbo].[fn_Industry_StudyField1and3Digit_Sex](
    ${ClientID},
    10,
    ${IGBMID},
    2016,
    2011,
    'WP',
    ${Sex},
    1,
    null,
    ${Indkey}
    ) order by LabelKey
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
