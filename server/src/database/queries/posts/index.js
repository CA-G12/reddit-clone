const { getAllPosts } = require('./allPosts');
const { insertNewPost } = require('./insertPost');
const { getPostsByUser } = require('./postsByUser');
const { getPostsUpVotedByUser } = require('./postsUpVotedByUser');
const { getPostsDownVotedByUser } = require('./postsDownVotedByUser');
const { deletePostQuery } = require('./deletePost');

module.exports = {
  getAllPosts,
  insertNewPost,
  getPostsByUser,
  getPostsUpVotedByUser,
  getPostsDownVotedByUser,
  deletePostQuery,
};
