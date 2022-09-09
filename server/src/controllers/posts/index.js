const { getAllPostsController } = require('./allPosts');
const { addNewPost } = require('./addNew');
const { deletePost } = require('./deletePost');

module.exports = {
  getAllPostsController,
  addNewPost,
  deletePost,
};
