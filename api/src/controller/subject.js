const service = require('../service/subject');
const SUCCESS_MESSAGE = require('../constants/success-message');
const ERROR_MESSAGE = require('../constants/error-message');
const createController = require('./template');

const controller = createController(service, SUCCESS_MESSAGE, ERROR_MESSAGE);

module.exports = controller;
