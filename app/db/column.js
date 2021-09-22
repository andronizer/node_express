const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    static associate({ Dashboard, Task }) {
      this.hasMany(Task, { foreignKey: "columnId", as: "tasks" });
      this.belongsTo(Dashboard, { foreignKey: "boardId" });
    }

    toJSON() {
      return { ...this.get() };
    }
  }
  Column.init(
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
          notNull: { msg: "Column must have a title" },
          notEmpty: { msg: "Title must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "columns",
      modelName: "Column",
    }
  );
  return Column;
};
