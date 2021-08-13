const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
   
  class Task extends Model { 
    static associate({ Dashboard }) {       
        this.belongsTo(Dashboard, { foreignKey: 'boardId', as: 'board' })
      }   

    static associate({ User }) {       
        this.belongsToMany(User, { through: "UserTask", timestamps: false })
      }  
   
    toJSON() {
      return { ...this.get() }
    }
  }
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
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
      tableName: 'tasks',
      modelName: 'Task',
      timestamps: false
    }
  )
  return Task
}

