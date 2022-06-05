const express = require("express");
const router = express.Router();

const db = require("../database/mysql");

const Sequelize = require("sequelize");
const { sequelize } = require("../models");
const { Request, User } = require("../models");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  Request.findAll() //TODO: change to await async code
    .then((gigs) => console.log(gigs))
    .catch((e) => console.log(e));

  res.end();
});
module.exports = router;
