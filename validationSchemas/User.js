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

exports.loginUser = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).trim().required(),
  });
  return schema.validate(body);
};

exports.verifyOtp = (body) => {
  const schema = Joi.object({
    otp: Joi.string().trim().required(),
  });
  return schema.validate(body);
};

exports.updateProfilePic = (body) => {
  const schema = Joi.object({
    photo: Joi.string(),
  });
  return schema.validate(body);
};
