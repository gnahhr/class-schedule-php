const DEPARTMENT = require('../models/department');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');
const Course = require('../models/course');

const fields = ['name', 'code'];

const include = [
  { model: Course},
];

const service = createService(DEPARTMENT, ERROR_MESSAGE, fields, include);

module.exports = service;
