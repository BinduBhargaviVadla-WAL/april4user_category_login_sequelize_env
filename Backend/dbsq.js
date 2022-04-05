const Sequelize = require("sequelize");
require("dotenv").config();
const db = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "mysql",
  }
);
module.exports = db;
