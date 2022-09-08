const { updateVoteQuery } = require('../../database/queries');
const CustomizedError = require('../../utils/customizedError');

const updateVotes = (req, res, next) => {
  updateVoteQuery(req.body)
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      next(new CustomizedError(400, 'Bad request!!!'));
    });
};

module.exports = {
  updateVotes,
};
