const passport = require('passport');
const googleStrategy = require('./googleStrategyClass.js');
const localStrategy = require('./localStrategyClass.js');
const { sequelize, User } = require('../models');

passport.serializeUser( (user, done) => { 
    // console.log(`\n--------> Serialize User:`)
    // console.log(user);
    done(null, user);
} )


passport.deserializeUser((user, done) => {
        // console.log("\n--------- Deserialized User:")
        // console.log(user);
        done (null, user);

}) 

passport.use("google", googleStrategy)
passport.use("local", localStrategy)