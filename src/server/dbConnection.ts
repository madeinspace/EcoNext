import knex from 'knex';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const getScopedEnvVar = (scope, db_env_var) => {
  return (
    process.env[`${scope}_${db_env_var}`] ||
    process.env[`DEFAULT_${db_env_var}`]
  );
};

const CommClientDBConnection = () => ({
  client: 'mssql',
  connection: {
    host: getScopedEnvVar('CLIENT', 'DATABASE_HOST'),
    user: getScopedEnvVar('CLIENT', 'DATABASE_USER'),
    password: getScopedEnvVar('CLIENT', 'DATABASE_PASS'),
    database: getScopedEnvVar('CLIENT', 'DATABASE_NAME'),
    requestTimeout: 0,
    options: { encrypt: false }
  },
  acquireConnectionTimeout: 600000
});

const CommDataEconomyDBConnection = () => ({
  client: 'mssql',
  connection: {
    host: getScopedEnvVar('DATA', 'DATABASE_HOST'),
    user: getScopedEnvVar('DATA', 'DATABASE_USER'),
    password: getScopedEnvVar('DATA', 'DATABASE_PASS'),
    database: getScopedEnvVar('DATA', 'DATABASE_NAME'),
    requestTimeout: 0,
    options: { encrypt: false }
  },
  acquireConnectionTimeout: 600000
});

export const commDataEconomy = knex(CommDataEconomyDBConnection());
export const commClient = knex(CommClientDBConnection());
