const { getAllUsersQuery } = require('../../database/queries/users');
const CustomizedError = require('../../utils/customizedError');

const getAutoCompleteData = (req, res, next) => {
  const { value } = req.query;
  getAllUsersQuery(value)
    .then((data) => res.json(data.rows))
    .catch(() => next(new CustomizedError(400, 'Bad query request!!!')));
};

module.exports = {
  getAutoCompleteData,
};
