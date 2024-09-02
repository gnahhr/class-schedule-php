'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('times', [
      {
        name: '1:00 PM - 2:00 PM',
        day: 'mwf',
      },
      {
        name: '2:00 PM - 3:00 PM',
        day: 'mwf',
      },
      {
        name: '3:00 PM - 4:00 PM',
        day: 'mwf',
      },
      {
        name: '4:00 PM - 5:00 PM',
        day: 'mwf',
      },
      {
        name: '5:00 PM - 6:00 PM',
        day: 'mwf',
      },
      {
        name: '6:00 PM - 7:00 PM',
        day: 'mwf',
      },
      {
        name: '7:00 PM - 8:00 PM',
        day: 'mwf',
      },
      {
        name: '12:30 PM - 2:00 PM',
        day: 'tth',
      },
      {
        name: '2:00 PM - 3:30 PM',
        day: 'tth',
      },
      {
        name: '3:30 PM - 5:00 PM',
        day: 'tth',
      },
      {
        name: '5:00 PM - 6:30 PM',
        day: 'tth',
      },
      {
        name: '6:30 PM - 8:00 PM',
        day: 'tth',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('times', null, {});
  }
};
