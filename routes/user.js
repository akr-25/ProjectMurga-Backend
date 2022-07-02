const express = require("express");
const router = express.Router();
const { addUser, fetchUser } = require("../controllers/user");
const SchemaValidator = require("../middleware/schemaValidator.js");


router.post("/create", addUser);
router.get("/fetch", fetchUser);

module.exports = router;
