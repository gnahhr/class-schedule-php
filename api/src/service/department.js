const DEPARTMENT = require('../models/department');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['name', 'code'];

const service = createService(DEPARTMENT, ERROR_MESSAGE, fields);

module.exports = service;
