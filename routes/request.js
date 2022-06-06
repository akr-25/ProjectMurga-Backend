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
  addRequest,
  fetchRequestTransactions,
  fetchRequestByUser,
} = require("../controllers/request");
const SchemaValidator = require("../middleware/schemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.get("/", fetchRequestByUser);

router.post("/create", SchemaValidator("request_schema"), addRequest);

router.get("/:id/transaction", fetchRequestTransactions);

module.exports = router;
