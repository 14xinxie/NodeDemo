'use strict';

const path = require('path');

module.exports = {
    redis :{
        host : 'duoyiredis',
        port : 6379,
        db : 8,
        sessionDB : 2,
        password : ''
    },
    mysql : {
        host                : '10.32.8.129',
        username            : 'root',
        password            : '123456',
        port                : 5000,
        database            : 'restfulDemo',
        connectTimeout      : 5000,
        waitForConnections  : true,
        maxConnections      : 200,
        minConnections      : 2,
        logging             : true
    },
    web :　{
        url : 'http://127.0.0.1:3000',
        port : 3000,
        name : 'restfulDemo'
    }
}