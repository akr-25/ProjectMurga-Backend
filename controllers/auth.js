const passport = require("passport");
const express = require("express");
const {
  Request,
  User,
  FeedConsumptionLog,
  PriceLog,
  Batch,
} = require("../models");
const { where } = require("sequelize");
const { userSchema } = require("../Validators/userSchema.js");
const Joi = require("joi");

module.exports = {
  status: (req, res) => {
    console.log(req.user);
    if (!req.user) {
      res.send({ auth: false });
    } else {
      res.send({ auth: true, user: req.user }); //TODO: Don't give every info of user.
    }
  },

  logout: (req, res) => {
    //!FIX: Should be a post request, not working with post
    req.logOut();
    req.session.destroy();
    // res.redirect("http:localhost:3000/");
    res.end();
  },

  login: (req, res, next) => {
    // console.log('Inside POST /login callback')
    passport.authenticate("local", (err, user, info) => {
      // console.log('Inside passport.authenticate() callback');
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      // console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        // console.log('Inside req.login() callback')
        // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        // console.log(`req.user: ${JSON.stringify(req.user)}`)
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  },

  googleCallback: passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth/login",
  }),

  googleLogin: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
};
