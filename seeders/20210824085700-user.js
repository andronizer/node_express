'use strict';
const { bcryptHash } = require('../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      id: 1,
      name: 'vasaeps1',
      email: 'vasaeps1@test.test',
      password: await bcryptHash('vasaeps1'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'vasaeps2',
      email: 'vasaeps2@test.test',
      password: await bcryptHash('vasaeps2'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 3,
      name: 'vasaeps3',
      email: 'vasaeps3@test.test',
      password: await bcryptHash('vasaeps3'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 4,
      name: 'vasaeps4',
      email: 'vasaeps4@test.test',
      password: await bcryptHash('vasaeps4'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
