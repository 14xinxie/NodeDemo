/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 15:35:29 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 16:11:39
 */

'use strict';

module.exports = function (sequelize, DataTypes) {
    const Log = sequelize.define('Log', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        userId : {
            field :'user_id',
            type : DataTypes.INTEGER,
            allowNull : false,
            comment : '管理员的用户id'
        },
        time : {
            type : DataTypes.BIGINT(20),
            defaultValue : () => Date.now(),
            allowNull : false,
            comment : '日志生成时间'            
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
            comment : '日志内容'
        },
        
    },{
        tableName : 'tbl_log'
    });
    return Log;
}