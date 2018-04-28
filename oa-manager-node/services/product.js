/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:34:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:52:49
 */

'use strict';

module.exports = {
    getProducts,
    addProduct,
    delProduct,
    getProductDetail
};

async function getProducts(options) {
	let page = options.page;
	let pagesize = options.pagesize;
	return await db.Product.findAndCount({
		include : [
				{
					model : db.ProductCategory,
					as : 'Category'
				}
		],
		offset : (page-1) * pagesize,
		limit : pagesize
	});
};


async function addProduct(options) {
	
}

async function delProduct(options) {

}

async function getProductDetail(options) {
	
}