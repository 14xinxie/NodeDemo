/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:34:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-05 10:07:32
 */

'use strict';

module.exports = {
  getProducts,
  addProduct,
  delProduct,
  modProduct,
  getProductsByKeyWord,
  getProductDetail
};

async function getProducts(options) {

  let page = options.page;
  let pagesize = options.pagesize;
  let where = options.where;

  //判断page和pagesize是否未定义，如果是，则查询所有，不进行分页查询
  if (page === undefined || pagesize === undefined) {
    return await db.Product.findAndCount({
      include: [{
        model: db.Category,
        as: 'Category'
      }],
      where: where
    });
  } else {
    return await db.Product.findAndCount({
      include: [{
        model: db.Category,
        as: 'Category'
      }],
      where: where,
      offset: (page - 1) * pagesize,
      limit: pagesize
    });
  }
  
};

async function addProduct(options) {

  let product = options.product;
  let log = options.log;
  return db.sequelize.transaction(function(t) {
    // 在这里链接您的所有查询。 确保你返回他们。
    return db.Product.create(product, {transaction: t }).then(function(user) {
      return db.Log.create(log, {transaction: t });
    });

  }).then(function(result) {
    console.log("产品添加成功" + result);
    // 事务已被提交
    // result 是 promise 链返回到事务回调的结果
  }).catch(function(err) {
    // 事务已被回滚
    // err 是拒绝 promise 链返回到事务回调的错误
    console.log("产品添加失败" + err);
  });
}

async function delProduct(options) {

  let where = options.where;
  let log = options.log;
  return db.sequelize.transaction(function(t) {
    return db.Product.destroy(
      {where: where, transaction: t}).then(function(cnt) {
      return db.Log.create(log, {transaction: t});
    });
  }).then(function(result) {
      console.log("产品删除成功" + result);
  }).catch(function(err) {
      console.log("产品删除失败" + err);
  });
}

async function modProduct(options) {

  let where = options.where;
  let product = options.product;
  let log = options.log;
  
  return db.sequelize.transaction(function(t) {
    return db.Product.update(product,{where: where, transaction:t})
    .then(function(count) {

      //如果更新操作影响的记录数不为0，则添加相应日志，否则不添加
      if (count != 0) {
        return db.Log.create(log, {transaction: t});
      }
    });
  }).then(function(result) {
      console.log("事务已成功提交" + result);
  }).catch(function(err) {
      console.log("事务回滚" + err);
  });
  
  
}

async function getProductDetail(options) {
  let where = options.where;
  return await db.Product.findOne({
    include: [{
      model: db.Category,
      as: 'Category'
    }],
    where: where
  });
}

async function getProductsByKeyWord(options) {

  let keyWord = options.keyWord;
  let page = options.page;
  let pagesize = options.pagesize;
  return await db.Product.findAndCount({
    include: [{
      model: db.Category,
      as: 'Category',
      where: {
        $or: [{
          name: {
            $like: '%' + keyWord + '%'
          }
        }, ]
      }
    }],
    where: {
      $or: [{
          name: {
            $like: '%' + keyWord + '%'
          }
        },
        {
          desc: {
            $like: '%' + keyWord + '%'
          }
        },
        {
          url: {
            $like: '%' + keyWord + '%'
          }
        },
        {
          tip: {
            $like: '%' + keyWord + '%'
          }
        },
        {
          netSegment: {
            $like: '%' + keyWord + '%'
          }
        }
      ]
    },
    offset: (page - 1) * pagesize,
    limit: pagesize
  });
}

