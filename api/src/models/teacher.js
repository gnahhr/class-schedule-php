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
  userId: {  // This field will hold the foreign key referencing User
    type: DataTypes.INTEGER,
    allowNull: false,  // Assuming a teacher must always have a user
    unique: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

Teacher.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Teacher;
