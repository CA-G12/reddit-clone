require('dotenv').config();

const bcrypt = require('bcrypt');

const salt = process.env.HASH_SALT;

const hashPassword = (password) => bcrypt.hash(password, salt);

const comparePasswords = (password, hashed) => bcrypt.compare(password, hashed);

module.exports = {
  hashPassword,
  comparePasswords,
};
