const jwt = require('jsonwebtoken');

const {
  getUserInfo,
  getPostsByUser,
  getPostsUpVotedByUser,
  getPostsDownVotedByUser,

} = require('../../database/queries');

const ownProfileData = (req, res, next) => {
  const { username } = req.query;

  const { token } = req.cookies;
  let isLoggedIn = false;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) isLoggedIn = false;
    if (decoded) isLoggedIn = true;
  });

  getUserInfo(username)
    .then((userInfo) => userInfo.rows[0])
    .then((ownInfo) => {
      getPostsByUser(ownInfo.id)
        .then((posts) => ({
          userInfo: ownInfo,
          posts: posts.rows,
        })).then((infoAndPosts) => {
          getPostsUpVotedByUser(ownInfo.id)
            .then((upVoted) => ({
              userInfo: infoAndPosts.userInfo,
              posts: infoAndPosts.posts,
              upVoted: upVoted.rows,
            })).then((upVotedAndInfoAndPosts) => {
              getPostsDownVotedByUser(ownInfo.id)
                .then((downVoted) => ({
                  isLoggedIn,
                  userInfo: upVotedAndInfoAndPosts.userInfo,
                  posts: upVotedAndInfoAndPosts.posts,
                  upVoted: upVotedAndInfoAndPosts.upVoted,
                  downVoted: downVoted.rows,
                })).then((obj) => {
                  res.json(obj);
                });
            });
        });
    }).catch((err) => next(err));
};

module.exports = {
  ownProfileData,
};
