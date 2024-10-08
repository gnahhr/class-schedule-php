'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('days', null, {});

    await queryInterface.bulkInsert('days', [
      {
        name: 'mwf',
      },
      {
        name: 'tth',
      },
      {
        name: 'Monday',
      },
      {
        name: 'Tuesday',
      },
      {
        name: 'Wednesday',
      },
      {
        name: 'Thursday',
      },
      {
        name: 'Friday',
      },
      {
        name: 'Saturday',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('days', null, {});
  }
};
