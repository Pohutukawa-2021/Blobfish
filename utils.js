const fs = require('fs')
const path = require('path')

module.exports = { getData }

function getData(cb) {
  const filePath = path.join(__dirname, 'data.json')

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      console.error(err.message)
      cb(new Error ("I got lost trying to find the file"))
      return
    }
    try {
      parseData = JSON.parse(content)
      cb(null, parseData)
    } catch (parseError) {
      console.error(parseError.message)
      cb(new Error ("Wow reading that data was too hard for me!"))

    }
  
  })
}