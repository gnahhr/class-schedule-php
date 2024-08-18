const createRouter = require('./template');
const controller = require('../controller/section');

const section = createRouter(controller);

module.exports = section;
