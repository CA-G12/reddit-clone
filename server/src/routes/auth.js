const router = require('express').Router();

const { loginController, signupController } = require('../controllers');

router.post('/login', loginController);
router.post('/signup', signupController);

module.exports = router;
