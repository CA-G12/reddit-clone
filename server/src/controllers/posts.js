require('dotenv').config();
const jwt = require('jsonwebtoken');

const { getAllPosts, updateVote } = require('../database/queries');

const CustomizedError = require('../utils/customizedError');

const getAllPostsController = (req, res, next) => {
  const { token } = req.cookies;
  let isLoggedIn = false;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) isLoggedIn = false;
    if (decoded) isLoggedIn = true;
  });

  getAllPosts()
    .then((data) => {
      const returnedObj = {
        isLoggedIn,
        rows: data.rows,
      };
      res.json(returnedObj);
    })
    .catch((error) => {
      console.log(error, 'getAllPostsController!!!');
      next(new CustomizedError(400, 'Bad query request!'));
    });
};

const updateVotes = (req, res, next) => {
  const { id, votes } = req.body;
  updateVote(votes, id)
    .then((data) => res.json({ votes: data.rows[0].votes, status: 204, msg: 'Updated successfully.' }))
    .catch(() => {
      next(new CustomizedError(400, 'Bad request!!!'));
    });
};

module.exports = {
  getAllPostsController,
  updateVotes,
};
