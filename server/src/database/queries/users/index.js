const { getUserInfo } = require('./userInfo');
const { getPasswordForLogin } = require('./getPassword');
const { insertUser } = require('./insertUser');

module.exports = {
  getUserInfo,
  getPasswordForLogin,
  insertUser,
};
