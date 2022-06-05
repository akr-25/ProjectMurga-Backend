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
} = require("../controllers/batch");
const SchemaValidator = require("../middleware/SchemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);


router.post("/batch/create", SchemaValidator("batch_schema"), addBatch);

module.exports = router;
