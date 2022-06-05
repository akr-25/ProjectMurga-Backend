const Joi = require('joi');

const transactionSchema = Joi.object().keys({
    transaction_id:Joi.string().guid({version: 'uuidv4'}),
    order_id:Joi.string().required(),
    unit_id:Joi.string().required(),
     rate_per_unit:Joi.number().integer().required(),
     no_of_units:Joi.number().integer().required()
})

module.exports = transactionSchema;