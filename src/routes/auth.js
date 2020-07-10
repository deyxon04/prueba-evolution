'use strict'

const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/login', authController.login)
authRouter.post('/singup', authController.singup)

module.exports = authRouter
