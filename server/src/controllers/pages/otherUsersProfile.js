const { join } = require('path');

const getUsersProfile = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', '..', 'public', 'userProfile', 'index.html'));
};

module.exports = {
  getUsersProfile,
};
