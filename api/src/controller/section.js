const service = require('../service/course');
const SUCCESS_MESSAGE = require('../constants/success-message');
const ERROR_MESSAGE = require('../constants/error-message');
const createController = require('./template');

const serviceController = createController(service, SUCCESS_MESSAGE, ERROR_MESSAGE);

module.exports = serviceController;
