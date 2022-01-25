require('dotenv').config();

const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const { sequelize, User } = require('./models');
const passport = require('passport')
const passportConfig = require('./passportConfig/passport.js');
let RedisStore = require('connect-redis')(session);
const redisClient = require('./redisConfig/redisConfig.js')
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

//Middleware
app.use(session({
    secret: "secret",
    store: new RedisStore({ client: redisClient}),
    resave: false ,
    saveUninitialized: true ,
}))

// init passport on every route call
app.use(passport.initialize()) 
//allow passport to use "express-session"
app.use(passport.session())


app.listen(3001, () => console.log(`Server started on port 3001...`))




//require Routes
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

app.use("/auth", auth);
app.use("/dashboard", dashboard);

