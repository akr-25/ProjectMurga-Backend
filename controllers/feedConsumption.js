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
};
