const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
   
  class User extends Model { 
    static associate({ Dashboard }) {       
        this.hasMany(Dashboard, { foreignKey: 'ownerId', as: 'dashboards' })
      }   

    static associate({ Task }) {       
        this.belongsToMany(Task, { through: "UserTask", timestamps: false })
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
        allowNull: false
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
      tableName: 'users',
      modelName: 'User',
      timestamps: false
    }
  )
  return User
}

