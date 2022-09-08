const { getAllUsersQuery } = require('./allUsers');
const { getPasswordForLogin } = require('./getPassword');
const { insertUser } = require('./insertUser');

module.exports = {
  getAllUsersQuery,
  getPasswordForLogin,
  insertUser,
};
