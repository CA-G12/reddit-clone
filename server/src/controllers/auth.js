const { getPasswordForLogin, insertUser } = require('../database/queries/users');
const { comparePasswords, hashPassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { loginValidation, signupValidation } = require('../utils/joiValidation');
const CustomizedError = require('../utils/customizedError');

const loginController = (req, res, next) => {
  loginValidation.validateAsync(req.body)
    .then((validObj) => {
      getPasswordForLogin(validObj.username)
        .then((data) => data.rows[0])
        .then((row) => {
          comparePasswords(validObj.password, row.password)
            .then(() => generateToken({ id: row.id, username: req.body.username }, (err, token) => {
              if (err) next(new CustomizedError(401, 'Wrong Credentials'));
              res.cookie('token', token).json({ username: req.body.username });
            }));
        }).catch((err) => {
          console.log(err, 'here1');
          next(new CustomizedError(401, 'Wrong Credentials'));
        })
        .catch((err) => {
          console.log(err, 'here2');
          next(new CustomizedError(401, 'Wrong Credentials'));
        });
    }).catch((err) => {
      console.log(err, 'here3');
      next(new CustomizedError(401, 'Wrong Credentials'));
    });
};

const signupController = (req, res, next) => {
  signupValidation.validateAsync(req.body)
    .then((validatedObj) => {
      const {
        username, password, email, fname, lname, phone,
      } = validatedObj;
      hashPassword(password)
        .then((hashed) => {
          insertUser(username, hashed, email, fname, lname, phone)
            .then((data) => res.status(201).json(data.rows[0]))
            .catch((err) => {
              console.log(err);
              next(new CustomizedError(501, 'Not implemented!!!'));
            });
        })
        .catch((err) => {
          console.log(err);
          next(new CustomizedError(501, 'Not implemented!!!'));
        });
    })
    .catch((err) => {
      console.log(err);
      next(new CustomizedError(501, 'Not implemented!!!'));
    });
};

module.exports = {
  loginController,
  signupController,
};
