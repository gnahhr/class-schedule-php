const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Time = sequelize.define("times", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  day: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
module.exports = Time;
