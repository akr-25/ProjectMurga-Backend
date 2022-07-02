require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");
const passport = require("passport");
const {errorHandler} = require('./errors/errorHandler');

// importing this for its side effects only, which is to configure passport
require("./passportConfig/passport.js");

const { redisSession } = require("./database/redisConfig");

const app = express();
app.set("view engine", "ejs");

//Middleware
app.use(redisSession);
// init passport on every route call
app.use(passport.initialize());
//allow passport to use "express-session"
app.use(passport.session());

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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



// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/balanceLog", require("./routes/balanceLog"));
app.use("/api/feedConsumptionLog", require("./routes/feedConsumptionLog"));
app.use("/api/priceLog", require("./routes/priceLog"));
app.use("/api/batch", require("./routes/batch"));
app.use("/api/user", require("./routes/user"));
app.use("/api/request", require("./routes/request"));

app.use("/dashboard", require("./routes/dashboard"));
app.use("/", require("./routes/index"));
// app.use('*', error404 page);

//* Error Handler
app.use(errorHandler);

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
