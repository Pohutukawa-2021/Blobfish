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
        if(searchPage === 1) {
            msg = data.allMessage[0].message[0]
        } else if(searchPage === 2) {
            msg = data.allMessage[1].message[0]
        } else if(searchPage === 3) {
            msg = data.allMessage[2].message[0]
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
        const viewData = {elemPath}
        res.render('home', viewData)
        console.log(viewData)

    })
})




module.exports = server