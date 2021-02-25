module.exports = (req, res, next) => {
  if (req.user) {
    return res.transformer.fail('Only for guest user.', null, 401);
  }

  return next();
};
