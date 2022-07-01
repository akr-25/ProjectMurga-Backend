require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");
const passport = require("passport");

// importing this for its side effects only, which is to configure passport
require("./passportConfig/passport.js");

const { redisSession } = require("./database/redisConfig");
const handleError = require("./middleware/handleError");

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


//* Error Handler
app.use((err, req, res, next) => {
  const new_err = {} 


  if(err.name === "SequelizeForeignKeyConstraintError"){
      new_err["message"] = `cannot find the specified ${err.fields[0]}`
  }
  else if(err.name === "SequelizeValidationError"){
      new_err["type"] = `${err.errors[0].type} on ${err.errors[0].path}`
      new_err["message"] = err.errors[0].message
  }
  else new_err = err
  // console.log(err) 
  //! auth controller errors are not handled yet
  //! don't know if there are other possible sequelize errors? 

  res.status(500).send({ error: new_err, message: "failure", data: null });
});

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
