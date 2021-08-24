"use strict";
const { bcryptHash } = require("../utils");

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "andrey",
        email: "andrey@mail.ru",
        password: await bcryptHash("andrey"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "zhenya",
        email: "zhenya@mail.ru",
        password: await bcryptHash("zhenya"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "misha",
        email: "misha@mail.ru",
        password: await bcryptHash("misha"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "stasik",
        email: "stasik@mail.ru",
        password: await bcryptHash("stasik"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "yarik",
        email: "yarik@mail.ru",
        password: await bcryptHash("yarik"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
