const router = require('express').Router();

const { verifyAccessToken } = require('../utils/jwt');
const { handleProfileInfo, ownProfileData } = require('../controllers');

router.use('/profileInfo', handleProfileInfo);
router.use('/ownProfileData', verifyAccessToken, ownProfileData);

module.exports = router;
