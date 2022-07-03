const express = require("express");
const router = express.Router();
const {
  addFeedConsumption,
  fetchFeedConsumptionLogs,
  fetchAllFeedLogs
} = require("../controllers/feedConsumption");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");

router.post(
  "/create",
  addFeedConsumption
);

router.get("/fetch/?", checkDate,  fetchFeedConsumptionLogs);
router.get("/fetchAll/?", checkDate,fetchAllFeedLogs);

module.exports = router;
