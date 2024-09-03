const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define("schedules", {
  time: {
    type: DataTypes.INTEGER,
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
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = Schedule;
