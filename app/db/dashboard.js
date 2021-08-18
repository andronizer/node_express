const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Dashboard extends Model {
    static associate({ Task, User }) {
      this.hasMany(Task, { foreignKey: 'boardId' });
      this.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'cascade' });
      this.belongsToMany(User, { through: 'JoinedUsers' });
    }

    toJSON() {
      return { ...this.get() }
    }
  }
  Dashboard.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      tasks: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a email' },
          notEmpty: { msg: 'email must not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'dashboards',
      modelName: 'Dashboard',
    },
  )
  return Dashboard
}

