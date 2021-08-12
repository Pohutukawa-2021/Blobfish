const express = require('express')
const fs = require('fs')
const path = require('path')
const {} = require('./utils')
const server = express()
const blobFish = require('./routes')
const hbs = require('express-handlebars')
const { getHeapCodeStatistics } = require('v8')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


server.get('/', (req, res) => {
    getData((err, data) => {
        if(err) {
            res.status(500).send('getting data Error')
            return
        }
        console.log(data)
        const viewData = {data}
        res.render('home', viewData)
    })
})
module.exports = server