const router = require('express').Router();

const { loginController, signupController, logoutController } = require('../controllers');

router.post('/login', loginController);
router.post('/signup', signupController);
router.get('/logout', logoutController);

module.exports = router;
