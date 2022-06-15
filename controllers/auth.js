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
    try{
      req.logOut();
      req.session.destroy();
      // res.redirect(301, "/");
      // res.end();
      // return res.redirect(301, "/dashboard"); 
      // res.writeHead(302, {
      //     Location: 'http://localhost:3000/'
      // });
      res.send({ error: null, message: "success", data: null });
      // res.redirect(301, "http:localhost:3000/auth/login"); //! temporarily
    }
    catch(err){
      console.log(err); 
      res.status(500)
    }
  },

  login: (req, res, next) => {
    // console.log('Inside POST /login callback')
    passport.authenticate("local", (err, user, info) => {
      // console.log('Inside passport.authenticate() callback');
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      // console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        // console.log('Inside req.login() callback')
        // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        // console.log(`req.user: ${JSON.stringify(req.user)}`)
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
