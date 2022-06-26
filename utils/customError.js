function customError(message) {
    const error = new Error(message);
  
    // error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";

    return error;
  }
  
customError.prototype = Object.create(Error.prototype);