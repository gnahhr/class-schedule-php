const createRouter = require('./template');
const controller = require('../controller/subject');

const subject = createRouter(controller);

module.exports = subject;
