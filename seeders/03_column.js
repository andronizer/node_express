"use strict";
const { Column } = require("../app/db/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("columns", [
      {
        id: 1,
        title: "column1",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 5,
      },
      {
        id: 2,
        title: "column2",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 5,
      },
      {
        id: 3,
        title: "column3",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 4,
      },
      {
        id: 4,
        title: "column4",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 4,
      },
      {
        id: 5,
        title: "column5",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 3,
      },
      {
        id: 6,
        title: "column6",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 3,
      },
      {
        id: 7,
        title: "column7",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 2,
      },
      {
        id: 8,
        title: "column8",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 2,
      },
      {
        id: 9,
        title: "column9",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 1,
      },
      {
        id: 10,
        title: "column10",
        createdAt: new Date(),
        updatedAt: new Date(),
        boardId: 1,
      },
    ]);
    const existingColumns = await Column.count();
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "columns_id_seq" RESTART WITH ${existingColumns + 1}`
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("columns", null, {});
  },
};
