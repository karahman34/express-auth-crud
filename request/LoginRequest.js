const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { username, password } = req.body;
  const { error } = schema.validate({ username, password });

  if (!error) {
    return next();
  }

  return res.transformer.validationError(error);
};
