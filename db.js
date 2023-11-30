const mysql = require("mysql"); //Conecting to db

const con = mysql.createConnection({
  host: "localhost", // IP-adress to the db-server
  user: "root",
  password: "",
  database: "forum",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conected to db!");
});

module.exports = con;
