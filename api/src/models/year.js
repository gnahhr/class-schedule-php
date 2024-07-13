const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Year = sequelize.define("years",
  {
    sy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    semester: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  },{ timestamps: false },{ freezeTableName: true }
);

module.exports = Year;
