'use strict'

const handlerErros = (error, request, response, next) => {
    return response.status(error.status || 500).json({
        error: {
            status: error.status || 500,
            name: error.name,
            code: error.code,
            message: error.message
        }
    })
}


module.exports = handlerErros