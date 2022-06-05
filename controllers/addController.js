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

  addUser: async (req, res) => {
    // { user_id, first_name, last_name, contact_no, email, password } = req.body;
    try {
      const user = await User.create(req.body);
      return res.send({ error: null, message: "success", data: { user } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
  addRequest: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { user_id: req.body.applicant_id },
      });
      const request = await user.createRequest(req.body);
      return res.send({ error: null, message: "success", data: { request } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  addFeedConsumption: async (req, res) => {
    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged
    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.body.unit_id },
      });
      const feedConsumption = await batch.createFeedConsumptionLog(req.body);
      return res.send({
        error: null,
        message: "success",
        data: { feedConsumption },
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  addPriceLog: async (req, res) => {
    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged

    //? C-001 --> C-002 ?

    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.body.unit_id },
      });
      const priceLog = await batch.createPriceLog(req.body);
      return res.send({ error: null, message: "success", data: { priceLog } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  addBalanceLog: async (req, res) => {
    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged

    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.body.unit_id },
      });
      const balanceLog = await batch.createBalanceLog(req.body);
      return res.send({
        error: null,
        message: "success",
        data: { balanceLog },
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  addBatch: async (req, res) => {
    //TODO -- update batch model add default to is_active

    try {
      const batch = await Batch.create(req.body);
      return res.send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
