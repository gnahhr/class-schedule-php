const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Admin = sequelize.define("admins", {
  name: {
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
module.exports = Admin;
