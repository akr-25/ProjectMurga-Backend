const Joi = require("joi").extend(require("@joi/date"));

const priceSchema = Joi.object().keys({
  date: Joi.date().format("DD-MM-YYYY").required(),
  unit_id: Joi.string().required(),
  price_per_unit: Joi.number().integer().required(),
});

module.exports = priceSchema;
