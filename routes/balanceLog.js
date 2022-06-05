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
} = require("../controllers/balanceLog");
const SchemaValidator = require("../middleware/SchemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post(
  "/balanceLogs/create",
  SchemaValidator("balancelog_schema"),
  addBalanceLog
);

module.exports = router;