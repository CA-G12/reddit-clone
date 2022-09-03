const connection = require('../config/connection');

const getAllPosts = () => {
  const sql = "SELECT content, votes, users.fname || ' ' || users.lname as full_name FROM posts INNER JOIN users ON posts.user_id = users.id";
  return connection.query(sql);
};

module.exports = {
  getAllPosts,
};
