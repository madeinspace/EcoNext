import knex from 'knex';

const path = `.env.${process.env.NODE_ENV}`;
require('dotenv').config({ path });

const getScopedEnvVar = (scope, db_env_var) => {
  return process.env[`${scope}_${db_env_var}`] || process.env[`DEFAULT_${db_env_var}`];
};

const client = 'mssql';
const host = getScopedEnvVar('CLIENT', 'DATABASE_HOST');
const user = getScopedEnvVar('CLIENT', 'DATABASE_USER');
const password = getScopedEnvVar('CLIENT', 'DATABASE_PASS');
const database = getScopedEnvVar('CLIENT', 'DATABASE_NAME');
const requestTimeout = 0;
const options = { encrypt: false };

const connection = {
  host,
  user,
  password,
  database,
  requestTimeout,
  options,
};

const acquireConnectionTimeout = 600000;
const DBConnection = {
  client,
  connection,
  acquireConnectionTimeout,
};

export const sqlConnection = knex(DBConnection);
