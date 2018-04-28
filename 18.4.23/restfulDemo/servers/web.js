'use strict';
const express = require('express');

const mysql = require('mysql');

const router = require('../routes');

const bodyParser = require('body-parser');

const app = express();




app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : false}));


app.use(router);


function start() {
    app.listen(config.web.port,function(){
        console.log('项目启动中......');
    });


    return db.sequelize.sync({force : false}).catch(function(err){
        console.log('数据库表创建过程失败！'+err);
        process.exit(1);
    });
  }

  if(!module.parent){
      start();
  }else{
      exports.start=start;
  }