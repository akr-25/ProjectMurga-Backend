const { User } = require("../models");
const { incrementUserID } = require("../utils/incrementUserID");

module.exports = {
  addUser: async (req, res) => {
    // {first_name, last_name, contact_no, email, password } = req.body;
    try {
      const count = await User.count(); 

      const new_id = incrementUserID(count); 

      const user = await User.create({user_id: new_id, ...req.body}); //! what if user already exists? 
      //! generate user_id in a series
      return res.status(200).send({ error: null, message: "success", data: { user } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
