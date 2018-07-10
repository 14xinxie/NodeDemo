/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 11:19:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-03 15:05:27
 */
'use strict';

module.exports = {
  addUser,
  findUser
};

async function addUser(options) {

  let user = options.user;
  return await db.User.create(user);
}


async function findUser(options) {

  let where = options.where;
  return await db.User.findOne({
    where: where
  });
}