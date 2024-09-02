const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Day = sequelize.define("days", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
module.exports = Day;
