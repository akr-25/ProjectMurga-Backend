const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api400Error extends BaseError{
    constructor(
        description, 
        statusCode = httpStatusCodes.INTERNAL_SERVER, 
        name = 'IncompleteOperation', 
        isOperational = true 
    ){
        super(description, statusCode, isOperational, name)
    }
}

module.exports = Api400Error 