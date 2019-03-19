const express = require('express')
var mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/cs2304project");

var dataSchema = new mongoose.Schema({
    id: String,
    posttime: Date.now(),
    author: { email: String, name: String },
    message: String
   });

var User = mongoose.model("User", dataSchema)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/blabs', async function (req, res) {

})

app.delete('/blabs/:id', async function (req, res) {

})

app.post('/blabs', async function (req, res) {

})