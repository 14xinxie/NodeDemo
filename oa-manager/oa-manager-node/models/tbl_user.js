/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 11:17:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-02 19:19:28
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '用户id'
        },
        account: {
            field: 'account',
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '用户帐号'
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '用户密码'
        },
        nickName: {
            field: 'nick_name',
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '用户昵称'
        },
        phone: {
            field: 'phone',
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '电话号码'
        },
        role: {
            field: 'role',
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            comment: '用户角色:0 普通用户,1 管理员'
        }
    }, {
        tableName: 'tbl_user'
    });
    return User;
};