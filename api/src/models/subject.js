const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const COURSE = require("./course");
const SCHEDULE = require("./schedule");

const SUBJECT = sequelize.define("subjects", {
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

SUBJECT.belongsTo(COURSE, { foreignKey: 'course_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
SUBJECT.belongsTo(SCHEDULE, { foreignKey: 'subject_id', onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = SUBJECT;
