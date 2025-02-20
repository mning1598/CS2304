const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require('./user_model.js');
const fs = require('fs');
const promClient = require("prom-client");
const promBundle = require("express-prom-bundle");
//const metricsMiddleware = promBundle({includeMethod: true});

const app = express();

const bundle = promBundle({
  includeMethod: true,
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000
    }
  }
});

app.use(bundle);

const blabCount = new promClient.Counter({name: 'blabCount', help: 'c1 help'});

const port = 3000;

app.use(bodyParser.json());
var userID = 0;

var mongooseUrl = fs.readFileSync('/run/secrets/' + process.env.DB_PASSWORD_FILE, 'utf8').trim()

mongoose.connect(mongooseUrl);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "[DB Connection] Failed"));
db.once("open", function() {
  console.log("[DB Connection] Successful");
});

app.get("/", (req, res) => res.send("CS 2304 Project API"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/health", async function(req, res) {

  var state = mongoose.connection.readyState;
  
  if (state == 1) {

    res.status(200).send("OK");

  }
  else {

    res.status(200).send("NOT-OK");

  }

});

app.get("/blabs", async function(req, res) {

  var createdSince = 0;

  if (req.query.createdSince !== undefined) {

    createdSince = parseInt(req.query.createdSince);

  }

  console.log(createdSince);

  User.find({ postTime: { $gt: createdSince }}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user.id] = user;
    });

    res.status(200).send(users);

  })

  

});

app.delete("/blabs/:id", async function(req, res) {

  User.deleteOne({ id: req.params.id }, function(err, users) {

    if (err) {

      res.status(404);

    }

    console.log("Deleted User [" + req.params.id + ']');

    res.status(200).send("Deleted User [" + req.params.id + ']');

  })

});

app.post("/blabs", function(req, res) {
  var toAdd = new User({
    id: userID,
    postTime: (Date.now() / 1000),
    author: { email: req.body.author.email, name: req.body.author.name },
    message: req.body.message
  });

  console.log('Adding new user [' + userID + ']: \n');
  console.log(toAdd);
  console.log('\n');

  userID = userID + 1;
  blabCount.inc(1);
  toAdd.save(function(err) {
    if (err) return console.log(err);
    else {
      res.status(201).send({
        message: "Blab added successfully!",
        id: toAdd.id,
        postTime: Date.now() / 1000,
        author: { email: req.body.author.email, name: req.body.author.name },
        message: req.body.message
      });
    }
  });
});
