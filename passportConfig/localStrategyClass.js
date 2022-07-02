const LocalStrategy = require("passport-local").Strategy;
const { sequelize, User } = require("../models");

const localStrategy = new LocalStrategy(async (username, password, done) => {
  console.log("Inside local strategy callback");
  // here is where you make a call to the database
  // to find the user based on their username or email address
  // for now, we'll just pretend we found that it was users[0]
  //const Users = db.users;
  const user = await User.findOne({
    where: { email: username },
  });

  if (user === null) {
    return done(null, false);
  } else {
    if (user.password === password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
});
module.exports = localStrategy;
