const {
  Request,
  User
} = require("../models");

const Sequelize = require('sequelize');
const { incrementUserID } = require("../utils/incrementUserID");
const Op = Sequelize.Op;

module.exports = {
  addRequest: async (req, res) => {
    const count = await Request.count(); 

    const new_id = incrementUserID(count);  //! function ka naam change kr dena
    try {
      const user = await User.findOne({
        where: { user_id: req.body.applicant_id },
      });
      const request = await user.createRequest({request_id: new_id, ...req.body});

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

  updateRequest: async (req, res) => {
    try {
      console.log(req.body); 
      
      const request = await Request.update({order_status: req.body.order_status}, {
        where: {request_id: req.body.request_id}
      }); 
      return res.send({ error: null, message: "success", data: { request } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },

  fetchAllRequest: async (req, res) => {
    //TODO remove comment after testing integration with frontend

    // send the start date from frontend with proper type

    const { from, to } = req.query;

    try {
      const requests = await Request.findAll({
        where: {
          updatedAt: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],
            // all pricelogs such that requests.date >= start
          },
        },
        include: User, 
      });
      // console.log(requests); 

      return res
        .status(200)
        .send({ error: null, message: "success", data: { requests } });
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
        where: { user_id: req.user_id }, //TODO: Testing
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
