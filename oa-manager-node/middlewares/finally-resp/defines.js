/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 15:25:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 15:32:07
 */

'use strict';

const status = {
    0 : {succeed : true, httpCode : 200, status : 'success', desc : '成功'},
    1 : {succeed : true, httpCode : 500, status : 'interalError', desc : '内部错误', view : '500'},
    2 : {succeed : true, httpCode : 404, status : 'notFound', desc : '接口不存在', view : '404'},
    3 : {succeed : true, httpCode : 403, status : 'notAuth', desc : '没有请求权限'},
    4 : {succeed : true, httpCode : 400, status : 'paramError', desc : '参数错误'}
};

module.exports = status;