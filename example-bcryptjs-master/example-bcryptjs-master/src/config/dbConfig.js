const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("login", "root", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
