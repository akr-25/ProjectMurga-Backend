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
const { addUser } = require("../controllers/user");
const SchemaValidator = require("../middleware/schemaValidator.js");
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post("/user/create", SchemaValidator("user_schema"), addUser);

module.exports = router;
