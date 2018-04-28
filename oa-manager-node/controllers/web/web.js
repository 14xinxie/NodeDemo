/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 10:31:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 10:36:01
 */

 'use strict';

  module.exports = {
      index
  };

  async function index(req,res,next) {
    return next({code : 0,view : 'index.html'});    
  }