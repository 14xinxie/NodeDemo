/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:04:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:45:57
 */

const productService = require('../../../services/product');

module.exports = {
		getProducts,
		addProduct,
		delProduct,
		getProductDetail
};

async function getProducts(req, res, next) {
	 let schema = {
   page : {in : 'query', isInt : true, defaultValue : 1, optional : true},
   pagesize : {in : 'query', isInt : true, defaultValue : 10, optional : true} 
  }   

  await paramValidator(schema, req);

  let productList = await productService.getProducts(req.query);

  res.json(productList.rows);
		
}

async function addProduct(req, res, next) {

}

async function delProduct(req, res, next) {

}

async function getProductDetail(req, res, next) {
  
}
 
