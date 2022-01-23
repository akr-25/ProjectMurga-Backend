const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {sequelize, User} = require('./models');
const dotenv = require('dotenv');
const passport = require('passport');
const ejs = require('ejs');
const session= require('express-session');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));



const server = app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is running on http://localhost:${server.address().port}`);
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected");
    }
    catch (err) {
        console.log(err);
    }
})
