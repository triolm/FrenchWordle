const express = require("express");
const app = express();
const words = require('./mots.js')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/views/index.js')
})
app.get('/getword', (req, res) => {
    res.send(words[Math.floor(Math.random() * words.length)])
})

app.listen(3000, () => {
    console.log("listening")
});