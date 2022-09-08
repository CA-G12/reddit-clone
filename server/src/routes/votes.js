const router = require('express').Router();

const {
  updateVotes,
  getVotesByPost,
} = require('../controllers');

router.post('/get-votes', getVotesByPost);
router.patch('/votes', updateVotes);

module.exports = router;
