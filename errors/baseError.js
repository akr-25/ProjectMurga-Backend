class BaseError extends Error{
    constructor(description, statusCode, isOperational, name){
        super(name)
        Object.setPrototypeOf(this, new.target.prototype)

        this.description = description
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

module.exports = BaseError; 