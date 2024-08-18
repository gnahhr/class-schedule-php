const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Subject = sequelize.define("subjects", {
  code: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  units: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  course_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = Subject;
