const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define("department", {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {timestamps:false})

module.exports = Department;