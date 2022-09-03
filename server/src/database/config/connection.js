require('dotenv').config();

const { Pool } = require('pg');

let connectionString = '';
let ssl = false;
const {
  NODE_ENV, DATABASE_URL, DEV_DB_URL, TEST_DB_URL,
} = process.env;

switch (NODE_ENV) {
  case 'prod':
    connectionString = DATABASE_URL;
    ssl = {
      rejectUnauthorized: false,
    };
    break;
  case 'dev':
    connectionString = DEV_DB_URL;
    break;
  case 'test':
    connectionString = TEST_DB_URL;
    break;
  default:
    throw new Error('No database url is provided!');
}

const pool = new Pool({
  connectionString,
  ssl,
});

module.exports = pool;
