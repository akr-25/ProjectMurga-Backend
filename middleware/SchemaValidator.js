const createHttpError = require("http-errors");
//* Include joi to check error type
const Joi = require("joi");
//* Include all validators
const Validators = require("../Validators/index.js");

module.exports = (validator) => {
  // If validator does not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator does not exist`);

  return async (req, res, next) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message }));
      console.log(err);
      next(createHttpError(500));
    }
  };
};
