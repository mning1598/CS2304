const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/blabs', async function (req, res) {

})

app.delete('/blabs/:id', async function (req, res) {

})

app.post('/blabs', async function (req, res) {

})