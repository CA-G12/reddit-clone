const connection = require('../../config/connection');

const getAllPosts = () => {
  const sql = `
  SELECT 
    title, posts.id, content, fname || ' ' || lname as full_name, username, votes.id as vote_id, votes.kind, votes.user_id, votes.post_id
  FROM 
    posts 
  INNER JOIN 
    users 
  ON 
    posts.user_id = users.id
  INNER JOIN
    votes
  ON
    users.id = votes.user_id
  `;
  return connection.query(sql);
};

module.exports = {
  getAllPosts,
};
