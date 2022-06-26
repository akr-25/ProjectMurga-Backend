const {
  PriceLog,
  Batch,
} = require("../models");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  addPriceLog: async (req, res) => {
    try {
      const { unit_id, price_per_unit } = req.body;

      const batch = await Batch.findOne({
        where: { 
          batch_id: unit_id,
          is_active: "Y" 
        },
      });

      if(batch == null){
        throw `batch ${unit_id} not found`; 
      }

      const priceLog = await batch.createPriceLog({
        unit_id: unit_id, 
        price_per_unit: price_per_unit
      });

      return res
      .status(201)
      .send({ error: null, message: "success", data: { priceLog } });

    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchPriceLogs: async (req, res) => {
    let { from, to } = req.query;
    
    //* from & to have been checked in middleware, they DO NOT CONTAIN NULL values   

    try {
      const pricelogs = await Batch.findAll({
        where: { 
          is_active: "Y"
        },
        include: {
          model: PriceLog, 
          required: true, 
          where: {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: Date.parse(from) },
                { [Op.lte]: Date.parse(to) },
              ],
              // all pricelogs such that pricelogs.date >= start
            },
          }
        }
      });

      if(pricelogs.length == 0){
        throw "no active pricelogs exist"
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
