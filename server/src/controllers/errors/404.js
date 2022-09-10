const { join } = require('path');

const notFoundPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', '..', '..', 'public', '404.html'));
};

module.exports = {
  notFoundPage,
};
