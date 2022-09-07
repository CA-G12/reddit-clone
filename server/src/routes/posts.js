const router = require('express').Router();

const {
  getAllPostsController, updateVotes, getPostGeneratorPage, addNewPost,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/', getAllPostsController);
router.patch('/votes', updateVotes);
router.get('/generator', verifyAccessToken, getPostGeneratorPage);
router.post('/new', verifyAccessToken, addNewPost);

module.exports = router;
