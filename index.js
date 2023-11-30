let express = require("express"); //Express installd
let fs = require("fs");
let app = express();
const dbConnection = require("./db"); //express server object created.
let port = 8080;

//Allow 'Web server to run on port' + port
app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`);
});

//Processing data sent with POST.
app.use(express.urlencoded({ extended: true }));

//Conecting frontend withbakend.
app.get("/", function (req, res) {
  fs.readFile(__dirname + "/index.html", "utf8", (err, data) => {
    console.log("here");
    if (err) {
      console.error("Error reading HTML file:", err);
      return res.status(500).send("Error reading HTML file");
    }
    //Selecting all data from users that allredy exist in database and showing all of it in server.
    dbConnection.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;

      let modifiedHTML = data.replace(
        "<!-- Placeholders for data -->",
        result
          .toReversed()
          .map(
            (entry) => `
        <div style="display: flex; flex-direction: column">
          <div>Name: ${entry.name}</div> 
          <div> Email: ${entry.email}</div> 
          <div> Email: ${entry.phone}</div> 
          <div> Email: ${entry.comment}</div> 
        </div>
        <hr/>
      `
          )
          .join("")
      );

      res.send(modifiedHTML);
    });
  });
});

app.post("/", function (req, res) {
  const { name, email, tel, comment } = req.body;

  //Conecting database with bakend
  dbConnection.query(
    "INSERT INTO users (name, email, phone, comment) VALUES (?,?,?,?)",
    [name, email, tel, comment],
    function (err, result) {
      if (err) throw err;
      console.log(result);
    }
  );

  res.redirect(303, "/");
});
