const connection = require('../../config/connection');

const getProfileInfo = (username) => {
  const sql = {
    text: `
        SELECT  
          u.fname || ' ' || u.lname as full_name, 
          u.username, 
          u.email, 
          p.content, 
          p.title, 
          v.id, 
          v.kind, 
          v.user_id, 
          v.post_id 
        FROM 
          users u
        INNER JOIN 
          posts p 
        ON 
          p.user_id = u.id 
        INNER JOIN 
          votes v 
        ON 
          u.id = v.user_id
        WHERE
          u.username = $1
    `,
    values: [username],
  };

  return connection.query(sql);
};

module.exports = {
  getProfileInfo,
};
