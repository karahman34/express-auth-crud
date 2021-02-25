const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.hashPassword = (password) => {
    const saltRounds = 10;

    return bcrypt.hashSync(password, saltRounds);
  };

  User.comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

  User.generateToken = (user) => jwt.sign({
    id: user.id,
  }, process.env.APP_KEY, { expiresIn: '7 days' });

  User.validateToken = (token) => jwt.verify(token, process.env.APP_KEY);

  return User;
};
