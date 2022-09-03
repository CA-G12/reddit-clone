const router = require('express').Router();

const { getAllPostsController } = require('../controllers');

router.get('/posts', getAllPostsController);

module.exports = router;
