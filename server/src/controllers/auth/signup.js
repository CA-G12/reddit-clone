const { insertUser } = require('../../database/queries');
const { signupValidation } = require('../../utils/joiValidation');
const { hashPassword } = require('../../utils/bcrypt');
const CustomizedError = require('../../utils/customizedError');

const signupController = (req, res) => {
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
              throw new CustomizedError(501, 'Not implemented!!!');
            });
        })
        .catch((err) => {
          console.log(err);
          throw new CustomizedError(501, 'Not implemented!!!');
        });
    })
    .catch((err) => {
      console.log(err);
      throw new CustomizedError(501, 'Not implemented!!!');
    });
};

module.exports = {
  signupController,
};
