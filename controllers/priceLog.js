const {
  PriceLog,
  Batch,
} = require("../models");

const Sequelize = require('sequelize');
const { getBatchCode } = require("../utils/getBatchCode");
const Op = Sequelize.Op;

module.exports = {
  addPriceLog: async (req, res) => {
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

      const priceLog = await batch.createPriceLog(req.body);
      return res.status(200).send({ error: null, message: "success", data: { priceLog } });
    } catch (err) {
      // console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchPriceLogs: async (req, res) => {
    var { from, to } = req.query;

    var { type, sub_type } = req.body; 

    
    const search_id = String(getBatchCode(type, sub_type) + "%"); 
    
    //* from & to have been checked in middleware, they DO NOT CONTAIN NULL values   

    try {
      const pricelogs = await PriceLog.findAll({
        where: { 
          createdAt: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],
            // all pricelogs such that [end >= pricelogs.date >= start]
          },
          unit_id: {[Op.like] : search_id}, 
        },
      });

      if(pricelogs.length == 0){
        throw `no pricelogs for ${type}-${sub_type} exists`
      }   

      return res
        .status(200)
        .send({ error: null, message: "success", data: { pricelogs } });
    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
