const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("course",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    department_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{ timestamps: false },{ freezeTableName: true }
);

module.exports = Course;
