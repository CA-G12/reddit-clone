const { updateVotes, getVotesByPost } = require('./votes');
const { getPostGeneratorPage, getUsersProfile, getOwnProfile } = require('./pages');
const { getAllPostsController, addNewPost, deletePost } = require('./posts');
const { getAutoCompleteData } = require('./users');
const { handleProfileInfo, ownProfileData, redirectErrorData } = require('./general');
const { loginController, signupController, logoutController } = require('./auth');
const { serverError, notFoundPage } = require('./errors');

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
  getOwnProfile,
  ownProfileData,
  deletePost,
  serverError,
  notFoundPage,
  redirectErrorData,
};
