const {
  Batch
} = require("../models");
const {incrementBatchID} = require("../utils/incrementBatchID");

module.exports = {
  addBatch: async (req, res) => {
    try {
      const count = await Batch.count(); 
      
      const id = incrementBatchID(count, req.body.type, req.body.sub_type); 

      const batch = await Batch.create({
        batch_id : id, 
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

  updateBatch: async (req, res) => {
    //? needed for deactivating a batch 

    try {
      const batch = await Batch.update({is_active: req.body.is_active}, {
        where: {batch_id : req.body.batch_id}
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

  fetchBatchTransactions: async (req, res) => {
    const { id } = req.params;

    try {
      const transaction = await Batch.findOne({
        where: { batch_id: id },
        include: Transaction,
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { transaction } });
    } catch (err) {
      console.log(err);
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
        where: { is_active: state }
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
