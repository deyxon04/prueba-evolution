'use strict'

const express = require('express')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')
const handlersErrors = require('./middleware/error')
const jwtMiddeware = require('./middleware/jwt')

const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Configurations
app.use(cors())

// Midldewars
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api', authRouter)
app.use('/api', jwtMiddeware.validateToken, taskRouter)

app.use(express.static('public'));

//haldlers errros
app.use(handlersErrors)

module.exports = app
