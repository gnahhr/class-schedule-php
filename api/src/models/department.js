const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define("departments", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { 
  timestamps: false,
  freezeTableName: true 
});

module.exports = Department;
