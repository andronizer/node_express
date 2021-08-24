"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("dashboards", [
      {
        id: 1,
        title: "dashboard1",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 5,
      },
      {
        id: 2,
        title: "dashboard2",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 4,
      },
      {
        id: 3,
        title: "dashboard3",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 3,
      },
      {
        id: 4,
        title: "dashboard4",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 2,
      },
      {
        id: 5,
        title: "dashboard5",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 1,
      },
    ]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("dashboards", null, {});
  },
};
