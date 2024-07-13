const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Year = sequelize.define("year",
  {
    year: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    semester: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{ timestamps: false },{ freezeTableName: true }
);

module.exports = Year;
