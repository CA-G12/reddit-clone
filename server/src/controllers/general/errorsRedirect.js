const redirectErrorData = (req, res) => {
  const { status, message } = req.cookies;

  res.json({ status, message });
};

module.exports = {
  redirectErrorData,
};
