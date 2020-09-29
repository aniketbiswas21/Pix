const Joi = require("joi");

exports.addPost = (body) => {
  const schema = Joi.object({
    photo: Joi.string().required(),
    caption: Joi.string(),
    taggedUsers: Joi.array(),
  });
  return schema.validate(body);
};

exports.addComment = (body) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });
  return schema.validate(body);
};
