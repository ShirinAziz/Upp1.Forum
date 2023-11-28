let express = require("express");
let fs = require("fs");
let app = express();
let port = 8080;

app.listen(port, function () {
  console.log(`Webbserver körs på port ${port}`);
});

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let html = fs.readFileSync("index.html").toString();
  html = html.replace("**NAME**", req.body.name);
  html = html.replace("**EMAIL**", req.body.email);
  html = html.replace("**TEL**", req.body.tel);
  html = html.replace("**COMMENT**", req.body.comment);

  res.send(html);
});
