require("dotenv").config();
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("todolist", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
