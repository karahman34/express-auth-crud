module.exports = (req, res, next) => {
  if (!req.user) {
    return res.transformer.fail('Only for authenthicated user.', null, 401);
  }

  return next();
};
