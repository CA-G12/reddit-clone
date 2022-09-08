const connection = require('../../config/connection');

const getPasswordForLogin = (username) => {
  const sql = {
    text: 'SELECT id, password FROM users WHERE username = $1',
    values: [username],
  };
  return connection.query(sql);
};

module.exports = {
  getPasswordForLogin,
};
