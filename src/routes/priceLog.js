const express = require("express");
const router = express.Router();
const { addPriceLog, fetchPriceLogs } = require("../controllers/priceLog");
const SchemaValidator = require("../middleware/schemaValidator");
const checkDate = require("../middleware/checkDate");

router.post("/create", addPriceLog);

router.get("/fetch/?", checkDate, fetchPriceLogs);

module.exports = router;
