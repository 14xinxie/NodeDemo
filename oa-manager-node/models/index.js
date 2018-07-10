/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 10:33:40 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 15:28:49
 */
'use strict';

const Sequelize = require('sequelize');
const mysql     = require('mysql');
const path      = require('path');
const fs        = require('fs');
const db        ={};

const sequelize =  new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
	host : config.mysql.host,
	port : config.mysql.port,
	dialect : 'mysql',
	operatorsAliases : false,
	define : {
		freezeTableName : true,
		timestamps : false
	},
	pool : {
		max : config.mysql.maxConnections,
		min : config.mysql.minConnections
	},
	logging : function (output) {
		if (config.mysql.logging){
			logger.info(output);
		}
	}
});

fs.readdirSync(__dirname)
	.filter(function (file){
		return (file.indexOf('.') !==-1) && (file !== 'index.js');
	})
	.forEach(function (file) {
		let model      = sequelize.import(path.join(__dirname,file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});


module.exports = _.extend({
	sequelize : sequelize,
	Sequelize : Sequelize
},db);