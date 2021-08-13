const express = require('express')
const fs = require('fs')
const path = require('path')
const {getData} = require('./utils')
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
    let msg = ""
    getData((err, data) => {
        if(err) {
            res.status(500).send(err.message)
            return
        }
        let randomNumber = Math.floor(Math.random())
        if(searchPage === 1) {
            const messageRandomNumber = randomNumber * (data.allMessage[0].message.length-1)
            msg = data.allMessage[0].message[messageRandomNumber]
        } else if(searchPage === 2) {
            const messageRandomNumber = randomNumber * (data.allMessage[1].message.length-1)
            msg = data.allMessage[1].message[messageRandomNumber]
        } else if(searchPage === 3) {
            const messageRandomNumber = randomNumber * (data.allMessage[2].message.length-1)
            msg = data.allMessage[2].message[messageRandomNumber]
        }
        const viewData = {msg}
        console.log(viewData)
        res.render('message', viewData)
    })
})


server.get('/', (req, res) => {
    getData((err, data) => {
        if(err) {
            res.status(500).send('getting data Error')
            return
        }
        let elemPath = data.allMessage.map(elem => elem.path)
        console.log(elemPath)
        const viewData = {elemPath}
        res.render('home', viewData.elemPath)
    })
})




module.exports = server