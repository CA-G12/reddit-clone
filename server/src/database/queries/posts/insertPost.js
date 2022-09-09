const connection = require('../../config/connection');

const insertNewPost = (title, content, id) => {
  const sql = {
    text: 'INSERT INTO posts(title, content, user_id) VALUES($1, $2, $3) RETURNING *',
    values: [title, content, id],
  };
  return connection.query(sql);
};

module.exports = {
  insertNewPost,
};
