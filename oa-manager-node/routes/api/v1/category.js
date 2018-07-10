/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:27:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 16:33:31
 */

'use strict';

const categoryCtrl = require('../../../controllers/api/v1/category');

module.exports = (router) => {
	router.get('/categorys', categoryCtrl.getCategorys);
	router.post('/category', categoryCtrl.addCategory);
	router.delete('/category/:id', categoryCtrl.delCategory);
	router.put('/category/:id', categoryCtrl.modCategory);
}