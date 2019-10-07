import _ from 'lodash';

const DEFAULT_DATABASE_HOST = '192.168.16.15';
const DEFAULT_DATABASE_USER = 'CommUser';
const DEFAULT_DATABASE_PASS = 'idCommUser&1admin';
const DEFAULT_DATABASE_NAME = 'CommClient';
const DATA_DATABASE_NAME = 'CommData_Economy';
const COMMAPP_DATABASE_NAME = 'CommApp';

const handle = async (req, res) => {
  console.log('host', getScopedEnvVar('CLIENT', 'DATABASE_HOST'));
  const clients = await knex(CommClientDBConnection()).raw(ClientSQL);

  res.json({ title: 'Hello World', clients });
};

const knex = require('knex');

const ignoreClients = _.isUndefined(process.env.IGNORE_CLIENTS)
  ? []
  : process.env.IGNORE_CLIENTS.split(' ');

const getScopedEnvVar = (scope, db_env_var) =>
  process.env[`${scope}_${db_env_var}`] || process.env[`DEFAULT_${db_env_var}`];

const CommClientDBConnection = () => ({
  client: 'mssql',
  connection: {
    host: DEFAULT_DATABASE_HOST,
    user: DEFAULT_DATABASE_USER,
    password: DEFAULT_DATABASE_PASS,
    database: DEFAULT_DATABASE_NAME,
    options: { encrypt: false }
  }
});
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
