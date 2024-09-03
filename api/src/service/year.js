const YEAR = require('../models/year');
const ERROR_MESSAGE = require('../constants/error-message');
const createService = require('./template');

const fields = ['sy', 'semester', 'toggle'];

const yearService = createService(YEAR, ERROR_MESSAGE, fields);

module.exports = yearService;
