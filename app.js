var express = require('express')
var path = require('node:path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const database = require('./database')

var routers = require('./routes')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routers)


module.exports = app
