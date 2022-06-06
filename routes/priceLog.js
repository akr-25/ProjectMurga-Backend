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
const { addPriceLog, fetchPriceLogs } = require("../controllers/priceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post(
  "/priceLog/create",
  SchemaValidator("pricelog_schema"),
  addPriceLog
);

router.get("/priceLog?", fetchPriceLogs);

module.exports = router;
