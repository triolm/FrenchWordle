const express = require("express");
const app = express();
const words = require('./mots.js')
require('dotenv').config();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/views/index.js')
})
app.get('/getword', (req, res) => {
    res.send(words[Math.floor(Math.random() * words.length)])
})

app.listen(port, () => {
    console.log(port)
});