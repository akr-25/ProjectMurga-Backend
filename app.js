require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");
const passport = require('passport')

// importing this for its side effects only, which is to configure passport
require("./passportConfig/passport.js");

const {redisSession} = require('./database/redisConfig');

const app = express();
app.set('view engine', 'ejs');

//Middleware
app.use(redisSession);
<<<<<<< HEAD
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
=======
>>>>>>> c87249011b5caa616b5278245a9a92974d1eced8
// init passport on every route call
app.use(passport.initialize()) 
//allow passport to use "express-session"
app.use(passport.session())

app.use(morgan("dev"));
<<<<<<< HEAD

=======
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
>>>>>>> c87249011b5caa616b5278245a9a92974d1eced8
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< HEAD
// Routes
app.use("/auth", require('./routes/auth'));
app.use("/dashboard", require('./routes/dashboard'));
app.use("/", require('./routes/index'));
app.use("/add", require('./routes/add'));
app.use("/pre", require('./routes/get_req'));


=======

// Routes
app.use("/auth", require('./routes/auth'));
app.use("/dashboard", require('./routes/dashboard'));
>>>>>>> c87249011b5caa616b5278245a9a92974d1eced8


const server = app.listen(process.env.PORT || 3001, async () => {
  console.log(`Server is running on http://localhost:${server.address().port}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
});
