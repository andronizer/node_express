"use strict";
const { Dashboard } = require("../app/db/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("dashboards", [
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
        ownerId: 5,
      },
      {
        id: 3,
        title: "dashboard3",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 4,
      },
      {
        id: 4,
        title: "dashboard4",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 4,
      },
      {
        id: 5,
        title: "dashboard5",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 3,
      },
      {
        id: 6,
        title: "dashboard6",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 3,
      },
      {
        id: 7,
        title: "dashboard7",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 2,
      },
      {
        id: 8,
        title: "dashboard8",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 2,
      },
      {
        id: 9,
        title: "dashboard9",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 1,
      },
      {
        id: 10,
        title: "dashboard10",
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 1,
      },
    ]);

    const existingDashboards = await Dashboard.count();
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "dashboards_id_seq" RESTART WITH ${
        existingDashboards + 1
      }`
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("dashboards", null, {});
  },
};
