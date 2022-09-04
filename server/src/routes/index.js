const router = require('express').Router();

const posts = require('./posts');
const users = require('./users');

router.use('/', posts);
router.use('/', users);

module.exports = router;
