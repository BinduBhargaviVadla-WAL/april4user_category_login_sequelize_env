const mysql = require("mysql2");
require("dotenv").config();
//Create the connection pool. The pool speciifc setting
console.log(process.env.host);
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
