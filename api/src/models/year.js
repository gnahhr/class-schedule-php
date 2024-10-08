const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = require('./course');


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
    toggle:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    }
  },
  { 
    timestamps: false,
    freezeTableName: true 
  }
);


module.exports = Year;
