/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 11:21:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 15:09:42
 */

'use strict';

const userCtrl = require('../../../controllers/api/v1/user');

module.exports = (router) => {
	router.post('/user/register', userCtrl.register);
	router.post('/user/login', userCtrl.login);
	router.get('/user/logout', userCtrl.logout);
	router.get('/user/currentuser', userCtrl.getCurrentUser);
};