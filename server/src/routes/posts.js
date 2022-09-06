const router = require('express').Router();

const { getAllPostsController, updateVotes } = require('../controllers');

router.get('/posts', getAllPostsController);
router.patch('/posts/votes', updateVotes);

module.exports = router;
