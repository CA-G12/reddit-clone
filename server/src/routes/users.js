const router = require('express').Router();

const { getAutoCompleteData } = require('../controllers');

router.get('/users/autocomplete', getAutoCompleteData);

module.exports = router;
