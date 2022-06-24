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
  addFeedConsumption
);

router.get("/fetch/?", checkDate,  fetchFeedConsumptionLogs);

module.exports = router;
