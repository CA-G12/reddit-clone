const connection = require('../../config/connection');

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

module.exports = {
  getVotesForPost,
};
