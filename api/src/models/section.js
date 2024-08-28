const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = require('./course');
const Year = require('./year');

const Section = sequelize.define("sections", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
  },
  year_level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
  },{
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Section;
