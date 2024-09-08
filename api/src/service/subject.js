const SUBJECT = require('../models/subject');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

//relations
const Course = require('../models/course');

const type = 'subject'

const include = [
  {model: Course}
]

const fields = ['course_id', 'units', 'description', 'code'];

const service = createService(SUBJECT, ERROR_MESSAGE, fields, include, type);


module.exports = service;
