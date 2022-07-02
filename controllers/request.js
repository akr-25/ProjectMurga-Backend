const {
  Request,
  User,
  Batch
} = require("../models");

const Sequelize = require('sequelize');
const Api404Error = require("../errors/api404Error");
const Op = Sequelize.Op;

module.exports = {
  addRequest: async (req, res) => {
    try {
      const { applicant_id, unit_id, order_status, type_of_unit, req_no_of_units_type1, req_no_of_units_type2, selling_price_per_unit, order_type } = req.body; 
      

      const request = await Request.create({
        applicant_id: applicant_id,
        unit_id: unit_id, 
        order_status: order_status, 
        type_of_unit: type_of_unit,
        req_no_of_units_type1:  req_no_of_units_type1,
        req_no_of_units_type2: req_no_of_units_type2, 
        selling_price_per_unit: selling_price_per_unit, 
        order_type: order_type
      });
      
      return res
      .status(201)
      .send({ error: null, message: "success", data: { request } });
    } catch (err) {
        next(err)
      }
  },

  updateRequest: async (req, res) => {
    try {
      console.log(req.body); 
      
      const { order_status, request_id } = req.body; 

      const request = await Request.update({order_status: order_status}, {
        where: {request_id: request_id} 
      }); 
      return res.send({ error: null, message: "success", data: { request } });
    } catch (err) {
      next(err)
    }
  },

  fetchAllRequest: async (req, res) => {
    const { from, to } = req.query;

    try {
      const requests = await Request.findAll({
        where: {
          updatedAt: {
            [Op.and]: [
              { [Op.gte]: Date.parse(from) },
              { [Op.lte]: Date.parse(to) },
            ],
          },
        },
        include: User, 
      });

      if(requests == null){
        throw new Api404Error("no requests found.")
      }
      return res
        .status(200)
        .send({ error: null, message: "success", data: { requests } });
    } catch (err) {
      next(err)
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
      next(err)
    }
  },
};
