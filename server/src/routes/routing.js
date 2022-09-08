const router = require('express').Router();

const {
  getPostGeneratorPage,
  getUsersProfile,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/posts/generator', verifyAccessToken, getPostGeneratorPage);
router.get('/users/profile', getUsersProfile);

module.exports = router;
