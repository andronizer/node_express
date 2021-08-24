'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('dashboards', [
    {
      id: 1,
      title: 'dashboard1',
      tasks: 'wtf',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 1,
    },
    {
      id: 2,
      title: 'dashboard2',
      tasks: 'wtf',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 1,
    },
    {
      id: 3,
      title: 'dashboard3',
      tasks: 'wtf',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 4,
    },
  ]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dashboards', null, {});
  },
};
