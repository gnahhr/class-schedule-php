const SUBJECT = require('../models/subject');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['course_id', 'units', 'description', 'code'];

const service = createService(SUBJECT, ERROR_MESSAGE, fields);

module.exports = service;
