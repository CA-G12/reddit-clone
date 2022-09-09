const router = require('express').Router();

const {
  getPostGeneratorPage,
  getUsersProfile,
  getOwnProfile,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/posts/generator', verifyAccessToken, getPostGeneratorPage);
router.get('/users/:username', verifyAccessToken, getOwnProfile);
router.get('/users/profile', getUsersProfile);

module.exports = router;
