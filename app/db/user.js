const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate({ Task, Dashboard }) {
      this.belongsToMany(Task, { through: 'UserTask' });
      this.hasMany(Dashboard, { foreignKey: 'ownerId', as: 'dashboards' });
      this.belongsToMany(Dashboard, { through: 'JoinedUsers' });
    }

    toJSON() {
      return { ...this.get() }
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a email' },
          notEmpty: { msg: 'email must not be empty' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    },
  )
  return User
}

