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

  fetchBatchTransactions: async (req, res) => {
    const { id } = req.params;

    // console.log(id);

    try {
      const transaction = await Batch.findOne({
        where: { batch_id: id },
        include: Transaction,
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { transaction } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchBatch: async (req, res) => {
    const { state } = req.query;

    try {
      const batch = await Batch.findAll({
        where: { is_active: state },
        include: Transaction,
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
