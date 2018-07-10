/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:08:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-05 19:02:47
 */

'use strict';

const productCtrl = require('../../../controllers/api/v1/product');

module.exports = (router) => {
	router.get('/products', productCtrl.getProducts);
	router.get('/products/:categoryId', productCtrl.getProductsByCategory);
  router.get('/products/like/:keyWord', productCtrl.getProductsByKeyWord);
  
	router.post('/product', productCtrl.addProduct);
	router.delete('/product/:id', productCtrl.delProduct);
	router.put('/product/:id', productCtrl.modProduct);
}