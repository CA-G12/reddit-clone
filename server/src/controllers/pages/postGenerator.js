const { join } = require('path');

const getPostGeneratorPage = (req, res) => {
  res.status(200).sendFile(join(__dirname, '..', '..', '..', 'private', 'createPost', 'index.html'));
};

module.exports = {
  getPostGeneratorPage,
};
