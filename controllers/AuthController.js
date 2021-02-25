const { User } = require('../models');
const UserResource = require('../transformer/UserResource');

function respondWithToken(token, user) {
  return {
    token,
    type: 'Bearer',
    user: UserResource(user),
  };
}

const AuthController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return res.transformer.fail('User not found.', null, 404);
      }

      // Check password.
      if (!User.comparePassword(password, user.password)) {
        return res.transformer.fail('Password wrong.', null, 401);
      }

      // Generate token.
      const token = User.generateToken(user);

      // Save new token.
      user.token = token;
      user.save();

      return res.transformer.success('Success to authenthicate user.', respondWithToken(token, user));
    } catch (err) {
      return res.transformer.fail('Failed to authenthicate user.', err.message);
    }
  },
  async me(req, res) {
    try {
      return res.transformer.success('Success to get current user.', UserResource(req.user));
    } catch (err) {
      return res.transformer.fail('Failed to get current user.');
    }
  },
  async logout(req, res) {
    try {
      const { user } = req;

      user.token = null;
      user.save();

      return res.transformer.success('Success to deauthenthicate user.');
    } catch (err) {
      return res.transformer.fail('Failed to deauthenthicate user.');
    }
  },
};

module.exports = AuthController;
