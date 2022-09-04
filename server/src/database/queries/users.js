const connection = require('../config/connection');

const getAllUsersQuery = (value) => {
  const sql = {
    text: "SELECT id, fname || ' ' || lname as full_name, username, email FROM users WHERE username ILIKE $1",
    values: [`%${value}%`],
  };
  return connection.query(sql);
};

module.exports = {
  getAllUsersQuery,
};
