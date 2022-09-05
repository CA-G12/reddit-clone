const { join } = require('path');
const { readFileSync } = require('fs');

const connection = require('./connection');

const buildFkeData = () => {
  const sql = readFileSync(join(__dirname, 'fakeData.sql'), { encoding: 'utf-8' });
  return connection.query(sql);
};

module.exports = buildFkeData;
