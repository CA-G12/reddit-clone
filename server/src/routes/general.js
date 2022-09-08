const router = require('express').Router();

const { handleProfileInfo } = require('../controllers');

router.use('/profileInfo', handleProfileInfo);

module.exports = router;
