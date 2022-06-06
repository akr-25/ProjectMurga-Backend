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
app.use("/api/transaction", require("./routes/transaction"));
app.use("/api/batch", require("./routes/batch"));
app.use("/api/user", require("./routes/user"));
app.use("/api/request", require("./routes/request"));

app.use("/dashboard", require("./routes/dashboard"));
app.use("/", require("./routes/index"));

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
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
