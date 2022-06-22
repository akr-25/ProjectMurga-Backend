const {
  FeedConsumptionLog,
  Batch,
} = require("../models");

const Sequelize = require('sequelize');
const { getBatchCode } = require("../utils/getBatchCode");
const Op = Sequelize.Op;

module.exports = {
  addFeedConsumption: async (req, res) => {
    try {
      const batch = await Batch.findOne({
        where: { 
          batch_id: req.body.unit_id,
          is_active: "Y" 
        },
      });

      if(batch == null){
        throw `batch ${req.body.unit_id} not found`;
      }

      const feedConsumption = await batch.createFeedConsumptionLog(req.body);
      return res
      .status(200)
      .send({
        error: null,
        message: "success",
        data: { feedConsumption },
      });
    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchFeedConsumptionLogs: async (req, res) => {
    const { from, to } = req.query;

    var { type, sub_type } = req.body; 

    
    const search_id = String(getBatchCode(type, sub_type) + "%");

    try {
      const feedlogs = await FeedConsumptionLog.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],
            // all pricelogs such that pricelogs.date >= start
          },
          unit_id: {[Op.like] : search_id},
        },
      });

      if(pricelogs.length == 0){
        throw `no pricelogs for ${type}-${sub_type} exists`
      }

      return res
        .status(200)
        .send({ error: null, message: "success", data: { feedlogs } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
