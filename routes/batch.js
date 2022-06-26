const express = require("express");
const router = express.Router();
const {
  addBatch,
  fetchBatchTransactions,
  fetchBatch,
  updateBatch,
  getCSV,
} = require("../controllers/batch");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkID = require("../middleware/checkID");
const checkType = require("../middleware/checkType");

router.post("/create", checkType, addBatch); //! schemaValidator has to be different i guess,
//! we are auto generating the batch ids from the req

router.post("/update", updateBatch);

router.get("/:id/transaction", checkID, fetchBatchTransactions);

router.get("/fetch/?", fetchBatch);
router.get("/csv/:id", getCSV);

module.exports = router;
