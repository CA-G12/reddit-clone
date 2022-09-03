const { getAllPosts } = require('../database/queries');

const CustomizedError = require('../utils/customizedError');

const getAllPostsController = (req, res, next) => {
  const { token } = req.cookies;
  if (token) res.isLoggedIn = true;
  else res.isLoggedIn = false;

  getAllPosts()
    .then((data) => res.json(data.rows))
    .catch((error) => {
      console.log(error, 'getAllPostsController!!!');
      next(new CustomizedError(400, 'Bad query request!'));
    });
};

module.exports = { getAllPostsController };
