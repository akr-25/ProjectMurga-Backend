const express = require("express");
const router = express.Router();
const {
  addBalanceLog,
  fetchBalanceLogs,
  fetchAllBalanceLogs
} = require("../controllers/balanceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkDate = require("../middleware/checkDate");

router.post(
  "/create",
  addBalanceLog
);

router.get("/fetch/?", checkDate, fetchBalanceLogs);
router.get("/fetchAll/?", checkDate, fetchAllBalanceLogs);

module.exports = router;
