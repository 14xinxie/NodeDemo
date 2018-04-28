/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 10:31:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 11:36:02
 */

 'use strict';

  module.exports = {
      index
  };

  async function index(req,res,next) {
    res.locals.currentUser = req.session.user;
    console.log(res.locals.currentUser);
    return next({code : 0,view : 'index.html'});    
  }