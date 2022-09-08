const connection = require('../../config/connection');

const insertUser = (username, password, email, fname, lname, phone) => {
  const sql = {
    text: 'INSERT INTO users(username, password, email, fname, lname, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING username',
    values: [username, password, email, fname, lname, phone],
  };
  return connection.query(sql);
};

module.exports = {
  insertUser,
};
