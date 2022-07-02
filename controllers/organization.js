// controllers
const { Organization } = require("../models");

module.exports = {
  addOrganization: async (req, res, next) => {
    const {company_name, address, contact_no} = req.body;
    try {

      const organization = await Organization.create({
        company_name : company_name,
        address : address,
        contact_no : contact_no,
      });

      return res.status(200).send({ error: null, message: "success", data: { organization } });

    } catch (err) {
      next(err)
    }
  },

  fetchOrganization: async (req, res, next) =>{
    try{
      const organization = await Organization.findOne({
        raw: true,
        where:{ },
        order:[[ 'createdAt', 'DESC']]
      });

      return res
            .status(200)
            .send({error:null, message:"success", data: organization})
    } catch (err) {
      next(err)
    }
  },
};
