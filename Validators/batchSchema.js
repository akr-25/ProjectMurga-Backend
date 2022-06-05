const Joi = require('joi');

const batchSchema = Joi.object().keys({
        batch_code:Joi.string().required(),
})

module.exports = batchSchema;