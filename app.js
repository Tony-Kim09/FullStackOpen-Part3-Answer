const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const phonebookRouter = require('./controllers/contacts')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const morgan = require('morgan')
morgan.token('post', function (req, res) { return JSON.stringify(req.body)})

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('Successfully Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('There was an error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(morgan(':post :method :url :response-time'))
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', phonebookRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app