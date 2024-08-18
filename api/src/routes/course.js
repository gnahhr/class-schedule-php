const createRouter = require('./template');
const controller = require('../controller/course');

const course = createRouter(controller);

module.exports = course;
