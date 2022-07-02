const {
  PriceLog,
  Batch,
} = require("../models");

const Sequelize = require('sequelize');
const Api404Error = require("../errors/api404Error");
const Op = Sequelize.Op;

module.exports = {
  addPriceLog: async (req, res, next) => {
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
      next(err)
    }
  },

  fetchPriceLogs: async (req, res, next) => {
    let { from, to } = req.query;
    
    //* from & to have been checked in middleware, they DO NOT CONTAIN NULL values   

    try {
      const pricelogs = await Batch.findAll({
        where: { 
          is_active: "Y"
        },
        include: {
          model: PriceLog, 
          limit: 1, 
          separate: true, 
          required: true, 
          where: {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: Date.parse(from) },
                { [Op.lte]: Date.parse(to) },
              ], 
              // all pricelogs such that pricelogs.date >= start
            },
          },
          order: [ [ 'updatedAt', 'DESC' ]],
        }
      });

      if(pricelogs == null){
        throw new Api404Error("no active pricelogs exist")
      }

      return res
        .status(200)
        .send({ error: null, message: "success", data: { pricelogs } });
    } catch (err) {
      next(err)
    }
  },
};
