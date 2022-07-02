const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api401Error extends BaseError{
    constructor(
        description, 
        statusCode = httpStatusCodes.UNAUTHORIZED, 
        name = 'UnauthorizedUser', 
        isOperational = true 
    ){
        super(description, statusCode, isOperational, name)
    }
}

module.exports = Api401Error 