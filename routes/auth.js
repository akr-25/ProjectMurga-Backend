const express = require("express");
let router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  console.log(req.baseUrl);
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
<<<<<<< HEAD
    successRedirect: "http://localhost:3000/temp",
=======
    successRedirect: "http://localhost:3000/",
>>>>>>> c87249011b5caa616b5278245a9a92974d1eced8
    failureRedirect: "/login",
  })
);

router.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
          console.log('Inside req.login() callback')
          console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
          console.log(`req.user: ${JSON.stringify(req.user)}`)
          return res.redirect('/dashboard');
      })
  })(req, res, next);
});

router.get("/status", (req, res) => {
<<<<<<< HEAD
 // res.set('Access-Control-Allow-Origin', '*')
  console.log(req.user);
  
=======
  console.log(req.user);
>>>>>>> c87249011b5caa616b5278245a9a92974d1eced8
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
