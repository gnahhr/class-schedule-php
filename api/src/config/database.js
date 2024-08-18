const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("scheduler.db", "root", "GcgPas$w0rd", {
  logging: false,
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
