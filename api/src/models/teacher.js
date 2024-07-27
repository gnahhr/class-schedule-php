const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Teacher = sequelize.define("teachers", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

Teacher.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Teacher;
