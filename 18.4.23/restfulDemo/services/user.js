'use strict';

module.exports = {

    getUser,
    deleteUser,
    updateUser,
    addUser
}


async function addUser(options) {

    
    return await db.User.create(options);
}


async function getUser(options){

    let uId = options.uId;

    let user = await db.User.findOne({
        where : {uId : uId}
    });

    return user;
}


async function updateUser(options){

    let uId = options.uId;
    let uName = options.uName;

    return await db.User.update({
        uName : uName
    },{
        where : {uId : uId}
    });
}

async function deleteUser(options){

    let uId = options.uId;

    return await db.User.destroy({
        where : {uId : uId}
    });


}