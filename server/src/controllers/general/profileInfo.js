const { getProfileInfo } = require('../../database/queries');
const CustomizedError = require('../../utils/customizedError');

const handleProfileInfo = (req, res) => {
  const { username } = req.query;
  getProfileInfo(username)
    .then((data) => res.json(data.rows))
    .catch(() => {
      throw new CustomizedError(400, 'Bad request!!!');
    });
};

module.exports = {
  handleProfileInfo,
};
