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
const Days = require('../models/day');


const fields = ['day_id', 'time', 'room', 'year_level', 'course_id', 'department_id', 'section_id', 'subject_id', 'teacher_id', 'year_id'];

const include = [
  { model: Course},
  { model: Department},
  { model: Section},
  { model: Subject},
  { model: Teacher},
  { model: Year},
  { model: Days},
];

const type = 'Schedule'

const service = createService(SCHEDULE, ERROR_MESSAGE, fields, include, type );

module.exports = service;
