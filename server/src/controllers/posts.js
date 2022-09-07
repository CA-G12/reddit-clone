require('dotenv').config();
const jwt = require('jsonwebtoken');

const { join } = require('path');

const { getAllPosts, updateVote, insertNewPost } = require('../database/queries');

const CustomizedError = require('../utils/customizedError');
const { postValidation } = require('../utils/joiValidation');

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
    .catch((err) => {
      console.log(err);
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

const getPostGeneratorPage = (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', '..', 'private', 'createPost', 'index.html'));
};

const addNewPost = (req, res, next) => {
  // const { title, content, id } = req.body;
  postValidation.validateAsync(req.body)
    .then((obj) => {
      insertNewPost(obj.content, obj.id)
        .then((data) => res.json({ msg: `${data.rowCount} was added successfully!!!` }))
        .catch((err) => {
          console.log(err);
          next(new CustomizedError(401, 'Not authenticated!!!'));
        });
    }).catch((err) => {
      console.log(err);
      next(new CustomizedError(401, 'Not authenticated!!!'));
    });
};

module.exports = {
  getAllPostsController,
  updateVotes,
  getPostGeneratorPage,
  addNewPost,
};
