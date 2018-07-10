/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 15:32:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 16:24:44
 */

'use strict';

const status = require('./defines');

exports.finallyResp = function (options) {
	options = options || {};
	let defaultFormat = options.format || 'JSONString';
	return function finallyResp(result,req,res,next) {
		if (_.isError(result)) {
			result = {
				status : 'interalError',
				code : 1,
				err : result,
				msg : result.message
			};
		}

		let msg = result.msg || status[result.code].desc;
		let ext = result.ext || {};
		let view = null;

		if (!(req.url.indexOf('/api') > -1)) {
			view = result.view || status[result.code].view;
		}

		let page = result.page;
		let err = result.err;
		let desc = result.desc || status[result.code].desc;
		
		function dealError(err) {
			logger.error('\nError begin', '\n', err, '\n', 'Error End');
			if (_.isError(err)) {

			}
			if (page || view) {
				res.render('500', {err:err});
			}
		}

		res.status(status[result.code].httpCode);

		if (view) {
			if (err) {
				dealError(err);
			} else {
				res.render(view, (err,html) => {
					if (err) {
						dealError(err);
					} else {
						res.send(html);
					}
				});
			}
		} else if (page) {
			res.send(page);
		} else {
			if (err) {
				dealError(err);
			}
			let retObj = {
				RetSucceed : true,
				Succeed : status[result.code].succeed,
				Code : result.code,
				Desc : desc,
				Message : msg,
				extData : ext
			};
			let format = defaultFormat;
			if (format === 'JSONString') {
				res.send(JSON.stringify(retObj));
			} else {
				res.json(retObj);
			}
		}
	};
};