const {
  FeedConsumptionLog,
  Batch,
} = require("../models");

module.exports = {
  addFeedConsumption: async (req, res) => {
    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged
    try {
      const batch = await Batch.findOne({
        where: { batch_id: req.body.unit_id },
      });
      const feedConsumption = await batch.createFeedConsumptionLog(req.body);
      return res.send({
        error: null,
        message: "success",
        data: { feedConsumption },
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchFeedConsumptionLogs: async (req, res) => {
    //TODO remove comment after testing integration with frontend

    // send the start date from frontend with proper type
    // expects --> http://localhost:3001/fetch/feedConsumptionLog/date?start="04-05-2022"&end="06-05-2022"

    const { from, to } = req.query;

    try {
      const feedlogs = await FeedConsumptionLog.findAll({
        where: {
          date: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],
            // all pricelogs such that pricelogs.date >= start
          },
        },
      });

      return res
        .status(200)
        .send({ error: null, message: "success", data: { feedlogs } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
