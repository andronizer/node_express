const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User, Dashboard }) {
      this.belongsToMany(User, { through: "UserTask" });
      this.belongsTo(Dashboard, { foreignKey: "boardId", as: "board" });
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
    },
  );
  return Task;
};
