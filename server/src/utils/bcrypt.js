const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hash(password, 12);

const comparePasswords = (password, hashed) => bcrypt.compare(password, hashed);

module.exports = {
  hashPassword,
  comparePasswords,
};
