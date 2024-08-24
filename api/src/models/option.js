const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Option = sequelize.define("options",
  {
    year: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    course_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    year_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{ timestamps: false },{ freezeTableName: true }
);

module.exports = Option;
