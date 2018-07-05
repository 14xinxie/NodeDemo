/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 10:31:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-05 20:10:40
 */

 'use strict';


 const fs         = require('fs');
  module.exports = {
      index,
      getImage
  };
  
  async function index(req,res,next) {
    //res.locals.currentUser = req.session.user;
    // req.session.user = {name : 11};
    // console.log(res.locals.currentUser);

    // console.log("会话信息"+JSON.stringify(req.session));
    return next({code : 0,view : 'index.html'});    
  }


  async function getImage(req,res,next) {

    console.log('读取图片中。。。');
    let schema = {
      iconName: { in: 'params', notEmpty: true },
    };
    await paramValidator(schema, req);
    
    fs.readFile('./public/upload/'+req.params.iconName, "binary", function(err, file) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("读取图片完成");
        res.writeHead(200,  {'Content-Type':'image/jpeg'});
        res.write(file, "binary");
        res.end();
      }
    });
  }