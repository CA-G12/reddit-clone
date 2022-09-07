const connection = require('../config/connection');

// const getAllPosts = (postId) => {
//   const sql = {
//     text: `
//     SELECT (
//       SELECT count(kind) FROM votes WHERE kind = 'lower'AND post_id = $1 GROUP BY (kind)
//     ) as lower_count, (
//       SELECT count(kind) FROM votes WHERE kind = 'upper' AND post_id = $1 GROUP BY (kind)
// ) as upper_count,posts.id,title,content,users.fname||' '||users.lname as full_name,users.username
//     FROM votes
//       INNER JOIN posts ON votes.post_id = posts.id
//       INNER JOIN users ON posts.user_id = users.id
//     `,
//     values: [postId],
//   };
//   return connection.query(sql);
// };

const getVotesForPost = (postId) => {
  const sql = {
    text: `
    SELECT ( 
      SELECT count(kind) FROM votes WHERE kind = 'lower'AND post_id = $1 GROUP BY (kind) 
    ) as lower_count, ( 
      SELECT count(kind) FROM votes WHERE kind = 'upper' AND post_id = $1 GROUP BY (kind) 
    ) as upper_count FROM votes WHERE post_id = $1; 
    `,
    values: [postId],
  };
  return connection.query(sql);
};

const getAllPosts = () => {
  const sql = "SELECT title, posts.id, content,users.fname || ' ' || users.lname as full_name, users.username FROM posts INNER JOIN users ON posts.user_id = users.id";
  return connection.query(sql);
};

// const updateVote = (votes, id) => {
//   const sql = {
//     text: 'UPDATE posts SET votes = $1 WHERE id = $2 RETURNING votes',
//     values: [votes, id],
//   };
//   return connection.query(sql);
// };
const updateVote = (id, content, votes, userId) => {
  const sql = {
    text: `
      INSERT INTO posts(id, content, votes, user_id)
      VALUES 
        ($1, $2, $3, $4)
      ON CONFLICT (id)
        DO UPDATE
      SET votes = $3
    `,
    values: [id, content, votes, userId],
  };
  return connection.query(sql);
};

const insertNewPost = (content, id) => {
  const sql = {
    text: 'INSERT INTO posts(content, votes, user_id) VALUES($1, 0, $2)',
    values: [content, id],
  };
  return connection.query(sql);
};

module.exports = {
  getVotesForPost,
  getAllPosts,
  updateVote,
  insertNewPost,
};
