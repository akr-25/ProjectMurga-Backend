const express = require("express");
const router = express.Router();

const db = require("../database/mysql");

const {
  Request,
  User,
  FeedConsumptionLog,
  PriceLog,
  Batch,
} = require("../models");
const { where } = require("sequelize");
const {
  addBatch,
  fetchBatchTransactions,
  fetchBatch,
} = require("../controllers/batch");
const SchemaValidator = require("../middleware/schemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post("/batch/create", SchemaValidator("batch_schema"), addBatch);

router.get("/batch/:id/transaction", fetchBatchTransactions);

router.get("/batch?", fetchBatch);

module.exports = router;
