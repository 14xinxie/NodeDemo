/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 14:28:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:33:23
 */

'use strict';

const webSdk = require('./websdk');

global.ROOT_PATH = __dirname;
global._ = require('lodash');
let config = require('config');
const outConfig = config.outConfig ? require(config.outConfig) : {};


global.config = _.assign(config, outConfig);

global.Promise = require('bluebird');
global.fse = require('fs-extra');
global.logger = require('./tools/logger');
global.db = require('./models');
global.moment = require('moment');

//global.cache          = require('./lib/cache');
global.handleError = require('./middlewares/error-handle');
global.paramValidator = require('./middlewares/param-validator');
global.webSdk = webSdk;