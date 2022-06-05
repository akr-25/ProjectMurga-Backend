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
} = require("../controllers/request");
const SchemaValidator = require("../middleware/SchemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post("/request/create", SchemaValidator("request_schema"), addRequest);


module.exports = router;
