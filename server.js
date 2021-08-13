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
    getData((err, data) => {
        if(err) {
            res.status(500).send(err.message)
            return
        }
        const searchPage = data.allMessage.find(text => (req.params.page)
        const viewData = {page}
        res.render('message', viewData)
    })
})


server.get('/', (req, res) => {
    getData((err, data) => {
        if(err) {
            res.status(500).send('getting data Error')
            return
        }
        const viewData = {data}
        res.render('home', viewData)
    })
})




module.exports = server