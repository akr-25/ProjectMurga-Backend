const express = require("express");
const router = express.Router();
const { addPriceLog, fetchPriceLogs } = require("../controllers/priceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");
const checkType = require("../middleware/checkType");


router.post("/create", addPriceLog);

router.get("/fetch/?", checkType, checkDate, fetchPriceLogs);

module.exports = router;
