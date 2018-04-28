'use strict';

//定义全局变量
global.ROOT_PATH = __dirname;

global._ = require('lodash');

let config = require('config');

const outConfig = config.outConfig ? require(config.outConfig) : {};

global.config = _.assign(config,outConfig);

global.Promise = require('bluebird');

global.fse = require('fs-extra');

global.db =  require('./models');

global.Redis = require('ioredis');
