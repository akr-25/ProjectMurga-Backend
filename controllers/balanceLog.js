const {
  Batch
} = require("../models");

const Sequelize = require('sequelize');
const { getBatchCode } = require("../utils/getBatchCode");
const Op = Sequelize.Op;

module.exports = {
  addBalanceLog: async (req, res) => {
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

      const balanceLog = await batch.createBalanceLog(req.body);
      return res
      .status(200)
      .send({error: null,message: "success", data: { balanceLog },});
    } catch (err) {
      // console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchBalanceLogs: async (req, res) => {
    const { from, to } = req.query;
    
    var { type, sub_type } = req.body; 

    const search_id = String(getBatchCode(type, sub_type) + "%");
    
    try {
      const balancelogs = await BalanceLog.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],
            // all pricelogs such that pricelogs.date >= start
            unit_id: {[Op.like] : search_id}, 
          },
        },
      });

      return res
        .status(200)
        .send({ error: null, message: "success", data: { balancelogs } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
