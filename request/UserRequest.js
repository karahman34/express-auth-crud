const Joi = require('joi');
const { Op } = require('sequelize');
const { User } = require('../models');

const uniqueUsername = async (req) => {
  const where = { username: req.body.username };
  if (req.method === 'PATCH') {
    where.id = { [Op.ne]: req.params.id };
  }

  const count = await User.count({
    where,
  });

  if (count > 0) {
    return 'The username has been taken';
  }

  return null;
};

const uniqueEmail = async (req) => {
  const where = { email: req.body.email };
  if (req.method === 'PATCH') {
    where.id = { [Op.ne]: req.params.id };
  }

  const count = await User.count({
    where,
  });

  if (count > 0) {
    return 'Email is already registered';
  }

  return null;
};

module.exports = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi
      .string()
      .min(3).max(30)
      .required(),
    password: Joi
      .string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    repeat_password: Joi.ref('password'),
    email: Joi
      .string()
      .email()
      .required(),
  });

  const { username, password, email } = req.body;
  const { error } = await schema.validate({ username, password, email }, {
    abortEarly: false,
  });

  if (error) {
    return res.transformer.validationError(error);
  }

  const [uniqueEmailResult, uniqueUsernameResult] = await Promise.all([
    uniqueEmail(req), uniqueUsername(req),
  ]);
  const additionalError = {};

  if (uniqueEmailResult) additionalError.email = uniqueEmailResult;
  if (uniqueUsernameResult) additionalError.username = uniqueUsernameResult;

  if (!error && !Object.keys(additionalError).length) {
    return next();
  }

  return res.transformer.validationError(error, additionalError);
};
