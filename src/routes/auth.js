const express = require("express");
let router = express.Router();
const {
  status,
  logout,
  login,
  googleCallback,
  googleLogin,
} = require("../controllers/auth");

router.get("/login", (req, res) => {
  // console.log(req.baseUrl);
  res.render("login");
});

router.get("/google", googleLogin);

router.get("/google/callback", googleCallback);

router.post("/login", login);

router.get("/status", status);

router.post("/logout", logout);

module.exports = router;
