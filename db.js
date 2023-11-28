const mysql = require("mysql");

export const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forum",
});
