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
  addFeedConsumption,
} = require("../controllers/feedConsumption");
const SchemaValidator = require("../middleware/SchemaValidator.js");

router.post(
  "/feedConsumption/create",
  SchemaValidator("feedconsumption_schema"),
  addFeedConsumption
);

module.exports = router;
