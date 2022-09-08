const connection = require('../../config/connection');

const insertNewPost = (content, id) => {
  const sql = {
    text: 'INSERT INTO posts(content, votes, user_id) VALUES($1, 0, $2)',
    values: [content, id],
  };
  return connection.query(sql);
};

module.exports = {
  insertNewPost,
};
