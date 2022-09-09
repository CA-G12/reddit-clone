const router = require('express').Router();

const {
  getPostGeneratorPage,
  getUsersProfile,
  getOwnProfile,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/posts/generator', verifyAccessToken, getPostGeneratorPage);
router.get('/users/profile', getUsersProfile);
router.get('/users/:username', verifyAccessToken, getOwnProfile);

module.exports = router;
