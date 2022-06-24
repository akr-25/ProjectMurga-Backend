const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { sequelize, User } = require("../models");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true,
  },
  async function (request, accessToken, refreshToken, profile, done) {
    //console.log(`------------>   profile : ${JSON.stringify(profile)}`);
    //console.log(`------------>   buyer_id: ${JSON.stringify(profile.id)}`);
    //console.log(`------------>   first_name: ${JSON.stringify(profile.given_name)}`);
    //console.log(`------------>   last_name: ${JSON.stringify(profile.family_name)}`);
    //console.log(`------------>   email: ${JSON.stringify(profile.email)}`);

    const [user, created] = await User.findOrCreate({
      where: { email: profile.email },
      defaults: {
        user_id: profile.id,
        first_name: profile.given_name,
        last_name: profile.family_name,
        email: profile.email,
        contact_no: "9756534423",
        password: "aaake224433",
      },
    });

    console.log(`created? ${created}`);
    return done(null, user);
  }
);
module.exports = googleStrategy;
