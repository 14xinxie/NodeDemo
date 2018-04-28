'use strict';

const db = require('../models/index');

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}

async function getUsers() {
    let res =  await db.User.findAll();
    let results = [];
    for(let index in res)
    {
        results.push(res[index].dataValues);
    }
   //console.log('ssssssss',results);
    return results;

}

async function postUsers(options) {
    let res = await db.User.update({
         userName: options.userName,
         password:options.password,
         }, {
        where: {
            id: options.id
        }
    });
  //  console.log(res);
    return res;
}


async function putUsers(options) {
    let res = await db.User.create({
        userName: options.userName,
        password: options.password
    });
    console.log(res);
    return res;
}


async function deleteUsers(options) {
    //console.log(111);
    let res = await db.User.update({
        'deleted_at':db.sequelize.fn('now')
    },{
        where: {
            id: options.id
        }
    });
    console.log(res);
    return res;
} 