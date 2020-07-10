'use strict'

const express = require('express')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/auth')

const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Configuraciones
app.use(cors())

// Midldewars
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api', authRouter)
app.use('/api', taskRouter)

module.exports = app
