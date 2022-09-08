const jwt = require('jsonwebtoken');

const { getProfileInfo } = require('../../database/queries');
const CustomizedError = require('../../utils/customizedError');

const handleProfileInfo = (req, res) => {
  const { token } = req.cookies;
  let isLoggedIn = false;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) isLoggedIn = false;
    if (decoded) isLoggedIn = true;
  });

  const { username } = req.query;
  getProfileInfo(username)
    .then((data) => {
      const dataToSend = {
        isLoggedIn,
        data: data.rows,
      };
      res.json(dataToSend);
    })
    .catch(() => {
      throw new CustomizedError(400, 'Bad request!!!');
    });
};

module.exports = {
  handleProfileInfo,
};
