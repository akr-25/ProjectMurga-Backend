const {
  Batch, 
  Transaction
} = require("../models");
const { getBatchCode } = require("../utils/getBatchCode");
const { incrementID } = require("../utils/incrementID");
const { Op } = require("sequelize");

module.exports = {
  addBatch: async (req, res) => {
    try {
      const {type, sub_type} = req.body; 

      const batch_code = getBatchCode(type, sub_type); 
      const search_code = String(batch_code + "%"); 

      const count = await Batch.count(
        {
          where: {
            batch_id: {[Op.like] : search_code }
          }
        }
      ); //TODO: create a corresponding balanceLog with 0 initial value
      
      const new_id = String(batch_code + "-" + incrementID(count)); //TODO: the new batch id should be generated by using the max batch id in the database and incrementing it by 1 
    
      const batch = await Batch.create({
        batch_id : new_id, 
      });

      return res
      .status(200) //TODO: status code should be 201 for creation
      .send({ error: null, message: "success", data: { batch } });

    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  updateBatch: async (req, res) => {
    //? needed for deactivating a batch 

    try {
      const batch = await Batch.update({is_active: req.body.is_active}, {
        where: {batch_id : req.body.batch_id}
      }); //TODO: check if the batch even exists or not!

      return res
      .status(200)
      .send({ error: null, message: "success", data: { batch } });
    } catch (err) {
      // console.log(err);
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