const {
  FeedConsumptionLog,
  Batch,
} = require("../models");

const Sequelize = require('sequelize');
const { getBatchCode } = require("../utils/getBatchCode");
const Api404Error = require("../errors/Api404Error");
const Api400Error = require("../errors/api400Error");
const Op = Sequelize.Op;

module.exports = {
  addFeedConsumption: async (req, res, next) => {
    try {
      const {unit_id , rate, cost_per_gram} = req.body; 
      const batch = await Batch.findOne({
        where: { 
          batch_id: req.body.unit_id,
          is_active: "Y" 
        },
      });

      if(batch == null){
        throw new Api404Error(`batch ${req.body.unit_id} not found`);
      }

      const feedConsumption = await batch.createFeedConsumptionLog({
        unit_id: unit_id, 
        rate: rate,
        cost_per_gram: cost_per_gram, 
      });

      if(feedConsumption == null){
        throw new Api400Error("feedconsumptionlog cannot be created. try again later")
      }

      return res
      .status(201)
      .send({error: null, message: "success", data: { feedConsumption } });
    } catch (err) {
      next(err)
    }
  },

  fetchFeedConsumptionLogs: async (req, res, next) => {
    let { from, to } = req.query;

    try {
      const feedlogs = await Batch.findAll({
        where: { 
          is_active: "Y"
        },
        include: {
          model: FeedConsumptionLog, 
          required: true, 
          where: {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: Date.parse(from) },
                { [Op.lte]: Date.parse(to) },
              ],
              // all feedlogs such that feedlogs.date >= start
            },
          }
        }
      });

      if(feedlogs == null){
        throw new Api404Error(`no active feedlogs exist`) 
      }

      return res
        .status(200)
        .send({ error: null, message: "success", data: { feedlogs } });
    } catch (err) {
      next(err)
    }
  },
};
