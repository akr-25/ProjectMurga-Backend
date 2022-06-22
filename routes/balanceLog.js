const express = require("express");
const router = express.Router();
const {
  addBalanceLog,
  fetchBalanceLogs,
} = require("../controllers/balanceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");
const checkType = require("../middleware/checkType");

router.post(
  "/create",
  addBalanceLog
);

router.get("/fetch/?", checkType, checkDate, fetchBalanceLogs);

module.exports = router;
