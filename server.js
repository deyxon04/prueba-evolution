'use strict'

const chalk = require('chalk')
const app = require('./src/app')
const mongoose = require('mongoose')

const environtentVariables = require('./src/config/environtentVariables')

async function main () {
  await app.listen(environtentVariables.PORT)
  console.log(chalk.bold.yellow('Server on port '), chalk.bold.blue(environtentVariables.PORT))
  await mongoose.connect(environtentVariables.URI_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
}
main()
