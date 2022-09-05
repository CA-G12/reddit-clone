const Joi = require('joi');

const loginValidation = Joi.object({
  username: Joi.string().pattern(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .required(),
  password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/)
    .required(),
});

module.exports = {
  loginValidation,
};
