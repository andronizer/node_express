const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class JoinedUsers extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  JoinedUsers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "JoinedUsers",
      modelName: "JoinedUsers",
    }
  );
  return JoinedUsers;
};
