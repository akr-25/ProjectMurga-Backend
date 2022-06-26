const passport = require("passport");

module.exports = {
  status: (req, res) => {
    console.log(req.user);
    if (!req.user) {
      res.send({ auth: false });
    } else {
      res.send({ auth: true, user: req.user }); //TODO: Don't give every info of user.
    }
  },

  logout: (req, res) => {
    //!FIX: Should be a post request, not working with post
    //! shut up aman
    
    try{
      req.logOut();
      req.session.destroy();

      res.send({ error: null, message: "success", data: null }); //! temporarily
    }
    catch(err){
      console.log(err); 
      res.status(500)
    }
  },

  login: (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
      req.login(user, (err) => {
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  },

  googleCallback: passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth/login",
  }),

  googleLogin: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
};
