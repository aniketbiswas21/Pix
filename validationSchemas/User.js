const Joi = require("joi");

exports.registerUser = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).trim().required(),
    photo: Joi.string(),
  });
  return schema.validate(body);
};
