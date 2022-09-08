const router = require('express').Router();

const {
  getPostGeneratorPage,
} = require('../controllers');
const { verifyAccessToken } = require('../utils/jwt');

router.get('/generator', verifyAccessToken, getPostGeneratorPage);

module.exports = router;
