const SECTION = require('../models/section');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

//relations
const Course  = require('../models/course');
const Year  = require('../models/year');

const fields = ['name', 'course_id', 'year_id'];

const include = [
  { model: Course},
  { model: Year },
];

const service = createService(SECTION, ERROR_MESSAGE, fields, include);

module.exports = service;
