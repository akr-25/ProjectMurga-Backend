const { Request } = require("../models");

module.exports = {
  addTransaction: async (req, res) => {
    try {

      // TODO: 
      //! check if user exists in the database, there can be a case that the user is deleted/blocked (if we make this feature some day) by the admin but the cookie is still there i.e not expired ... add this check everywhere we are doing something important like transaction - actually discuss tomorrow , kuch mat kar abhi eshu

      const request = await Request.findOne({ where: req.body.order_id });
      const transaction = await request.createTransaction(req.body); //TODO: destructure req.body and then pass it , improves code readability
      return res.send({
        error: null,
        message: "success",
        data: { transaction },
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
