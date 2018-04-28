/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 17:11:05 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 17:24:48
 */

'use strict';

module.exports = function (params) {
    if (typeof params === 'function') {
        return catchError(params);
    }
    if (typeof params === 'object') {
        for (let key in params) {
            if (typeof params[key] === 'function') {
                params[key] = catchError(params[key]);
            }
        }
    }
    return params;
}


/**
 * 
 * 错误catch
 * @param {any} controller 
 * @returns 
 */
function catchError(controller) {
    return function (req,res,next) {
        let func = controller.apply(null, arguments);
        if (func && typeof func.then === 'function') {
            return func.catch((err) => {
                if (typeof err === 'string' && err.indexOf('参数') > -1) {
                    return next({code : 4, msg : err, err : err});
                }
                return netx({code : 1, msg : err.message || err, err : err});
            });
        }
        return func;
    };
}

