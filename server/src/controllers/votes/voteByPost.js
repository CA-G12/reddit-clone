const { getVotesForPost } = require('../../database/queries');
const CustomizedError = require('../../utils/customizedError');

const getVotesByPost = (req, res, next) => {
  getVotesForPost(req.body.id)
    .then((data) => {
      const upperVoteCount = data.rows[0].upper_count === null ? 0 : +data.rows[0].upper_count;
      const lowerVoteCount = data.rows[0].lower_count === null ? 0 : +data.rows[0].lower_count;
      const votes = upperVoteCount - lowerVoteCount;
      res.json({ votes });
    }).catch(() => next(new CustomizedError(400, 'Bad request!')));
};

module.exports = {
  getVotesByPost,
};
