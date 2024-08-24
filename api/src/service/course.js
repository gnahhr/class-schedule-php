const COURSE = require('../models/course');
const DEPARTMENT = require('../models/department');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['department_id', 'name', 'code'];

const include = [
  { model: DEPARTMENT},
];

const courseService = createService(COURSE, ERROR_MESSAGE, fields, include);

module.exports = courseService;
