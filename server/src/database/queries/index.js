const {
  getAllPosts,
  insertNewPost,
  getPostsByUser,
  getPostsUpVotedByUser,
  getPostsDownVotedByUser,
} = require('./posts');
const { getVotesForPost, updateVoteQuery } = require('./votes');
const { getUserInfo, getPasswordForLogin, insertUser } = require('./users');
const { getProfileInfo } = require('./general');

module.exports = {
  getAllPosts,
  updateVoteQuery,
  insertNewPost,
  getVotesForPost,
  getUserInfo,
  getPasswordForLogin,
  insertUser,
  getProfileInfo,
  getPostsByUser,
  getPostsUpVotedByUser,
  getPostsDownVotedByUser,
};
