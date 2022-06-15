const {
  PriceLog,
  Batch,
} = require("../models");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  addPriceLog: async (req, res) => {
    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged

    //? C-001 --> C-002 ?

    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.body.unit_id },
      });
      const priceLog = await batch.createPriceLog(req.body);
      return res.send({ error: null, message: "success", data: { priceLog } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchPriceLogs: async (req, res) => {
    //TODO remove comment after testing integration with frontend

    // send the start date from frontend with proper type
    // expects --> http://localhost:3001/fetch/priceLog/date?start="04-05-2022"&end="06-05-2022"

    var { from, to } = req.query;
    
    //* from & to have been checked in middleware, they DO NOT CONTAIN NULL values   

    try {
      const pricelogs = await PriceLog.findAll({
        where: {
          date: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],

            // all pricelogs such that [end >= pricelogs.date >= start]
            
          },
        },
      });

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
