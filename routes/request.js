const express = require("express");
const router = express.Router();
const {
  addRequest,
  fetchRequestTransactions,
  fetchRequestByUser,
} = require("../controllers/request");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkAuth = require("../middleware/checkAuth");
const checkID = require("../middleware/checkID");

router.get("/", checkAuth, fetchRequestByUser);

router.post("/create", SchemaValidator("request_schema"), addRequest);

router.get("/:id/transaction", checkID, fetchRequestTransactions);

module.exports = router;
