const express = require("express");
const router = express.Router();
const {
  addBalanceLog,
  fetchBalanceLogs,
} = require("../controllers/balanceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");

router.post(
  "/create",
  SchemaValidator("balancelog_schema"),
  addBalanceLog
);

router.get("/?", checkDate, fetchBalanceLogs);

module.exports = router;
