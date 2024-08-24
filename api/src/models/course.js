const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require('./department');

const Course = sequelize.define("courses", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: 'id',
    },
    allowNull: true,
  },
}, { 
  timestamps: false,
  freezeTableName: true
});

module.exports = Course;
