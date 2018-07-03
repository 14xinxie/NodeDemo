/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:30:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-03 17:26:45
 */

'use strict';

const categoryService = require("../../../services/category");

module.exports = handleError({
  getCategorys,
  addCategory,
  delCategory,
  modCategory
});

async function getCategorys(req, res, next) {

  let schema = {
    page: { in: 'query', isInt: true, defaultValue: 1, optional: true },
    pagesize: { in: 'query', isInt: true, defaultValue: 10, optional: true }
  }

  await paramValidator(schema, req);

  let getOptions = {
    where: {},
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {

    let result = await categoryService.getCategorys(getOptions);
    return next({ code: 0, msg: '获取产品类型列表成功', ext: { categoryList: result, resultCode: 1 } });
  } catch (error) {
    
    console.log(error);
    return next({ code: 1, msg: '获取产品类型列表失败', ext: { resultCode: 0 } });
  }
}

async function addCategory(req, res, next) {

  let schema = {
    name: { in: 'body', notEmpty: true },
    sortId: { in: 'body', isInt: true, optional: true }
  };
  await paramValidator(schema, req);

  //获取session中的用户信息
  let user =  req.session.user;

  let addLog = {
    userId: user.id,
    content: user.nickName+'添加了产品类型'+req.body.name
  };

  let addOptions = {
    category: req.body,
    log: addLog
  };

  try {

    await categoryService.addCategory(addOptions);
    return next({ code: 0, msg: '添加产品成功', ext: { resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '添加产品失败', ext: { resultCode: 0 } });
  }

}

async function delCategory(req, res, next) {

  let schema = {
    id: { in: 'params', isInt: true, optional: true },
  };

  await paramValidator(schema, req);

  let getOptions = {
    where: { id: req.params.id }
  };
  
  //获取删除之前的产品类型信息
  let oldCategory = await categoryService.getCategoryDetail(getOptions);

  //获取session中的用户信息
  let user = req.session.user;

  let delLog = {
    userId: user.id,
    content: user.nickName+'删除了产品类型'+oldCategory.name
  };
  
  let delOptions = {
    where: { id: req.params.id },
    log: delLog
  };

  try {

    await categoryService.delCategory(delOptions);
    return next({ code: 0, msg: '删除产品成功', ext: { resultCode: 1 } });

  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '删除产品失败', ext: { resultCode: 0 } });
  }

}

async function modCategory(req, res, next) {

  let schema = {
    id: { in: 'params', isInt: true, optional: false },
    name: { in: 'body', notEmpty: false },
    sortId: { in: 'body', isInt: true, optional: true }
  };

  await paramValidator(schema, req);

  let getOptions = {
    where: { id: req.params.id }
  };

  //获取修改之前的产品类型的信息
  let oldCategory = await categoryService.getCategoryDetail(getOptions); 

  //获取session中的用户信息
  let user = req.session.user;

  //日志内容
  let logContent = ''; 
  
  if (req.body.name !== undefined && oldCategory.name !== req.body.name) {
    logContent += '修改产品类型名称'+oldCategory.name+'为'+req.body.name;
  }

  if (req.body.sortId !== undefined && oldCategory.sortId !== req.body.sortId) {
    logContent += '修改产品类型内部排序'+oldCategory.sortId+'为'+req.body.sortId;
  }

  let modLog = {
    userId: user.id,
    content: user.nickName+logContent+''
  };

  let modOptions = {
    where: { id: req.params.id },
    category: req.body,
    log: modLog
  };

  try {

    await categoryService.modCategory(modOptions);
    return next({ code: 0, msg: '修改产品信息成功', ext: { resultCode: 1 } });
    
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '修改产品信息失败', ext: { resultCode: 0 } });
  }

}