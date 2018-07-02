/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:58:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:04:30
 */

'use strict';

module.exports = {
	getCategorys,
	addCategory,
	delCategory,
	modCategory,
	getCategorysByKeyWord
};


async function getCategorys(options) {

	let where = options.where;
  let page = options.page;
	let pagesize = options.pagesize;
	return await db.Category.findAndCount({
		where : where,
		offset : (page-1) * pagesize,
		limit : pagesize
	});
}

async function addCategory(options) {

	let category = options.category;
  return await db.Category.create(category);
}

async function delCategory(options) {

  let where = options.where;
	return await db.Category.destroy({
		where : where
	});
}

async function modCategory(options) {

	let where = options.where;
	let category = options.category;
	return await db.Category.update(category,{
		where : where
	});
}


async function getCategorysByKeyWord(options) {

	let keyWord = options.keyWord;
	return db.Category.findAndCount({
		where : {
			name: {
				$like: '%'+keyWord+'%'
			}
		}
	});

}


async function getCategoryDetail(options) {
    
}