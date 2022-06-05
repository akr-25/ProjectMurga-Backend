const express = require("express");
const router = express.Router();

// const db = require('../database/mysql');

const Sequelize = require("sequelize");
// const { sequelize } = require('../models');
const {
  Request,
  User,
  Transaction,
  Batch,
  PriceLog,
  FeedConsumptionLog,
  BalanceLog,
} = require("../models");
const Op = Sequelize.Op;

router.get("/request", async (req, res) => {
  const { user_id } = req.body;

  try {
    const request = await User.findOne({
      where: { user_id: user_id },
      include: Request,
    });
    return res
      .status(200)
      .send({ error: null, message: "success", data: { request } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

router.get("/batch?", async (req, res) => {
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
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

router.get("/batch/:id/transaction", async (req, res) => {
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
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

router.get("/request/:id/transaction", async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Request.findOne({
      where: { request_id: id },
      include: Transaction,
    });
    return res
      .status(200)
      .send({ error: null, message: "success", data: { transaction } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

router.get("/priceLog?", async (req, res) => {
  //! remove comment after testing integration with frontend

  // send the start date from frontend with proper type
  // expects --> http://localhost:3001/fetch/priceLog/date?start="04-05-2022"&end="06-05-2022"

  const { from, to } = req.query;

  //TODO ... what if to is null? handle that
  if (to == null) {
    to = new Date();
    from = to.setMonth(to.getMonth() - 3);
  }

  try {
    const pricelogs = await PriceLog.findAll({
      where: {
        date: {
          [Op.and]: [
            { [Op.gte]: Date.parse(from) },
            { [Op.lte]: Date.parse(to) },
          ],

          // all pricelogs such that [end >= pricelogs.date >= start]
        },
      },
    });

    return res
      .status(200)
      .send({ error: null, message: "success", data: { pricelogs } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

router.get("/feedConsumptionLog?", async (req, res) => {
  //! remove comment after testing integration with frontend

  // send the start date from frontend with proper type
  // expects --> http://localhost:3001/fetch/feedConsumptionLog/date?start="04-05-2022"&end="06-05-2022"

  const { from, to } = req.query;

  try {
    const feedlogs = await FeedConsumptionLog.findAll({
      where: {
        date: {
          [Op.and]: [
            { [Op.gte]: Date.parse(from) },
            { [Op.lte]: Date.parse(to) },
          ],
          // all pricelogs such that pricelogs.date >= start
        },
      },
    });

    return res
      .status(200)
      .send({ error: null, message: "success", data: { feedlogs } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

router.get("/balanceLog?", async (req, res) => {
  //! remove comment after testing integration with frontend

  // send the start date from frontend with proper type
  // expects --> http://localhost:3001/fetch/balanceLog/date?start="04-05-2022"&end="06-05-2022"

  const { from, to } = req.query;

  try {
    const balancelogs = await BalanceLog.findAll({
      where: {
        date: {
          [Op.and]: [
            { [Op.gte]: Date.parse(from) },
            { [Op.lte]: Date.parse(to) },
          ],
          // all pricelogs such that pricelogs.date >= start
        },
      },
    });

    return res
      .status(200)
      .send({ error: null, message: "success", data: { balancelogs } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: "failure", data: null });
  }
});

module.exports = router;
