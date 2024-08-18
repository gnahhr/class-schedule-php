const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Section = sequelize.define("section",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    year_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Section;
