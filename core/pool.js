const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectTimeout: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

pool.getConnection((err, conn) => {
  if (err) console.log(err);
  console.log("Connected!");
  if (conn) conn.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
