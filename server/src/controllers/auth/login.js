const { getPasswordForLogin } = require('../../database/queries');
const { loginValidation } = require('../../utils/joiValidation');
const { comparePasswords } = require('../../utils/bcrypt');
const { generateToken } = require('../../utils/jwt');
const CustomizedError = require('../../utils/customizedError');

const loginController = (req, res) => {
  loginValidation.validateAsync(req.body)
    .then((validObj) => {
      getPasswordForLogin(validObj.username)
        .then((data) => data.rows[0])
        .then((row) => {
          comparePasswords(validObj.password, row.password)
            .then(() => generateToken({ id: row.id, username: req.body.username }, (err, token) => {
              if (err) throw new CustomizedError(401, 'Wrong Credentials');
              res.cookie('token', token).json({ username: req.body.username, id: row.id });
            }));
        }).catch((err) => {
          console.log(err, 'here1');
          throw new CustomizedError(401, 'Wrong Credentials');
        })
        .catch((err) => {
          console.log(err, 'here2');
          throw new CustomizedError(401, 'Wrong Credentials');
        });
    }).catch((err) => {
      console.log(err, 'here3');
      throw new CustomizedError(401, 'Wrong Credentials');
    });
};

module.exports = {
  loginController,
};
