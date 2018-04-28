'use strict';

require('./global_regist');

const web = require('./servers/web');

Promise.resolve([web]).each(function(app){
  app.start();
  console.log('启动完成');
});