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
      const {unit_id , rate, cost_per_gram} = req.body; 
      const batch = await Batch.findOne({
        where: { 
          batch_id: req.body.unit_id,
          is_active: "Y" 
        },
      });

      if(batch == null){
        throw `batch ${req.body.unit_id} not found`;
      }

      const feedConsumption = await batch.createFeedConsumptionLog({
        unit_id: unit_id, 
        rate: rate,
        cost_per_gram: cost_per_gram, 
      });
      return res
      .status(201)
      .send({error: null, message: "success", data: { feedConsumption } });
    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchFeedConsumptionLogs: async (req, res) => {
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

      if(feedlogs.length == 0){
        throw `no active feedlogs exist`
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
