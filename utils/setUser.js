const { User } = require('../models');

module.exports = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return;

  // Split token & validate the token.
  const token = authHeader.split(' ')[1];
  const dataToken = User.validateToken(token);

  // Get the user.
  const user = await User.findOne({
    where: {
      id: dataToken.id,
    },
  });

  // Set user into request object.
  if (user.token === token) {
    req.user = user;
  } else {
    req.user = null;
  }
};
