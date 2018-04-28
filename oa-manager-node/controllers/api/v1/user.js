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

async function register(req,res,next) {
    const schema = {
        name : {in: 'body', notEmpty: true},
        password : {in: 'body', notEmpty: true}
    };
    await paramValidator(schema,req);
    let result = await userService.findUser({where : {name : req.body.name}});
    if (result) {
        return next({code : 4, msg : '该用户名已被注册！'});
    }
    await userService.addUser(req.body);
    return next({code : 0, msg : '注册成功'});
}

async function login(req,res,next) {
    const schema = {
        name : {in: 'body', notEmpty: true},
        password : {in: 'body', notEmpty: true}
    };
    await paramValidator(schema,req);
    let result = await userService.findUser({where : req.body});
    if (result) {
        req.session.user = result;
        return next({code : 0, msg : '登录成功！', ext : {name : result.name, id : result.id}});
    } else {
        return next({code : 4, msg : '登录失败，用户名或密码错误'});
    }
}

async function logout(req,res,next) {
    req.session.user = null;
    return next({code : 0, msg : '退出成功！'});
}

async function getCurrentUser(req,res,next) {
    return next({code : 0, msg : req.session.user});
}