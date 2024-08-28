const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Department = require("./department");

const Teacher = sequelize.define("teachers", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department_id: {
    type: DataTypes.STRING,
    references: {
      model: Department,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = Teacher;
