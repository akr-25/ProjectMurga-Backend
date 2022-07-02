const { User } = require("../models");

module.exports = {
  addUser: async (req, res, next) => {
    const {first_name, last_name, contact_no, email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          first_name: first_name, 
          contact_no: contact_no 
        }
      })
      
      if(user != null){
        return res.status(200).send({ error: null, message: "success", data: { user } });
      }
      else{
        const user = await User.create({
          first_name: first_name, 
          last_name : last_name, 
          contact_no: contact_no, 
          email: email,
          password: password 
        });
      
        return res.status(200).send({ error: null, message: "success", data: { user } });
      }
    } catch (err) {
      next(err)
    }
  },
};
