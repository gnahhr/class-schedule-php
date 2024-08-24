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

Teacher.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Teacher;
