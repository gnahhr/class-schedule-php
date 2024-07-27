const SCHEDULE = require('../models/schedule');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['days', 'time', 'course_id', 'department_id', 'section_id', 'subject_id', 'teacher_id', 'room', 'year_id'];

const service = createService(SCHEDULE, ERROR_MESSAGE, fields);

module.exports = service;
