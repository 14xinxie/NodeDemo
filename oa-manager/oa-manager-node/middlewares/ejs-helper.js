/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 14:10:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:03:16
 */

'use strict';

module.exports = function () {
	return function (req,res,next) {
		helper(res.locals);
		next();
	}
}

/**
 * 
 * 
 * @param {any} locals 
 */
function helper(locals) { 
	locals.dateFormat = function (millSeconds, fmt = 'yyyy-MM-dd hh:mm') {
		if (!millSeconds) {
			return '';
		}
		if (typeof millSeconds === 'string') {
			millSeconds = Number.parseInt(millSeconds);
		}

		let date = new Date(millSeconds);
		let o = {
			'M+' : date.getMonth() + 1,
			'd+' : date.getDate(),
			'h+' : date.getHours(),
			'm+' : date.getMinutes(),
			's+' : date.getSeconds(),
			'q+' : Math.floor((data.getMonth() + 3) / 3),
			'S+' : date.getMilliseconds()
		};

		if (/(y+)/.test(fmt)) {

			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4-RegExp.$1.length));
		}
		for (let k in o) {
			if (new RegExp(`${k}`).test(fmt)) {
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ((`00${o[k]}`).substr(`${o[k]}`).length));
			}
		}
		return fmt;
	};
}