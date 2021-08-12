const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Dashboard extends Model {

    static associate({ User }) {       
        this.belongsTo(User, { foreignKey: 'ownerId', as: 'user' })
      }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Dashboard.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      description: {
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
    }
  )
  return Dashboard
}

