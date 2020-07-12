'use strict'

const jwt = require('jsonwebtoken')
const environtentVariables = require('../config/environtentVariables')

const jwtMiddeware = {}


jwtMiddeware.validateToken = (request, response, next) => {
    jwt.verify(request.headers.authorization, environtentVariables.JWT_SECREET, (error, decoded) => {
        if (error) {
            error.status = 401
            next(error)
        }
        request.user = decoded.user
        next()
    })
}

module.exports = jwtMiddeware