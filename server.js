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
        const searchPage = data.allMessage.find(text => (req.params.page))
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
        let elemPath = data.allMessage.map(elem => elem.path)
        console.log(elemPath)
        const viewData = {elemPath}
        res.render('home', viewData.elemPath)
    })
})




module.exports = server