/* eslint-disable no-unused-vars */
const { join } = require('path');

const serverError = (err, req, res, next) => {
  res.cookie('status', err.status);
  res.cookie('message', err.message);
  res.sendFile(join(__dirname, '..', '..', '..', '..', 'public', '500.html'));
};

module.exports = {
  serverError,
};
