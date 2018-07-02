/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 15:35:29 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-02 18:44:34
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const Log = sequelize.define('Log', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '日志id'
        },
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '管理员的用户id'
        },
        createTime: {
            field: 'create_time',
            type: DataTypes.BIGINT(20),
            defaultValue: () => Date.now(),
            allowNull: false,
            comment: '日志生成时间'
        },
        content: {
            field: 'content',
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '日志内容'
        },

    }, {
        tableName: 'tbl_log'
    });

    //管理员用户与日志的1:n关系
    Log.associate = (models) => {
        models.Log.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        models.User.hasMany(models.Log, {
            as: 'Logs',
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
    return Log;
};