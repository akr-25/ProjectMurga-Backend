const passport = require('passport');
const googleStrategy = require('./googleStrategyClass.js');
const { sequelize, User } = require('../models');

passport.serializeUser( (user, done) => { 
    console.log(`\n--------> Serialize User:`)
    console.log(user.user_id);
    done(null, user.user_id);
} )


passport.deserializeUser((user_id, done) => {
        console.log("\n--------- Deserialized User:")

        const user = User.findOne({
            where: {user_id: user_id}
        }).then(user => {
            console.log(user);
            done (null, user);
        });
}) 

passport.use("google", googleStrategy)
