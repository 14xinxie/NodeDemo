/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 11:17:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 15:57:44
 */

'use strict';

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,   
        },
        name : {
            type : DataTypes.STRING(50),
            defaultValue : '',
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        nickName : {
            field : 'nick_name',
            type : DataTypes.STRING(50),
            defaultValue : '',
            allowNull : false,
            comment : '用户昵称'
        },
        role : {
            type : DataTypes.INTEGER(1),
            defaultValue : 0,
            allowNull : false,
            comment : '用户角色:０ 普通用户,1 管理员'
        }   
    },{
        tableName : 'tbl_user'
    });
    return User;
}