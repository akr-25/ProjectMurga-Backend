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
  addBalanceLog,
  fetchBalanceLogs,
} = require("../controllers/balanceLog");
const SchemaValidator = require("../middleware/schemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post(
  "/balanceLogs/create",
  SchemaValidator("balancelog_schema"),
  addBalanceLog
);

router.get("/balanceLog?", fetchBalanceLogs);

module.exports = router;
