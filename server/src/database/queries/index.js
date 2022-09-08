const { getAllPosts, insertNewPost } = require('./posts');
const { getVotesForPost, updateVoteQuery } = require('./votes');
const { getAllUsersQuery, getPasswordForLogin, insertUser } = require('./users');
const { getProfileInfo } = require('./general');

module.exports = {
  getAllPosts,
  updateVoteQuery,
  insertNewPost,
  getVotesForPost,
  getAllUsersQuery,
  getPasswordForLogin,
  insertUser,
  getProfileInfo,
};
