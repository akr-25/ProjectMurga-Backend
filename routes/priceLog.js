const express = require("express");
const router = express.Router();

const db = require("../database/mysql");

const {
  Request,
  User,
  FeedConsumptionLog,
  PriceLog,
  Batch,
} = require("../models");
const { where } = require("sequelize");
const {
  addPriceLog,
} = require("../controllers/priceLog");
const SchemaValidator = require("../middleware/SchemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);


router.post("/priceLog/create", SchemaValidator("pricelog_schema"), addPriceLog);

module.exports = router;
