'use strict'

require('dotenv').config()

const environtentVariables = {}
environtentVariables.PORT = 3000 || process.env.PORT
environtentVariables.JWT_SECREET = process.env.JWT_SECREET
environtentVariables.URI_DB = process.env.URI_DB

module.exports = environtentVariables
