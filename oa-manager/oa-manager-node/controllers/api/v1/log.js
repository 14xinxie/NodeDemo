/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:04:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:45:57
 */

const logService = require('../../../services/log');

module.exports = handleError({
  getLogs,
  addLog,
  delLog,
  modLog
});

async function getLogs(req, res, next) {

	let schema = {
    page : {in : 'query', isInt : true, defaultValue : 1, optional : true},
    pagesize : {in : 'query', isInt : true, defaultValue : 10, optional : true} 
  };   

  await paramValidator(schema, req);

  let options = {
    where : {},
    page : req.query.page,
    pagesize : req.query.pagesize
  };

  try {

    let result = await logService.getLogs(options);
    return next({code : 0, msg : '获取日志信息列表成功', ext : {logList : result, resultCode : 1}});
  } catch(error) {

    console.log(error);
    return next({code : 1, msg : '获取日志信息列表失败', ext : {resultCode : 0}});
  }
		
}

async function addLog(req, res, next) {

  let schema = {
    userId : {in: 'body', isInt: true, optional: true},
    createTime : {in: 'body', notEmpty: true},
    content : {in: 'body', notEmpty: true}
  };

  console.log("新增的日志："+JSON.stringify(req.body));

  await paramValidator(schema, req);

  let options = {
    log : req.body
  };

  try {

    await logService.addLog(options);
    return next({code : 0, msg : '添加日志成功', ext : {resultCode : 1}});
  } catch(error) {

    console.log(error);
    return next({code : 1, msg : '添加日志失败', ext : {resultCode : 0}});
  }

}

async function delLog(req, res, next) {

  let schema = {
    id : {in: 'params', isInt: true, optional: true},
  };
  await paramValidator(schema, req);

  let options = {
    where : {id : req.params.id}
  };

  try {

    await logService.delLog(options);
    return next({code : 0, msg : '删除日志成功', ext : {resultCode : 1}});
  } catch(error) {

    console.log(error);
    return next({code : 1, msg : '删除日志失败', ext : {resultCode : 0}});
  }

}

async function modLog(req, res, next) {

  let schema = {
    id : {in: 'params', isInt: true, optional: false},
    userId : {in: 'body', isInt: true, optional: false},
    createTime : {in: 'body', notEmpty: false},
    content : {in: 'body', notEmpty: false}
  };

  await paramValidator(schema, req);
  
  let options = {
    where : {id : req.params.id},
    log : req.body
  };

  try {

    await logService.modLog(options);
    return next({code : 0, msg : '修改日志信息成功', ext : {resultCode : 1}});
  } catch(error) {

    console.log(error);
    return next({code : 1, msg : '修改日志信息失败', ext : {resultCode : 0}});
  }

}