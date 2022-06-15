const {
  Request,
  User
} = require("../models");

module.exports = {
  addRequest: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { user_id: req.user.user_id },
      });
      const request = await user.createRequest({
        application_id: req.user.user_id,
        ...req.body,
      });
      return res.send({ error: null, message: "success", data: { request } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchRequestTransactions: async (req, res) => {
    const { id } = req.params; //!FIX: Error handling if id not present

    try {
      const transaction = await Request.findOne({
        where: { request_id: id },
        include: Transaction,
      }); //TODO: verify that this Request belong to req.user || ADMIN, if not send Authorization error
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

  fetchRequestByUser: async (req, res) => {
    try {
      const request = await User.findOne({
        where: { user_id: req.user.user_id }, //TODO: Testing
        include: Request,
      });
      return res
        .status(200)
        .send({ error: null, message: "success", data: { request } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
