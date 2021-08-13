const express = require('express')
const fs = require('fs')
const path = require('path')
const { getData } = require('./utils')
const server = express()
const blobFish = require('./routes')
const hbs = require('express-handlebars')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

server.get('/:page', (req, res) => {
  const searchPage = Number(req.params.page)
  let msg = ''
  getData((err, data) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    const randomNumber = Math.floor(Math.random() * 3)
    if (searchPage === 1) {
      const messageRandomNumber = randomRange(0, 4)
      console.log(messageRandomNumber)
      msg = data.allMessage[0].message[messageRandomNumber]
    } else if (searchPage === 2) {
      const messageRandomNumber = randomRange(0, 4)
      msg = data.allMessage[1].message[messageRandomNumber]
    } else if (searchPage === 3) {
      const messageRandomNumber = randomRange(0, 4)
      msg = data.allMessage[2].message[messageRandomNumber]
    }
    const viewData = {
      msg
    }
    res.render('message', viewData)
  })
})

server.get('/', (req, res) => {
  getData((err, data) => {
    if (err) {
      res.status(500).send('getting data Error')
      return
    }

    const viewData = {
      data
    }

    res.render('home', viewData)
  })
})

module.exports = server

function randomRange (min, max) {
  return Math.floor(Math.random() * (max - min) + 1 + min)
}
