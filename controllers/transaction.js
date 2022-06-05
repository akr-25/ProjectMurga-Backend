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
  addTransaction: async (req, res) => {
    try {
      const request = await Request.findOne({ where: req.body.order_id });
      const transaction = await request.createTransaction(req.body);
      return res.send({
        error: null,
        message: "success",
        data: { transaction },
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
