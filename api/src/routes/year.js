const createRouter = require('./template');
const yearController = require('../controller/year');

const year = createRouter(yearController);

module.exports = year;
