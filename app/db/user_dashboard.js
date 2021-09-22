const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserDashboard extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }
  UserDashboard.init(
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
      tableName: "user_dashboard",
      modelName: "UserDashboard",
    }
  );
  return UserDashboard;
};
