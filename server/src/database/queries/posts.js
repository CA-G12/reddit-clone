const connection = require('../config/connection');

const getAllPosts = () => {
  const sql = "SELECT posts.id, content, votes, users.fname || ' ' || users.lname as full_name, users.username FROM posts INNER JOIN users ON posts.user_id = users.id";
  return connection.query(sql);
};

const updateVote = (votes, id) => {
  const sql = {
    text: 'UPDATE posts SET votes = $1 WHERE id = $2 RETURNING votes',
    values: [votes, id],
  };
  return connection.query(sql);
};

module.exports = {
  getAllPosts,
  updateVote,
};
