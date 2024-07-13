const yearService = require('../service/year');
const SUCCESS_MESSAGE = require('../constants/success-message');
const ERROR_MESSAGE = require('../constants/error-message');
const createController = require('./template');

const yearController = createController(yearService, SUCCESS_MESSAGE, ERROR_MESSAGE);

module.exports = yearController;
