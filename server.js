'use strict'

const chalk = require('chalk')
const app = require('./src/app')
const environtentVariables = require('./src/config/environtentVariables')

async function main() {
    await app.listen(environtentVariables.PORT)
    console.log(chalk.bold.yellow('Server on port '), chalk.bold.blue(environtentVariables.PORT))
}
main()
