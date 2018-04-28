'use strict';

const userService = require('../../../services/user');

// const redis = require('../../../config/redis').redis;

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    addUser
}



//优先查询redis
async function getUser(req,res,next) {
    
    // redis.get('user').then(async (result)=>{
		
	// 	if(result == null || result == '' || result == undefined){

    //         console.log("请求的信息："+JSON.stringify(req.params));
    //         let user = await userService.getUser(req.params);
    //         redis.set('users',JSON.stringify(user));
    //         res.json(user);
	// 	}
	// 	else{
            
    //         let user = result;	
	// 		res.json(user);
	// 	}
	// }).catch((err)=>{
	// 	console.log(err);
	// })
    console.log("请求的信息："+JSON.stringify(req.params));
    let user = await userService.getUser(req.params);
    // redis.set('users',JSON.stringify(user));
    res.json(user);
    
}


async function deleteUser(req,res,next){
    
    let user = await userService.deleteUser(req.params);

    if(user){
        res.json({msg : '删除成功'});
    }else{
        res.json({msg : '删除失败'});
    }
}
    

async function addUser(req,res,next){

    console.log("请求添加的信息："+JSON.stringify(req.query));

    let user = await userService.addUser(req.query);

    if(user){
        res.json({msg : '添加用户成功！'});
    }else{
        res.json({msg : '添加用户失败！'});
    }
    
}

async function updateUser(req,res,next){

    let user = await userService.updateUser(req.query);

    if(user){
        res.json({msg : '更新用户信息成功'});
    }else{
        res.json({msg : '更新用户信息失败'});
    }
}
    