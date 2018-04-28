/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 11:15:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 17:56:51
 */

'use strict';

const crypto = require('crypto');

const Buffer = require('buffer').Buffer;

module.exports = {
    md5
}


/**
 * 
 * 计算字符串的md5值
 * @param {any} str 
 * @returns 
 */
function md5(str) {
    let buf = new Buffer(str);
    str     = buf.toString('binary');
    let md5 = crypto.createHash('md5');
    md5.update(str);
    let hash = md5.digest('hex');
    return hash;
}