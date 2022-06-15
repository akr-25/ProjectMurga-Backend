const { User } = require("../models");
module.exports = {
  addUser: async (req, res) => {
    // { user_id, first_name, last_name, contact_no, email, password } = req.body;
    try {
      const user = await User.create(req.body);
      return res.send({ error: null, message: "success", data: { user } });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ error: err, message: "failure", data: null });
    }
  },
};
