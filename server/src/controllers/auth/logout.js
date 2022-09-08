const logoutController = (req, res) => {
  res.clearCookie('token').status(302).json({ msg: 'logged out successfully.' });
};

module.exports = {
  logoutController,
};
