'use strict';

var _          = require('lodash');
var config     = require('../configs/default');
var Sequelize  = require('sequelize');
var mysql      = require('mysql2');
var path       = require('path');
var fs         = require('fs');

var db         = {};


const sequelize = new Sequelize(config.mysql.database,config.mysql.username,config.mysql.password,{
  host : config.mysql.host,
  port : config.mysql.port,
  dialect : 'mysql',
  dialectOptions: {
    charset: 'utf8'
 },
  operatorsAliases : false,
  pool : {
    max : config.mysql.maxConnections,
    min : config.mysql.minConnections
  }
});




fs.readdirSync(__dirname).filter(function(file){
  return (file.indexOf('.') !== -1)&&(file !== 'index.js');
}).forEach(function(file){
  //console.log("ruqwejkr=",path.join(__dirname,file));
  let model = sequelize.import(path.join(__dirname,file));
  //console.log(model.name);
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName){
  if('associate' in db[modelName]){
    db[modelName].associate(db);
  }
});



module.exports = _.extend({
  sequelize:sequelize,
  Sequelize:Sequelize
},db);