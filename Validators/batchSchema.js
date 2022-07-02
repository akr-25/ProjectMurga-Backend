const Joi = require("joi");

const batchSchema = Joi.object().keys({
  batch_id: Joi.string().required(),
  is_active: Joi.string().required()
});

module.exports = batchSchema;
