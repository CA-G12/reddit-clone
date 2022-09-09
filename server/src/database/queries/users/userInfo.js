const connection = require('../../config/connection');

const getUserInfo = (username) => {
  const sql = {
    text: "SELECT id, fname || ' ' || lname as full_name, username, email FROM users WHERE username ILIKE $1",
    values: [`%${username}%`],
  };
  return connection.query(sql);
};

module.exports = {
  getUserInfo,
};
