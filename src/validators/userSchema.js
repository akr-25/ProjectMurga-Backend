const Joi = require("joi");
const PersonID = Joi.string().guid({ version: "uuidv4" });
const name = Joi.string()
  .regex(/^[A-Z]+$/)
  .uppercase();
const phone = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/)
  .required();
const email = Joi.string().email().lowercase().required();
const password = Joi.string().min(7).required().strict();

const userSchema = Joi.object().keys({
  user_id: PersonID,
  first_name: name.required(),
  last_name: name,
  contact_no: phone,
  email: email,
  password: password,
});

module.exports = userSchema;
