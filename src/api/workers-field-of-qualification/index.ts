/* #region imports*/
import _ from 'lodash';
const knex = require('knex');
import { commClient, commDataEconomy } from '../../utils/sql';
import fetchNavigation from '../../utils/fetchNavigation';
/* #endregion */

const fetchData = async ({ containers, ...filters }) => {
  const { clientAlias, Indkey, IGBMID, Sex } = filters;

  const client = await commClient.raw(ClientSQL({ clientAlias })).then(res => res[0]);
  const ClientID = client.ClientID;

  const navigation = await fetchNavigation({ ClientID, containers });

  const Industries = await commDataEconomy.raw(BenchMarkIndustriesQuery(40));
  const IGBM = await commDataEconomy.raw(BenchMarkGeoQuery(ClientID));
  const sitemapGroups = await commDataEconomy.raw(SitemapGroupsSQL());

  const Sexes = [
    { ID: 1, Name: 'Males' },
    { ID: 2, Name: 'Females' },
    { ID: 3, Name: 'Persons' },
  ];

  const clientProducts = await commClient.raw(ClientProductsSQL({ ClientID }));
  const tableData = await commDataEconomy.raw(
    tableDataQuery({
      ClientID,
      IGBMID,
      Indkey,
      Sex,
    }),
  );

  return {
    title: 'Workers fields of qualification',
    client,
    tableData,
    Industries,
    IGBM,
    Sexes,
    navigation,
    clientProducts,
    sitemapGroups,
    filters,
  };
};

export default fetchData;

const ignoreClients = _.isUndefined(process.env.IGNORE_CLIENTS) ? [] : process.env.IGNORE_CLIENTS.split(' ');
/* #endregion */
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

/* #region  allclientsSQL Query */
const AllClientsSQL = `
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
  INNER JOIN CommClient.dbo.ClientAppDisable AS clientMeta
    ON clientMeta.ClientID = client.ClientID
  INNER JOIN RDAS
    ON client.ClientID = RDAS.ClientID
  WHERE clientMeta.IsDisabled = 0
    AND clientMeta.ApplicationID = 4
    AND RDAS.IsRDA = 0
  ${ignoreClients.map(clientAlias => `  AND NOT client.Alias = '${clientAlias}'`).join('\n')}
`;
/* #endregion */

/* #region  BenchMarkIndustriesQuery */
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
/* #endregion */

/* #region  BenchMarkGeoQuery */
const BenchMarkGeoQuery = ClientID =>
  `
    SELECT
      WebID AS ID,
      GeoName AS Name
    FROM [CommClient].[dbo].[ClientToAreas_Economy]
    WHERE ClientID = ${ClientID}
    AND NOT WebID = 10
  `;
/* #endregion */

/* #region  tableDataQuery */
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
