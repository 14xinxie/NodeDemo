"use strict";

module.exports = function(sequelize,DataTypes){
    const User = sequelize.define('User',{
        uId : {
            field : 'uId',
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false
        },
        uName : {
            field : 'uName',
            type : DataTypes.STRING(50),
            defaultValue : '',
            allowNull : false
        },
        uAge : {
            field : 'uAge',
            type : DataTypes.INTEGER(2),
            defaultValue : 18,
            allowNull : false
        }

    },{
        tableName : 'tbl_user'
    });

    return User;

}