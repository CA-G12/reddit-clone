const { updateVotes, getVotesByPost } = require('./votes');
const { getPostGeneratorPage, getUsersProfile } = require('./pages');
const { getAllPostsController, addNewPost } = require('./posts');
const { getAutoCompleteData } = require('./users');
const { handleProfileInfo } = require('./general');
const { loginController, signupController, logoutController } = require('./auth');

module.exports = {
  getAllPostsController,
  getAutoCompleteData,
  loginController,
  signupController,
  logoutController,
  updateVotes,
  getPostGeneratorPage,
  getUsersProfile,
  addNewPost,
  getVotesByPost,
  handleProfileInfo,
};
