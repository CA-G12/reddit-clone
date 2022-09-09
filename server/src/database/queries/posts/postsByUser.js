const connection = require('../../config/connection');

const getPostsByUser = (id) => {
  const sql = {
    text: `
      SELECT
        posts.id,
        title,
        content,
        votes.id as vote_id,
        kind,
        votes.user_id,
        post_id
      FROM
        posts
      LEFT JOIN
        votes
      ON
        posts.id = votes.post_id
      WHERE
        posts.user_id = $1
    `,
    values: [id],
  };
  return connection.query(sql);
};

module.exports = {
  getPostsByUser,
};
