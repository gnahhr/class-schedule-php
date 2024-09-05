'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schedules', null, {});

    await queryInterface.bulkInsert('schedules', [
      //monday wed frid---------------------------------------
      {
        start_time: '13:00',
        end_time:'14:00',
        day_id: 1,
        room: 'asda6',
        course_id: 3,
        section_id: 1,
        subject_id: 7,
        teacher_id: 2,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '14:00',
        end_time: '15:00',
        day_id: 1,
        room: 'asda5',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 3,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '15:00',
        end_time:'16:00',
        day_id: 1,
        room: 'asda4',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 4,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '16:00',
        end_time:'17:00',
        day_id: 1,
        room: 'asda3',
        course_id: 3,
        section_id: 1,
        subject_id: 10,
        teacher_id: 5,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '17:00',
        end_time:'18:00',
        day_id: 1,
        room: 'asda2',
        course_id: 3,
        section_id: 1,
        subject_id: 11,
        teacher_id: 6,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '18:00',
        end_time:'19:00',
        day_id: 1,
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
        start_time: '12:30',
        end_time:'14:00',
        day_id: 2,
        room: 'asda6',
        course_id: 3,
        section_id: 1,
        subject_id: 7,
        teacher_id: 2,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '14:00',
        end_time:'15:30',
        day_id: 2,
        room: 'asda5',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 3,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '15:30',
        end_time:'17:00',
        day_id: 2,
        room: 'asda4',
        course_id: 3,
        section_id: 1,
        subject_id: 8,
        teacher_id: 4,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '17:00',
        end_time:'18:30',
        day_id: 2,
        room: 'asda3',
        course_id: 3,
        section_id: 1,
        subject_id: 10,
        teacher_id: 5,
        department_id: 1,
        year_id: 1,
      },
      {
        start_time: '18:30',
        end_time:'20:00',
        day_id: 2,
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
