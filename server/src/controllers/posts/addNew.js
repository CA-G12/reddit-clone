const CustomizedError = require('../../utils/customizedError');
const { postValidation } = require('../../utils/joiValidation');
const { insertNewPost } = require('../../database/queries');

const addNewPost = (req, res, next) => {
  postValidation.validateAsync(req.body)
    .then((obj) => {
      insertNewPost(obj.title, obj.content, obj.id)
        .then((data) => res.json(data.rows[0]))
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
  addNewPost,
};
