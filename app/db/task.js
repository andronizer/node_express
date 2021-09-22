const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ Column }) {
      // this.belongsToMany(User, { through: "user_task" });
      this.belongsTo(Column, { foreignKey: "columnId" });
    }

    toJSON() {
      return { ...this.get() };
    }
  }
  Task.init(
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
          notNull: { msg: "Task must have a title" },
          notEmpty: { msg: "Title must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "tasks",
      modelName: "Task",
    }
  );
  return Task;
};
