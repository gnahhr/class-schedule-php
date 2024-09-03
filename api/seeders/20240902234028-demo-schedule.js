'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schedules', null, {});

    await queryInterface.bulkInsert('schedules', [
      //monday wed frid---------------------------------------
      {
        time: 1,
        days: 1,
        room: 'asda6',
        course_id: 3,
        section_id: 1,
        subject_id: 7,
        teacher_id: 2,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 2,
        days: 1,
        room: 'asda5',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 3,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 3,
        days: 1,
        room: 'asda4',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 4,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 4,
        days: 1,
        room: 'asda3',
        course_id: 3,
        section_id: 1,
        subject_id: 10,
        teacher_id: 5,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 5,
        days: 1,
        room: 'asda2',
        course_id: 3,
        section_id: 1,
        subject_id: 11,
        teacher_id: 6,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 6,
        days: 1,
        room: 'asda1',
        course_id: 3,
        section_id: 1,
        subject_id: 12,
        teacher_id: 7,
        department_id: 1,
        year_id: 1,
      },
      //----------------------------------------------

      //tuesday - thursday ---------------------------
      {
        time: 8,
        days: 2,
        room: 'asda6',
        course_id: 3,
        section_id: 1,
        subject_id: 7,
        teacher_id: 2,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 9,
        days: 2,
        room: 'asda5',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 3,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 10,
        days: 2,
        room: 'asda4',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 4,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 11,
        days: 2,
        room: 'asda3',
        course_id: 3,
        section_id: 1,
        subject_id: 10,
        teacher_id: 5,
        department_id: 1,
        year_id: 1,
      },
      {
        time: 12,
        days: 2,
        room: 'asda2',
        course_id: 3,
        section_id: 1,
        subject_id: 11,
        teacher_id: 6,
        department_id: 1,
        year_id: 1,
      },
      //------------------------------------------------
    ],{})  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schedules', null, {});
  }
};
