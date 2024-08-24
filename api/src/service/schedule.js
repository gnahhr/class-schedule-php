const SCHEDULE = require('../models/schedule');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

//relations
const Course = require('../models/course');
const Department = require('../models/department');
const Section = require('../models/section');
const Subject = require('../models/subject');
const Teacher = require('../models/teacher');
const Year = require('../models/year');


const fields = ['days', 'time', 'room', 'year_level', 'course_id', 'department_id', 'section_id', 'subject_id', 'teacher_id', 'year_id'];

const include = [
  { model: Course},
  { model: Department},
  { model: Section},
  { model: Subject},
  { model: Teacher},
  { model: Year},
];

const service = createService(SCHEDULE, ERROR_MESSAGE, fields, include);

module.exports = service;
