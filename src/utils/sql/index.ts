import knex from 'knex';

const client = 'mssql';
const host = `${process.env.DEFAULT_DATABASE_HOST}`;
const user = `${process.env.DEFAULT_DATABASE_USER}`;
const password = `${process.env.DEFAULT_DATABASE_PASS}`;
const database = `${process.env.DEFAULT_DATABASE_NAME}`;
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
