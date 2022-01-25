const session = require('express-session');
const redis = require('redis');


let redisClient = redis.createClient({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
    auth_pass: process.env.REDIS_PASS, 
    no_ready_check: true
});


redisClient.on("connect", function () {
    console.log("redis connected");
    console.log(`connected ${redisClient.connected}`);
});

redisClient.on("error", (err) => {
    console.log(err);
});

module.exports = redisClient;