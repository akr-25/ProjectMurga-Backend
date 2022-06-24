const express = require("express");
const router = express.Router();
const {
  addFeedConsumption,
  fetchFeedConsumptionLogs,
} = require("../controllers/feedConsumption");
const SchemaValidator = require("../middleware/schemaValidator");
const checkDate = require("../middleware/checkDate");

router.post(
  "/create",
  addFeedConsumption
);

router.get("/fetch/?", checkDate,  fetchFeedConsumptionLogs);

module.exports = router;
