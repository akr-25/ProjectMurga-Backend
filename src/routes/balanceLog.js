const express = require("express");
const router = express.Router();
const {
  addBalanceLog,
  fetchBalanceLogs,
} = require("../controllers/balanceLog");
const SchemaValidator = require("../middleware/schemaValidator");
const checkDate = require("../middleware/checkDate");

router.post(
  "/create",
  addBalanceLog
);

router.get("/fetch/?", checkDate, fetchBalanceLogs);

module.exports = router;
