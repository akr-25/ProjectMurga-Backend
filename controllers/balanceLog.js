const {
  Batch,
  BalanceLog
} = require("../models");

const Sequelize = require('sequelize');
const Api404Error = require("../errors/Api404Error");
const Op = Sequelize.Op;

module.exports = {
  addBalanceLog: async (req, res) => {
    try {
      const {unit_id, net_balance_type1, net_balance_type2, type_of_change } = req.body; 

      const batch = await Batch.findOne({
        where: { 
          batch_id: unit_id,
          is_active: "Y" 
        },
      });

      if(batch == null){
        throw new Api404Error(`no batch with batch_id: ${batch_id} found`)
      }

      const balanceLog = await batch.createBalanceLog({
        unit_id: unit_id,
        net_balance_type1: net_balance_type1,
        net_balance_type2: net_balance_type2,
        type_of_change: type_of_change, 
      });
      
      return res
      .status(201) 
      .send({error: null , message: "success", data: { balanceLog },});
    } catch (err) {
      next(err)
    }
  },

  fetchBalanceLogs: async (req, res) => {
    const { from, to, batch_id } = req.query;
    
    try {
      if(batch_id == null){
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
              },
            },
            limit: 1, 
            order: [ [ 'updatedAt', 'DESC' ]],
          }
        });
  
        if(balancelogs == null){
          throw new Api404Error("no active balancelogs exist")
        }   
  
        return res
          .status(200)
          .send({ error: null, message: "success", data: { balancelogs } });
      }
      else{
        const balancelogs = await BalanceLog.findOne({
          raw: true, 
          where: {
            unit_id: String(batch_id),  
          }, 
          order : [ ['updatedAt', 'DESC'] ], 
        })
        

        if(balancelogs == null){
          throw new Api404Error(`no batch with batch_id: ${batch_id} exist`) 
        }
  
        return res
          .status(200)
          .send({ error: null, message: "success", data: { balancelogs }});
      }
      
    } catch (err) {
      next(err) 
    }
  },
};
