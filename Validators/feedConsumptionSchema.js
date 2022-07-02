const Joi = require("joi").extend(require("@joi/date"));

const feedconsumptionSchema = Joi.object().keys({
  date: Joi.date().format("DD-MM-YYYY").required(),
  unit_id: Joi.string().required(),
  approval: Joi.string().valid("Y", "N").uppercase().required(),
  rate: Joi.number().integer().required(),
  cost_per_gram: Joi.number().integer().required(),
});

module.exports = feedconsumptionSchema;
