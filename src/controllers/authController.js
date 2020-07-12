'use strict'

const environtentVariables = require('../config/environtentVariables')
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcryptjs');

const authController = {}

authController.login = async (request, response, next) => {
    try {
        const { email, password } = request.body
        const user = await User.findOne({ email })
        if (!user || !bcrypt.compareSync(password, user.password)) throw new Error('Credenciales incorrectas')
        user.password = null
        const token = jwt.sign({ user }, environtentVariables.JWT_SECREET, { expiresIn: '1d' })
        if (!token) throw new Error('authentication error')
        return response.status(200).json({
            user,
            token
        })
    } catch (error) {
        next(error)
    }
}

authController.singup = async (request, response, next) => {
    try {
        let { name, email, password } = request.body
        if (!name && !email && !password) {
            const error = new Error('Faltan argumentos')
            error.status = 400
            throw error
        }
        password = bcrypt.hashSync(password, 12)
        const user = new User({ name, email, password })
        await user.save()
        return response.status(201).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

module.exports = authController
