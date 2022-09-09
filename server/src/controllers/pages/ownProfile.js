const { join } = require('path');

const jwt = require('jsonwebtoken');
const CustomizedError = require('../../utils/customizedError');

const getOwnProfile = (req, res) => {
  const { token } = req.cookies;
  const { username } = req.params;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) throw new CustomizedError(402, 'Wrong credentials');
    if (decoded) {
      if (username === decoded.username) {
        res.sendFile(join(__dirname, '..', '..', '..', '..', 'private', 'profile', 'index.html'));
      } else {
        throw new CustomizedError(401, 'Not the owner of the account');
      }
    }
  });
};

module.exports = {
  getOwnProfile,
};
