const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Admin = sequelize.define("admins", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
module.exports = Admin;
