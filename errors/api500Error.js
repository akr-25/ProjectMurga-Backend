const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api500Error extends BaseError{
    constructor(
        description, 
        statusCode = httpStatusCodes.NOT_FOUND, 
        name = 'InternalServerError', 
        isOperational = true 
    ){
        super(description, statusCode, isOperational, name)
    }
}

module.exports = Api500Error 