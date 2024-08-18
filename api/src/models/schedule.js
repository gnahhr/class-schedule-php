const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define("schedule", {
  time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  section_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  room: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  year_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Schedule;
