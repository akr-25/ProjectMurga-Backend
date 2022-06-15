const express = require("express");
const router = express.Router();
const {
  addBatch,
  fetchBatchTransactions,
  fetchBatch,
} = require("../controllers/batch");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkID = require("../middleware/checkID");


router.post("/create", SchemaValidator("batch_schema"), addBatch);

router.get("/:id/transaction", checkID, fetchBatchTransactions);

router.get("/?", fetchBatch);

module.exports = router;
