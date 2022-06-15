const express = require("express");
const router = express.Router();
const { addPriceLog, fetchPriceLogs } = require("../controllers/priceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");


router.post(
  "/create",
  SchemaValidator("pricelog_schema"),
  addPriceLog
);

router.get("/?", checkDate, fetchPriceLogs);

module.exports = router;
