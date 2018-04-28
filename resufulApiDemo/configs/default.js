'use strict';

module.exports={
	mysql:	{
		host									:	'mysql',
		username							:	'root',
		password							:	'root',
		port									:	3306,
		database							:	'restfulApiDemo',
		connectTimeout				: 5000,
		waitForConnections		:	true,
		maxConnections				:	200,
		minConnections				:	2,
		logging								:	true
	},
	redis:	{
	  host			:	'redis',
	  port			:	6379,
	  db				:	0,
	  sessionDB	:	2,
	  password	:	'redis'
	}
};