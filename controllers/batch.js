const {
  Batch, 
  BalanceLog
} = require("../models");
const { getBatchCode } = require("../utils/getBatchCode");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const Api404Error = require("../errors/Api404Error");

module.exports = {
  addBatch: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const {type, sub_type} = req.body; 

      const batch_code = getBatchCode(type, sub_type); 
      const search_code = String(batch_code + "%"); 

      const last_batch = await Batch.findOne( 
        {
          raw: true, 
          where: {
            batch_id: {[Op.like] : search_code }
          },
          order: [ [ 'createdAt', 'DESC' ]],
        }
      );
      
      let lastid = 0
      if(last_batch != null){
        lastid = String(last_batch.batch_id).split("-").at(-1); 
      }
      
      if(lastid == null) lastid = 0; 

      const new_id = String(batch_code + "-" + (Number(lastid)+1)); 

       
      
      const batch = await Batch.create({
        batch_id : new_id, 
      }, {transaction: t});

      const balancelog = await BalanceLog.create({
        unit_id : new_id, 
        net_balance_type1: 0,
        net_balance_type2: 0, 
        type_of_change: "Initialization"
      }, {transaction: t})
      
      await t.commit() 

      return res
        .status(200)
        .send({ error: null, message: "success", data: { batch, balancelog } });

    } catch (err) {
      await t.rollback()

      next(err)
    }
  },

  updateBatch: async (req, res) => {
    //? needed for deactivating a batch 

    try {
      const { is_active, batch_id } = req.body; 

      const rows_updated = await Batch.update({is_active: is_active}, {
        where: {batch_id : batch_id}
      }); 

      if(rows_updated == 0){
        throw new Api404Error(`no batch with batch_id: ${batch_id} found`) 
      }
      
      return res
      .status(200)
      .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchBatchTransactions: async (req, res) => {
    const { id } = req.params;

    try {
      const transaction = await Batch.findOne({
        where: { batch_id: id },
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { transaction } });
    } catch (err) {
      // console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchBatch: async (req, res) => {
    var { state } = req.query;

    if(state == null) state = "Y"; 

    try {
      const batch = await Batch.findAll({
        where: { is_active: state },
        include: Transaction,
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
