const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/user");
const SchemaValidator = require("../middleware/schemaValidator.js");


router.post("/create", addUser);

module.exports = router;
