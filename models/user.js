const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

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
  }, {
    sequelize,
    modelName: 'User',
  });

  User.hashPassword = (password) => {
    const saltRounds = 10;

    return bcrypt.hashSync(password, saltRounds);
  };

  User.comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

  return User;
};
