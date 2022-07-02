const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api404Error extends BaseError{
    constructor(
        description, 
        statusCode = httpStatusCodes.NOT_FOUND, 
        name = 'NotFound', 
        isOperational = true 
    ){
        super(description, statusCode, isOperational, name)
    }
}

module.exports = Api404Error 