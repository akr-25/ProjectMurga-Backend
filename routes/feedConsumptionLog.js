const express = require("express");
const router = express.Router();
const {
  addFeedConsumption,
  fetchFeedConsumptionLogs,
} = require("../controllers/feedConsumption");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");

router.post(
  "/create",
  SchemaValidator("feedconsumption_schema"),
  addFeedConsumption
);

router.get("/?", checkDate,  fetchFeedConsumptionLogs);

module.exports = router;
