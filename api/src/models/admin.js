const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Admin = sequelize.define("admins", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {  // This field will hold the foreign key referencing User
    type: DataTypes.INTEGER,
    allowNull: false,  // Assuming an admin must always have a user
    unique: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

Admin.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Admin;
