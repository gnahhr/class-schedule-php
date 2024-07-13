const createRouter = require('./template');
const departmentController = require('../controller/department');

const department = createRouter(departmentController);

module.exports = department;
