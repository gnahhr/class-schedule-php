const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const User = sequelize.define("user", {
    
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  userName: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  roleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

} ,{timestamps: false}, {freezeTableName: true});

module.exports = User;