/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:08:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 16:25:42
 */

'use strict';

const logCtrl = require('../../../controllers/api/v1/log');

module.exports = (router) => {
	router.get('/logs', logCtrl.getLogs);
	router.post('/log', logCtrl.addLog);
	router.delete('/log/:id', logCtrl.delLog);
	router.put('/log/:id', logCtrl.modLog);
}