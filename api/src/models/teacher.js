const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./department")

const Teacher = sequelize.define("teacher", {
    
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  
  } ,{timestamps: false}, {freezeTableName: true});

Teacher.hasOne(Department, {
    onDelete: "CASCADE",
    onUpdate:"CASCADE"
});

Department.belongsTo(Teacher, {
    onDelete: "CASCADE",
    onUpdate:"CASCADE",
})

module.exports = Teacher;