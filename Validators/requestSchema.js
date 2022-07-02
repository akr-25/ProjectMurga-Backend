const Joi = require("joi");

const requestSchema = Joi.object().keys({
  request_id: Joi.string().required(),
  applicant_id: Joi.string().guid({ version: "uuidv4" }),
  approval: Joi.string().valid("Y", "N").uppercase().required(),
  type_of_unit: Joi.string().length(2).uppercase().required(),
  req_no_of_units: Joi.number().integer().required(),
  order_type: Joi.string().length(1).uppercase().required(),
});

module.exports = requestSchema;
