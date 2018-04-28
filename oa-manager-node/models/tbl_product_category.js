/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 16:35:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 15:03:09
 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    const ProductCategory = sequelize.define('ProductCategory', {
        id : {
            field : 'id',
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
            comment : 'OA产品类别id'
        },
        name : {
            field : 'name',
            type : DataTypes.STRING(10),
            allowNull : false,
            comment : 'OA产品类别名称'
        }
    },{
        tableName : 'tbl_product_category'
    });

    return ProductCategory;

};