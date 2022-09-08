const connection = require('../../config/connection');

const updateVoteQuery = ({
  id, kind, userId, postId,
}) => {
  const sql = {
    text: `
      INSERT INTO votes(id, kind, user_id, post_id)
      VALUES 
        ($1, $2, $3, $4)
      ON CONFLICT (id)
        DO UPDATE
      SET kind = $2
      RETURNING *
    `,
    values: [id, kind, userId, postId],
  };
  return connection.query(sql);
};

module.exports = {
  updateVoteQuery,
};
