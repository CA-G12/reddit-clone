const { updateVotes, getVotesByPost } = require('./votes');
const { getPostGeneratorPage } = require('./pages');
const { getAllPostsController, addNewPost } = require('./posts');
const { getAutoCompleteData } = require('./users');
const { loginController, signupController, logoutController } = require('./auth');

module.exports = {
  getAllPostsController,
  getAutoCompleteData,
  loginController,
  signupController,
  logoutController,
  updateVotes,
  getPostGeneratorPage,
  addNewPost,
  getVotesByPost,
};
