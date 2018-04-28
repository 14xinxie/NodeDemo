'use strict';

require('express');

module.exports = (router) =>{

  router.get('/',function(res,req,next){
    res.send('欢迎访问api');
  });

}