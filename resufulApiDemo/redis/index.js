'use strict';
const Redis = require('ioredis');
const config = require('../configs/default');

const redis = new Redis({
    host:config.redis.host,
    port:config.redis.port,
    password:config.redis.password
});

redis.select(config.redis.db);

redis.on("error",function(err){
    console.log(err);
});

redis.on("end",function(err){
    console.log("redis is Disconnect ");
});

redis.on('connect',function(){
    console.log("redis connect");
});
module.exports = {
    redis
}
