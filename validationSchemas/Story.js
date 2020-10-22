const Joi = require("joi");

exports.addStory = (body) => {
  const schema = Joi.object({
    photo: Joi.string().required(),
  });
  return schema.validate(body);
};
