const router = require('express').Router();

const {
  getAllPostsController,
  addNewPost,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/', getAllPostsController);
router.post('/new', verifyAccessToken, addNewPost);

module.exports = router;
