const express = require("express");
const router = express.Router();
const {
  addRequest,
  fetchRequestTransactions,
  fetchRequestByUser,
  updateRequest,
  fetchAllRequest,
} = require("../controllers/request");
const SchemaValidator = require("../middleware/schemaValidator.js");
const checkAuth = require("../middleware/checkAuth");
const checkID = require("../middleware/checkID");
const checkDate = require("../middleware/checkDate");

router.get("/", checkAuth, fetchRequestByUser);

router.get("/fetch/?", checkDate,  fetchAllRequest)

router.post("/create", addRequest);

router.post("/update", updateRequest)

router.get("/:id/transaction", checkID, fetchRequestTransactions);

module.exports = router;
