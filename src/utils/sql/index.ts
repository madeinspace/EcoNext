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

const debug = process.env.NODE_ENV === 'development';
const log = debug
  ? {
      error(message) {
        console.log('Knex Error: ', message);
      },
      debug(message) {
        console.log('Knex Debug: ', message);
      },
    }
  : {};

const acquireConnectionTimeout = 600000;

const DBConnection = {
  log,
  debug,
  client,
  connection,
  acquireConnectionTimeout,
  pool: {
    min: 2,
    max: 50,
  },
};

export const sqlConnection = knex(DBConnection);
