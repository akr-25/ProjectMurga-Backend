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
  addTransaction,
} = require("../controllers/transaction");
const SchemaValidator = require("../middleware/SchemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post(
  "/transaction/create",
  SchemaValidator("transaction_schema"),
  addTransaction
);


module.exports = router;
