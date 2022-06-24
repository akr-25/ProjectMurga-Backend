const express = require("express");
const router = express.Router();
const { addTransaction } = require("../controllers/transaction");
const SchemaValidator = require("../middleware/schemaValidator.js");

router.post(
  "/create",
  SchemaValidator("transaction_schema"),
  addTransaction
);

module.exports = router;
