const COURSE = require('../models/course');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['department_id', 'name', 'code'];

const courseService = createService(YEAR, ERROR_MESSAGE, fields);

module.exports = courseService;
