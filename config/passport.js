const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const {User} = require('../models');


module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  async(request, accessToken, refreshToken, profile, done) =>{

    try{
      const [user, created] = await User.findOrCreate({
        where: { email: profile.email },
        defaults: {
          user_id: "3",
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          contact_no:"7033993399"
        }
      });

      // console.log(created);
      // console.log(user);
      done(null,user);
    }catch(e){
      console.log(e);
      done(e);
    }
    
  }
));

  passport.serializeUser((user,done)=>{
    done(null,user);
  })

  passport.deserializeUser((user,done)=>{
    done(null,user);
  })
}
