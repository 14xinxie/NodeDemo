/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 10:28:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:19:03
 */
'use strict';

const userService = require('../../../services/user');

module.exports = handleError({
    login,
    register,
    logout,
    getCurrentUser
});

async function register(req, res, next) {
    let schema = {
        nickName: { in: 'body', notEmpty: true },
        account: { in: 'body', notEmpty: true },
        password: { in: 'body', notEmpty: true },
        phone: { in: 'body', notEmpty: true }
    };
    await paramValidator(schema, req);

    let options = {
        where: { account: req.body.account }
    };

    try {

        let result = await userService.findUser(options);
        console.log("注册返回的结果:" + JSON.stringify(result));
        if (result) {

            return next({ code: 0, msg: '该用户名已被注册', ext: { resultCode: 2 } });
        } else {

            let options = {
                user: req.body
            };

            let user = await userService.addUser(options);
            req.session.user = user;
            return next({ code: 0, msg: '注册成功', ext: { user: user, resultCode: 1 } });
        }
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '注册失败', ext: { resultCode: 0 } });
    }

}

async function login(req, res, next) {

    let schema = {
        account: { in: 'body', notEmpty: true },
        password: { in: 'body', notEmpty: true }
    };
    await paramValidator(schema, req);

    let options = {
        where: req.body
    };

    try {

        let result = await userService.findUser(options);
        if (result) {

            req.session.user = result;
            return next({ code: 0, msg: '登录成功', ext: { user: result, resultCode: 1 } });
        } else {

            return next({ code: 0, msg: '登录失败，用户名或密码错误', ext: { resultCode: 0 } });
        }
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '登录失败，服务器错误', ext: { resultCode: 2 } });
    }

}

async function logout(req, res, next) {

    req.session.user = null;
    return next({ code: 0, msg: '退出成功' });
}

async function getCurrentUser(req, res, next) {

    let user = req.session.user;
    return next({ code: 0, msg: '获取当前用户信息成功', ext: { user: user } });
}