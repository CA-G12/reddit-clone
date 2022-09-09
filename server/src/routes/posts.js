const router = require('express').Router();

const {
  getAllPostsController,
  addNewPost,
  deletePost,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/', getAllPostsController);
router.post('/new', verifyAccessToken, addNewPost);
router.delete('/delete', verifyAccessToken, deletePost);

module.exports = router;
