const {sequelize, User} = require('./models');
const dotenv = require('dotenv');
const passport = require('passport');
const ejs = require('ejs');
const express=require('express');
const app=express();
const session= require('express-session');
const path = require('path');


//Load config
dotenv.config({path:'./config/config.env'});

// Passport
require('./config/passport')(passport);

// Views
app.set('view engine', 'ejs');
app.set('views', './views');


// Sessions
app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Static folder
app.use(express.static(path.join(__dirname,'public')));


//--------------------------------------------------
// const User = require('../models/User');

// Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));


//--------------------------------------------------
const PORT = process.env.PORT||3000;

app.listen(
  PORT,
  console.log(`Server running in mode on port ${PORT}`)
);

;(async function(){
    await sequelize.sync();
    // const cust = await User.create({user_id:"jdask"});
    // await cust.createRequest({request_id:"sadsad"})
})().catch(e => {console.log(e)})