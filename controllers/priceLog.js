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

};
