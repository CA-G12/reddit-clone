const { getAllPostsController } = require('./posts');
const { getAutoCompleteData } = require('./users');
const { loginController, signupController } = require('./auth');

module.exports = {
  getAllPostsController,
  getAutoCompleteData,
  loginController,
  signupController,
};
