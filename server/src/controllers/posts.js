require('dotenv').config();
const jwt = require('jsonwebtoken');

const { getAllPosts } = require('../database/queries');

const CustomizedError = require('../utils/customizedError');

const getAllPostsController = (req, res, next) => {
  const { token } = req.cookies;
  let isLoggedIn = false;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) isLoggedIn = false;
    if (decoded) isLoggedIn = true;
  });

  getAllPosts()
    .then((data) => {
      const returnedObj = {
        isLoggedIn,
        rows: data.rows,
      };
      res.json(returnedObj);
    })
    .catch((error) => {
      console.log(error, 'getAllPostsController!!!');
      next(new CustomizedError(400, 'Bad query request!'));
    });
};

module.exports = { getAllPostsController };
