const router = require('express').Router();

const posts = require('./posts');
const votes = require('./votes');
const routing = require('./routing');
const users = require('./users');
const auth = require('./auth');

router.use('/posts', posts);
router.use('/posts', votes);
router.use('/posts', routing);
router.use('/', users);
router.use('/auth', auth);

module.exports = router;
