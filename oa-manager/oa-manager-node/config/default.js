/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 11:28:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:05:51
 */

'use strict';

const path = require('path');

module.exports = {
  redis    : {
    host : '10.17.64.84',
    port : 6379,
    db   : 8,
    sessionDB  : 2,
    password   : ''
  },
  mysql    : {
    host               : 'localhost',
    username           : 'root',
    password           : '1234',
    port               : '3306',
    database           : 'oa_manager',
    connectTimeout     : 5000,
    waitForConnections : true,
    maxConnections     : 200,
    minConnections     : 2,
    logging            : true
  },
  web : {
    url  : 'http://127.0.0.1:5001',
    port : 5001,
    name : 'oa-manager-node'
  },
  view : {
    cache  : {},
    engine : 'ejs',
    dir    : 'views'     
  },
  log : {
    dir            : `/var/webos/logs/oa-manager-node/`,
    nolog          : /\.(js|css|png|jpg|jpeg|ico|svg|gif)/,
    format         : ":remote-addr :method :url :status :response-time ms :user-agent :content-length",
    replaceConsole : true,
    level          : 'AUTO',
    console        : false
  },
  static : {
    dir    : path.join(__dirname,'../public'),
    maxAge : 3600000
  }
}