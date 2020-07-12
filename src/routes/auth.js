'use strict'

const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/login', authController.login)
authRouter.post('/signup', authController.singup)

module.exports = authRouter
