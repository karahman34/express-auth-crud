const { User } = require('../models');
const UserResource = require('../transformer/UserResource');
const UsersCollection = require('../transformer/UsersCollection');

const UserController = {
  async index(req, res) {
    try {
      const users = await User.findAndCountAll({
        limit: parseInt(req.query.limit, 10) || null,
        offset: parseInt(req.query.offset, 10) || null,
      });

      return res.transformer.success('Success to get users data.', UsersCollection(users));
    } catch (err) {
      return res.transformer.fail('Failed to load users data.');
    }
  },
  async store(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password: User.hashPassword(password),
      });

      return res.transformer.success('Success to insert user.', UserResource(user), 201);
    } catch (err) {
      return res.transformer.fail('Failed to insert user.');
    }
  },
  async update(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      const { email, username, password } = req.body;
      user.email = email;
      user.username = username;
      user.password = User.hashPassword(password);
      user.save();

      return res.transformer.success('Success to update user.', UserResource(user));
    } catch (err) {
      return res.transformer.fail('Failed to update user.');
    }
  },
  async destroy(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) {
        return res.transformer.fail('User not found.', null, 404);
      }

      user.destroy();

      return res.transformer.success('Success to delete user.', UserResource(user));
    } catch (err) {
      return res.transformer.fail('Failed to delete user.');
    }
  },
};

module.exports = UserController;
