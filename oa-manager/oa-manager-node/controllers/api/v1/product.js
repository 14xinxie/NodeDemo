/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:04:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-03 20:43:32
 */

const productService = require('../../../services/product');

const categoryService = require('../../../services/category');

module.exports = handleError({
  getProducts,
  addProduct,
  delProduct,
  modProduct,
  getProductsByCategory,
  getProductsByKeyWord
});

async function getProducts(req, res, next) {

  let schema = {
    page: { in: 'query', isInt: true, defaultValue: 1, optional: true },
    pagesize: { in: 'query', isInt: true, defaultValue: 10, optional: true }
  };
  await paramValidator(schema, req);

  let getOptions = {
    where: {},
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {
    
    let result = await productService.getProducts(getOptions);
    return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
  }

}

async function addProduct(req, res, next) {

  let schema = {
    name: { in: 'body', notEmpty: true },
    desc: { in: 'body', notEmpty: true },
    url: { in: 'body', notEmpty: true },
    categoryId: { in: 'body', isInt: true, optional: true },
    tip: { in: 'body', notEmpty: true },
    netSegment: { in: 'body', notEmpty: true },
    sortId: { in: 'body', isInt: true, optional: true }
  };

  console.log('提交的数据：'+JSON.stringify(req.body));

  await paramValidator(schema, req);

  console.log('接收到的文件：'+req.files.name);

  let user = req.session.user;

  console.log("管理员用户信息：" + JSON.stringify(user));
  let addLog = {
    userId: user.id,
    content: user.nickName + '添加了产品' + req.body.name
  };
  
  let addOptions = {
    product: req.body,
    log: addLog
  };
  try {
    
    await productService.addProduct(addOptions);
    return next({ code: 0, msg: '添加产品成功', ext: { resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '添加产品失败', ext: { resultCode: 0 } });
  }

}

async function delProduct(req, res, next) {

  let schema = {
    id: { in: 'params', isInt: true, optional: true },
  };
  await paramValidator(schema, req);

  let getOptions = {
    where: { id: req.params.id }
  };

  //获取删除之前的产品信息
  let oldProduct = await productService.getProductDetail(getOptions);

  console.log('需要删除的产品：'+JSON.stringify(oldProduct));

  //获取session中的用户信息
  let user = req.session.user;
  
  let delLog = {
    userId: user.id,
    content: user.nickName+'删除了产品'+oldProduct.name
  };

  let delOptions = {
    where: { id: req.params.id },
    log: delLog
  };

  try {

    await productService.delProduct(delOptions);
    return next({ code: 0, msg: '删除产品成功', ext: { resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '删除产品失败', ext: { resultCode: 0 } });
  }

}

async function modProduct(req, res, next) {

  let schema = {
    id: { in: 'params', isInt: true, optional: false },
    name: { in: 'body', notEmpty: false },
    desc: { in: 'body', notEmpty: false },
    url: { in: 'body', notEmpty: false },
    categoryId: { in: 'body', isInt: true, optional: true },
    tip: { in: 'body', notEmpty: false },
    netSegment: { in: 'body', notEmpty: false },
    sortId: { in: 'body', isInt: true, optional: true }
  };

  await paramValidator(schema, req);

  let getProOptions = {
    where: { id: req.params.id }
  };

  //获取修改前的产品信息
  let oldProduct = await productService.getProductDetail(getProOptions);

  console.log('修改前的产品信息：'+JSON.stringify(oldProduct));

  let getCateOptions = {
    where: { id: req.body.categoryId }
  };
  
  //获取修改后的产品类型名称
  let newCategory = await categoryService.getCategoryDetail(getCateOptions);

  //获取session中的用户信息
  let user = req.session.user;

  let logContent = '';

  //判断产品各个字段的信息是否被修改，并增加相应的日志信息
  if (req.body.name !== undefined &&oldProduct.name !== req.body.name) {
    logContent += '修改产品名称'+oldProduct.name+'为'+req.body.name;
  } 
  if (req.body.desc !== undefined && oldProduct.desc !== req.body.desc) {
    logContent += '修改产品描述'+oldProduct.desc+'为'+req.body.desc;
  } 
  if (req.body.url !== undefined && oldProduct.url !== req.body.url) {
    logContent += '修改产品网址'+oldProduct.url+'为'+req.body.url;
  } 
  if (newCategory.name !== undefined && oldProduct.Category.name !== newCategory.name) {
    logContent += '修改产品类型名称'+oldProduct.Category.name+'为'+newCategory.name;
  }
  if (req.body.tip !== undefined && oldProduct.tip !== req.body.tip) {
    logContent += '修改产品注意事项'+oldProduct.tip+'为'+req.body.tip;
  } 
  if (req.body.netSegment !== undefined && oldProduct.netSegment !== req.body.netSegment) {
    logContent += '修改产品所属网段'+oldProduct.netSegment+'为'+req.body.netSegment;
  } 
  if (req.body.sortId !== undefined && oldProduct.sortId !== req.body.sortId) {
    logContent += '修改产品内部排序'+oldProduct.sortId+'为'+req.body.sortId;
  }
  
  let modLog = {
    userId: user.id,
    content: user.nickName+logContent+''
  };
  
  let modOptions = {
    where: { id: req.params.id },
    product: req.body,
    log: modLog
  };

  try {

    await productService.modProduct(modOptions);
    return next({ code: 0, msg: '修改产品信息成功', ext: { resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '修改产品信息失败', ext: { resultCode: 0 } });
  }

}

async function getProductsByKeyWord(req, res, next) {

  let schema = {
    keyWord: { in: 'params', notEmpty: true },
    page: { in: 'query', isInt: true, optional: true },
    pagesize: { in: 'query', isInt: true, optional: true }
  };

  await paramValidator(schema, req);

  let getOptions = {
    keyWord: req.params.keyWord,
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {

    let result = productService.getProductsByKeyWord(getOptions);
    return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
  }
}

async function getProductsByCategory(req, res, next) {

  let schema = {
    categoryId: { in: 'params', isInt: true, optional: false },
    page: { in: 'query', isInt: true, defaultValue: 1, optional: true },
    pagesize: { in: 'query', isInt: true, defaultValue: 10, optional: true }
  };

  await paramValidator(schema, req);

  let getOptions = {
    where: { categoryId: req.params.categoryId },
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {

    let result = await productService.getProducts(getOptions);
    return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
  }
}


