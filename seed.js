const fs = require('fs')
const words = require('an-array-of-french-words')

fiveLetters = words.filter(word => word.length == 5)

fs.writeFile('./mots.js', JSON.stringify(fiveLetters), err => {
    if (err) {
        console.error(err)
        return
    }
})