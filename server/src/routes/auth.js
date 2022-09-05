const router = require('express').Router();

const { loginController } = require('../controllers');

router.post('/login', loginController);

module.exports = router;
