const {
  Batch,
  Transaction,
  BalanceLog,
  FeedConsumptionLog,
  PriceLog,
} = require("../models");
const { getBatchCode } = require("../utils/getBatchCode");
const { getMonth } = require("../utils/getMonth");

const { generateCSV } = require("../scripts/makecsv");
const { customError } = require("../utils/customError");
const { Op } = require("sequelize");

module.exports = {
  addBatch: async (req, res) => {
    try {
      const { type, sub_type } = req.body;

      const batch_code = getBatchCode(type, sub_type);
      const search_code = String(batch_code + "%");

      const last_batch = await Batch.findOne({
        raw: true,
        where: {
          batch_id: { [Op.like]: search_code },
        },
        order: [["createdAt", "DESC"]],
      });

      let lastid = 0;
      if (last_batch != null) {
        lastid = String(last_batch.batch_id).split("-").at(-1);
      }

      if (lastid == null) lastid = 0;

      const new_id = String(batch_code + "-" + (Number(lastid) + 1));

      const batch = await Batch.create({
        batch_id: new_id,
      });

      const balancelog = await BalanceLog.create({
        unit_id: new_id,
        net_balance_type1: 0,
        net_balance_type2: 0,
        type_of_change: "Initialization",
      });

      return res
        .status(201)
        .send({ error: null, message: "success", data: { batch, balancelog } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  updateBatch: async (req, res) => {
    //? needed for deactivating a batch

    try {
      const { is_active, batch_id } = req.body;

      const rows_updated = await Batch.update(
        { is_active: is_active },
        {
          where: { batch_id: batch_id },
        }
      );
      //TODO: check if the batch even exists or not!
      //* if there is no batch then rows_updated == 0 !!

      if (rows_updated == 0) {
        throw new customError(`no batch with batch_id = ${batch_id} found`);
      }

      return res
        .status(200)
        .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchBatchTransactions: async (req, res) => {
    const { id } = req.params;

    try {
      const transaction = await Batch.findOne({
        where: { batch_id: id },
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { transaction } });
    } catch (err) {
      // console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchBatch: async (req, res) => {
    var { state } = req.query;

    if (state == null) state = "Y";

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
  getCSV: async (req, res) => {
    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.params.id },
        include: [
          { model: BalanceLog },
          { model: FeedConsumptionLog },
          { model: PriceLog },
        ],
      });

      var finalData = [];
      startDate = batch.createdAt;
      endDate = batch.updatedAt;

      var date1 = new Date(startDate);
      var date2 = new Date(endDate);
      if (batch.is_active == "Y") {
        date2 = new Date(); //today's date
      }

      let loop = new Date(date1);
      console.log(loop.toLocaleDateString());

      while (loop <= date2) {
        var jsonData = {
          date: loop.toLocaleDateString(),
          net_balance_type1: "NA",
          net_balance_type2: "NA",
          type_of_change: "NA",
          rate: "NA",
          cost_per_gram: "NA",
          price_per_unit: "NA",
        };
        for (var i = 0; i < batch.BalanceLogs.length; ++i) {
          let obj = batch.BalanceLogs[i];
          if (
            loop.toLocaleDateString() ===
            new Date(obj.updatedAt).toLocaleDateString()
          ) {
            jsonData["net_balance_type1"] = obj.net_balance_type1;
            jsonData["net_balance_type2"] = obj.net_balance_type2;
            jsonData["type_of_change"] = obj.type_of_change;
          }
        }
        for (var i = 0; i < batch.FeedConsumptionLogs.length; ++i) {
          let obj = batch.FeedConsumptionLogs[i];
          if (
            loop.toLocaleDateString() ===
            new Date(obj.updatedAt).toLocaleDateString()
          ) {
            jsonData["rate"] = obj.rate;
            jsonData["cost_per_gram"] = obj.cost_per_gram;
          }
        }
        for (var i = 0; i < batch.PriceLogs.length; ++i) {
          let obj = batch.PriceLogs[i];
          if (
            loop.toLocaleDateString() ===
            new Date(obj.updatedAt).toLocaleDateString()
          ) {
            jsonData["price_per_unit"] = obj.price_per_unit;
          }
        }
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        finalData.push(jsonData);
      }
      console.log(finalData);
      generateCSV(finalData);
      res
        .status(200)
        .send({ error: null, message: "success", data: { batch } });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: err, message: "failure", data: null });
    }
  },
};
