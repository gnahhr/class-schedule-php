const createRouter = require('./template');
const controller = require('../controller/schedule');

const schedule = createRouter(controller);

module.exports = schedule;
