const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./config/routes')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
const app = express()
const { dbURI, port } = require('./config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => console.log(`Express is listening on port ${port}`))