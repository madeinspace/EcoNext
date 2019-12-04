import knex from 'knex';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const getScopedEnvVar = (scope, db_env_var) => {
  return process.env[`${scope}_${db_env_var}`] || process.env[`DEFAULT_${db_env_var}`];
};

const client = 'mssql';
const connection = {
  host: getScopedEnvVar('CLIENT', 'DATABASE_HOST'),
  user: getScopedEnvVar('CLIENT', 'DATABASE_USER'),
  password: getScopedEnvVar('CLIENT', 'DATABASE_PASS'),
  database: getScopedEnvVar('CLIENT', 'DATABASE_NAME'),
  requestTimeout: 0,
  options: { encrypt: false },
};
const acquireConnectionTimeout = 600000;
const DBConnection = {
  client,
  connection,
  acquireConnectionTimeout,
};

export const sqlConnection = knex(DBConnection);
