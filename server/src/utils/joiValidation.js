const Joi = require('joi');

const loginValidation = Joi.object({
  username: Joi.string().pattern(/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .required(),
  password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/)
    .required(),
});

const signupValidation = Joi.object({
  username: Joi.string().pattern(/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .required(),
  password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/)
    .required(),
  email: Joi.string().regex(/^[a-zA-z0-9]?.*@[a-zA-z0-9]{1,}\.[a-zA-Z]{1,}$/)
    .required(),
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  phone: Joi.string().length(10).regex(/[0-9]{10}/),
});

const postValidation = Joi.object({
  title: Joi.string().min(3).max(300).required(),
  content: Joi.string().min(1).required(),
  id: Joi.number(),
});

module.exports = {
  loginValidation,
  signupValidation,
  postValidation,
};
