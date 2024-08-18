const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Section = require('./section');
const Course = require("./course");

const Year = sequelize.define("years",
  {
    sy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { 
    timestamps: false,
    freezeTableName: true 
  }
);


module.exports = Year;
