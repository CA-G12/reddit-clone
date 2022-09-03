require('dotenv').config();

const jwt = require('jsonwebtoken');

const customizedError = require('./customizedError');

const secretKey = process.env.SECRET_KEY;

const generateToken = (userObj, cb) => jwt.sign(
  { id: userObj.id, username: userObj.username },
  secretKey,
  { expiresIn: '365 days' },
  cb,
);

const verifyAccessToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) next(customizedError(401, 'Unauthenticated'));

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) next(customizedError(401, 'Unauthenticated'));
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateToken,
  verifyAccessToken,
};
