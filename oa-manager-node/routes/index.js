/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 10:52:34 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 17:59:17
 */
'use strict';

const express = require('express');
const path    = require('path');
const fs      = require('fs');

/**
 * 
 * 
 * @param {any} versionDir 
 * @returns 
 */
function createRouter(versionDir) {
  let router = express.Router();
  fs.readdirSync(versionDir).forEach(function (file) {
    require(path.join(versionDir,file))(router);
  });
  return router;
}

const router = module.exports = express.Router();

const v1  = createRouter(path.join(__dirname,'api/v1'));

const web = createRouter(path.join(__dirname,'web'));

router.use('/',web);
router.use('/api/v1',v1);