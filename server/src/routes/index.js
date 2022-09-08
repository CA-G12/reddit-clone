const router = require('express').Router();

const posts = require('./posts');
const votes = require('./votes');
const routing = require('./routing');
const users = require('./users');
const auth = require('./auth');
const general = require('./general');

router.use('/posts', posts);
router.use('/posts', votes);
router.use('/', routing);
router.use('/', users);
router.use('/', general);
router.use('/auth', auth);

module.exports = router;
