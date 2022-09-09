const connection = require('../../config/connection');

const getPostsDownVotedByUser = (id) => {
  const sql = {
    text: `
      SELECT
        posts.id,
        title,
        content,
        votes.id as votes_id,
        kind,
        votes.user_id,
        votes.post_id
      FROM
        posts
      INNER JOIN
        votes
      ON
        posts.id = votes.post_id
      INNER JOIN
        users
      ON
        votes.user_id = $1
      WHERE
        votes.kind = 'lower'
      GROUP BY
        posts.id, votes.id
    `,
    values: [id],
  };
  return connection.query(sql);
};

module.exports = {
  getPostsDownVotedByUser,
};
