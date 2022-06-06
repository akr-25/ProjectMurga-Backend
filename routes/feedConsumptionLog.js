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
  fetchFeedConsumptionLogs,
} = require("../controllers/feedConsumption");
const SchemaValidator = require("../middleware/schemaValidator.js");

router.post(
  "/feedConsumption/create",
  SchemaValidator("feedconsumption_schema"),
  addFeedConsumption
);

router.get("/feedConsumptionLog?", fetchFeedConsumptionLogs);

module.exports = router;
