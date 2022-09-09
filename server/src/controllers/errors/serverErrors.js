/* eslint-disable no-unused-vars */
const serverError = (err, req, res, next) => {
  res.json({ error: err });
};

module.exports = {
  serverError,
};
