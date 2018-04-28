/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 11:19:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 11:21:14
 */
'use strict';

module.exports = {
    addUser,
    findUser
};

async function addUser(options) {
    return await db.User.create(options);
}


async function findUser(options) {
    return await db.User.findOne({where : options.where});
}