const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forum",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conected to db!");
});

module.exports = con;
