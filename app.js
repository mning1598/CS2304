const express = require("express");
var fs = require("fs");
var users = require("data/users.json");
const app = express();
const port = 3000;
var userID = 0;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/blabs", async function(req, res) {});

app.delete("/blabs/:id", async function(req, res) {});

app.post("/blabs", async function(req, res) {
  var toAdd = {
    id: userID,
    author: { email: req.body.author.email, name: req.body.author.name },
    message: req.body.message
  };

  fs.writeFile(users, JSON.stringify(toAdd), "utf8", null);

  res.status(201, {
    message: "Blab added successfully!",
    postTime: Date.now(),
    author: { email: req.body.author.email, name: req.body.author.name },
    message: req.body.message
  });
});