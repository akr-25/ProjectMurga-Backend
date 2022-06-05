const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

let redisClient, redisSession;
try {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASS,
    no_ready_check: true,
  });

  redisClient.on("connect", function () {
    console.log("redis connected");
    console.log(`connected ${redisClient.connected}`);
  });

  redisClient.on("error", (err) => {
    console.log("Could not establish a connection with redis - " + err);
  });

  redisSession = session({
    secret: "secret",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 1000 * 60 * 60 * 24, // session max age in milliseconds, currently 24 hours
    },
  });
} catch (err) {
  console.log(err);
}

module.exports = {
  redisClient,
  RedisStore,
  session,
  redisSession,
};
