/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 11:05:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:31:32
 */

'use strict';

require('./global_regist');
const web = require('./servers/web');


Promise.resolve([web]).each(function (app) {
  app.start();

});