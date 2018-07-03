/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:58:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-03 17:13:05
 */

'use strict';

module.exports = {
	getCategorys,
	addCategory,
	delCategory,
	modCategory,
  getCategorysByKeyWord,
  getCategoryDetail
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
  let log = options.log;

  return db.sequelize.transaction(function(t) {
    return db.Category.create(category,{transaction: t})
      .then(function(msg) {
      return db.Log.create(log, {transaction: t});
    });
  }).then(function(result) {
    console.log("产品类型添加成功" + result);
  }).catch(function(err) {
    console.log("产品类型添加失败" + err);
  });
}

async function delCategory(options) {

  let where = options.where;
  let log = options.log;
  return db.sequelize.transaction(function(t) {
    return db.Category.destroy({where: where, transaction: t})
    .then(function(msg) {
      return db.Log.create(log, {transaction: t});
    });
  }).then(function(result) {
    console.log('产品类型删除成功'+result);
  }).catch(function(err) {
    console.log('产品类型删除失败'+err);
  });
}

async function modCategory(options) {

	let where = options.where;
  let category = options.category;
  let log = options.log;

  return db.sequelize.transaction(function(t) {
    return db.Category.update(category, {where: where, transaction:t})
    .then(function(count) {

      console.log('产品类型修改结果：'+count);
      //如果更新操作影响的记录数不为0，则添加日志，否则不添加
      if (count != 0) {
        return db.Log.create(log, {transaction: t});
      } 
    });
  }).then(function(result) {
    console.log('产品类型修改成功'+result);
  }).catch(function(err) {
    console.log('产品类型修改失败'+err);
  })



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
  let where = options.where;
  return await db.Category.findOne({
    where: where
  });
}