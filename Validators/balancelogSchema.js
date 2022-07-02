const Joi = require("joi").extend(require("@joi/date"));

const balancelogSchema = Joi.object().keys({
  date: Joi.date().format("DD-MM-YYYY").required(),
  unit_id: Joi.string().required(),
  net_balance_type1: Joi.number().integer().required(),
  net_balance_type2: Joi.number().integer().required(),
  type_of_change: Joi.string().length(1).required(),
});

module.exports = balancelogSchema;
