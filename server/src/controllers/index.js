const { getAllPostsController } = require('./posts');
const { getAutoCompleteData } = require('./users');
const { loginController } = require('./auth');

module.exports = {
  getAllPostsController,
  getAutoCompleteData,
  loginController,
};
