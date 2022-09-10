const router = require('express').Router();

const { verifyAccessToken } = require('../utils/jwt');
const { handleProfileInfo, ownProfileData, redirectErrorData } = require('../controllers');

router.get('/profileInfo', handleProfileInfo);
router.get('/ownProfileData', verifyAccessToken, ownProfileData);
router.get('/error/redirect', redirectErrorData);

module.exports = router;
