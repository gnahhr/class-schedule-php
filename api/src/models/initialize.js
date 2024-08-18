const sequelize = require("../config/database");

// Import all models
const Section = require('./section');
const Course = require("./course");
const User = require("./user");
const Department = require('./department');
const Schedule = require('./schedule');
const Subject = require('./subject');
const Year = require('./year');
const Admin = require('./admin');
const Teacher = require('./teacher');

// Section to Course and Year--------------------------------------------------------------------
Section.belongsTo(Course, { foreignKey: 'courseId', onDelete: "CASCADE", onUpdate: "CASCADE" });
Course.hasMany(Section, { foreignKey: 'courseId', onDelete: "CASCADE", onUpdate: "CASCADE" });

Section.belongsTo(Year, { foreignKey: 'yearId', onDelete: "CASCADE", onUpdate: "CASCADE" });
Year.hasMany(Section, { foreignKey: 'yearId', onDelete: "CASCADE", onUpdate: "CASCADE" });
//-----------------------------------------------------------------------------------------------

// Admin to User---------------------------------------------------------------------------
Admin.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Admin, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });
// ----------------------------------------------------------------------------------------

// Teacher to User---------------------------------------------------------------------------
Teacher.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Teacher, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });
//-------------------------------------------------------------------------------------------

// Subject to Course and Schedule----------------------------------------------------------------
Subject.belongsTo(Course, { foreignKey: 'course_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
//-----------------------------------------------------------------------------------------------

// Schedule relationships---------------------------------------------------------------------------------
Schedule.belongsTo(Course, { foreignKey: 'course_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Course.hasMany(Schedule, { foreignKey: 'course_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

Schedule.belongsTo(Section, { foreignKey: 'section_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Section.hasMany(Schedule, { foreignKey: 'section_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

Schedule.belongsTo(Teacher, { foreignKey: 'teacher_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Teacher.hasMany(Schedule, { foreignKey: 'teacher_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

Schedule.belongsTo(Department, { foreignKey: 'department_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Department.hasMany(Schedule, { foreignKey: 'department_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

Schedule.belongsTo(Year, { foreignKey: 'year_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Year.hasMany(Schedule, { foreignKey: 'year_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
//---------------------------------------------------------------------------------------------------------

function SyncModels() {  
  sequelize.sync({ force: false })
}

module.exports = SyncModels;
