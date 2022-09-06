const { getAllPostsController } = require('./posts');
const { getAutoCompleteData } = require('./users');
const { loginController, signupController, logoutController } = require('./auth');

module.exports = {
  getAllPostsController,
  getAutoCompleteData,
  loginController,
  signupController,
  logoutController,
};
