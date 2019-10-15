import knex from 'knex';

const DEFAULT_DATABASE_HOST = '192.168.16.15';
const DEFAULT_DATABASE_USER = 'CommUser';
const DEFAULT_DATABASE_PASS = 'idCommUser&1admin';
const DEFAULT_DATABASE_NAME = 'CommClient';
const DATA_DATABASE_NAME = 'CommData_Economy';
const COMMAPP_DATABASE_NAME = 'CommApp';

const CommDataEconomyDBConnection = () => ({
  client: 'mssql',
  connection: {
    host: DEFAULT_DATABASE_HOST,
    user: DEFAULT_DATABASE_USER,
    password: DEFAULT_DATABASE_PASS,
    database: DEFAULT_DATABASE_NAME,
    requestTimeout: 0,
    options: { encrypt: false }
  },
  acquireConnectionTimeout: 600000
});

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

const getScopedEnvVar = (scope, db_env_var) =>
  process.env[`${scope}_${db_env_var}`] || process.env[`DEFAULT_${db_env_var}`];

export const commDataEconomy = knex(CommDataEconomyDBConnection());
export const commClient = knex(CommClientDBConnection());
