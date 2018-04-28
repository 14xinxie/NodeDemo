'use strict';

const usersServices = require('../services/users');
const redis = require('../redis/index').redis;


module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers
};


async function getUsers(req, res, next) {
	let values;
	redis.get('users').then(async (reply)=>{
		//console.log('reply:',reply);
		if(reply == null || reply == '' || reply == undefined)
		{
			values = await usersServices.getUsers();
		//	console.log('2222222222222222222222',values);
			redis.set('users',JSON.stringify(values));
			res.send({ 'result': values });
		}
		else{
			values = reply;	
		//	console.log('2222222222222222222222',values);
			res.send({ 'result': JSON.parse(values) });
		}
	}).catch((err)=>{
		console.log(err);
	})
}

async function postUsers(req, res, next) {
	let values = await usersServices.postUsers(req.body);
//	console.log('ssssssssssssss',values);
	if(values[0] == 1)
	{
		redis.del('users');
	}
	res.send({ 'result': values });
}


async function putUsers(req, res, next) {
	let values = await usersServices.putUsers(req.body);
//	console.log(values.dataValues);
	if(values.dataValues)
	{
		redis.get('users').then((reply)=>{
			let users = JSON.parse(reply);
			users.push(values.dataValues);
			redis.set('users',JSON.stringify(users));
		}).catch((err)=>{
			console.log(err);
		});
	}
	res.send({ 'result': values });
}


async function deleteUsers(req, res, next) {
	let values = await usersServices.deleteUsers(req.params);
	//console.log(values);
	if(values[0] == 1)
	{
		redis.get('users').then((reply)=>{
			let users = JSON.parse(reply);
			let value = users.find((value)=>{
				if(req.params.id == value.id)
					{
						return value;
					}
			});
			let index = users.indexOf(value);
			users.splice(index,1);
			redis.set('users',JSON.stringify(users));
		}).catch((err)=>{
			console.log(err);
		});
	}
	res.send({ 'result': values });
} 