const { deletePostQuery } = require('../../database/queries');

const CustomizedError = require('../../utils/customizedError');

const deletePost = (req, res) => {
  const { id } = req.body;
  deletePostQuery(id)
    .then((data) => res.json({ data: data.rows[0] }))
    .catch((err) => {
      throw new CustomizedError(401, `${err}`);
    });
};

module.exports = {
  deletePost,
};
