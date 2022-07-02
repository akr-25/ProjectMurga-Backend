// routes
const express = require("express");
const router = express.Router();
const { addOrganization, fetchOrganization } = require("../controllers/organization");
const SchemaValidator = require("../middleware/schemaValidator.js");

router.get("/fetch", fetchOrganization);
router.post("/create", addOrganization);

module.exports = router;