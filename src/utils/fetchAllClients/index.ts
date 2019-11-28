import { sqlConnection } from '../sql';
import * as _ from 'lodash';
const ignoreClients = _.isUndefined(process.env.IGNORE_CLIENTS) ? [] : process.env.IGNORE_CLIENTS.split(' ');
/* #endregion */

/* #region  allclientsSQL Query */
const AllClientsSQL = () => `
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
  ${ignoreClients.map(ClientAlias => `  AND NOT client.Alias = '${ClientAlias}'`).join('\n')}
`;
/* #endregion */

const fetchAllClients = async () => {
  const data = await sqlConnection.raw(AllClientsSQL());
  return data;
};

export default fetchAllClients;
