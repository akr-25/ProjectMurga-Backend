const {
  Batch,
  BalanceLog
} = require("../models");

const Sequelize = require('sequelize');
const { getBatchCode } = require("../utils/getBatchCode");
const batch = require("./batch");
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
        throw `batch ${unit_id} not found`; //TODO: create a customException https://stackoverflow.com/questions/69165892/how-to-throw-an-exception-with-a-status-code ; same todo for all the throw ctrl+c ctrl+v
      }

      const balanceLog = await batch.createBalanceLog({
        unit_id: unit_id,
        net_balance_type1: net_balance_type1,
        net_balance_type2: net_balance_type2,
        type_of_change: type_of_change, 
      });
      
      return res
      .status(201) 
      .send({error: null,message: "success", data: { balanceLog },});
    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
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
  
        if(balancelogs.length == 0){
          throw "no active balancelogs exist"
        }   
  
        return res
          .status(200)
          .send({ error: null, message: "success", data: { balancelogs } });
      }
      else{
        // console.log(batch_id); 

        const balancelogs = await BalanceLog.findOne({
          raw: true, 
          where: {
            unit_id: String(batch_id),  
          }, 
          order : [['updatedAt', 'DESC']], 
        })
        
        // console.log(balancelogs); 

        if(balancelogs == null){
          throw "no active balancelogs exist"
        }   
  
        return res
          .status(200)
          .send({ error: null, message: "success", data: { balancelogs }});
      }
      
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
