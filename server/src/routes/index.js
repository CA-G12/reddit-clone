const router = require('express').Router();

const posts = require('./posts');
const users = require('./users');
const auth = require('./auth');

router.use('/posts', posts);
router.use('/', users);
router.use('/auth', auth);

module.exports = router;
