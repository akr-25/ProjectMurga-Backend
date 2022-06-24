const express = require("express");
let router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, (req, res) => {
  res.render("dashboard", { name: req.user.first_name });
});

module.exports = router;
