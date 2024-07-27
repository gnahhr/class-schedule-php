const SECTION = require('../models/section');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['name', 'course', 'year'];

const service = createService(SECTION, ERROR_MESSAGE, fields);

module.exports = service;
