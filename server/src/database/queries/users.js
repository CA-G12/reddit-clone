const connection = require('../config/connection');

const getAllUsersQuery = (value) => {
  const sql = {
    text: "SELECT id, fname || ' ' || lname as full_name, username, email FROM users WHERE username ILIKE $1",
    values: [`%${value}%`],
  };
  return connection.query(sql);
};

const getPasswordForLogin = (username) => {
  const sql = {
    text: 'SELECT id, password FROM users WHERE username = $1',
    values: [username],
  };
  return connection.query(sql);
};

const insertUser = (username, password, email, fname, lname, phone) => {
  const sql = {
    text: 'INSERT INTO users(username, password, email, fname, lname, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING username',
    values: [username, password, email, fname, lname, phone],
  };
  return connection.query(sql);
};

module.exports = {
  getAllUsersQuery,
  getPasswordForLogin,
  insertUser,
};
