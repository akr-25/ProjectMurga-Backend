const {
  Batch,
  BalanceLog
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
    
    try {
      const balancelogs = await Batch.findAll({
        where: { 
          is_active: "Y"
        },
        include: {
          model: BalanceLog, 
          required: true, 
          where: {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: Date.parse(from) },
                { [Op.lte]: Date.parse(to) },
              ],
              // all pricelogs such that balancelogs.date >= start
            },
          }
        }
      });

      if(balancelogs.length == 0){
        throw "no active balancelogs exist"
      }   

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
