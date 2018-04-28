/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 09:46:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 15:51:08
 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        id : {
            field : 'id',
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
            comment : 'OA产品id'
        },
        name : {
            field : 'name',
            type : DataTypes.STRING(10),
            allowNull : false,
            comment : 'OA产品名称'
        },
        desc : {
            field : 'desc',
            type : DataTypes.TEXT,
            comment : 'OA产品介绍'
        },
        url : {
            field : 'url',
            type : DataTypes.STRING(50),
            comment : 'OA产品网站'
        },
        categoryId : {
            field : 'category_id',
            type : DataTypes.INTEGER,
            allowNull : false,
            comment : 'OA产品类型id'
        },
        tip : {
            field : 'tip',
            type : DataTypes.STRING(50),
            defaultValue : '',
            allowNull : false,
            comment : 'OA产品注意事项'
        },
        netSegment : {
            field : 'net_segment',
            type : DataTypes.STRING(20),
            allowNull : false,
            comment : 'OA产品所属网段'
        },
        sortId : {
            field : 'sort_id',
            type : DataTypes.INTEGER,
            allowNull : false,
            comment : 'OA产品内部排序id'
        },
        iconId : {
            field : 'icon_id',
            type : DataTypes.INTEGER,
            allowNull : false,
            comment : 'OA产品图标id'
        }
    },{
        tableName : 'tbl_product'
    });

    Product.associate = (models) => {

        //产品类型和产品的1:n关系
        models.Product.belongsTo(models.ProductCategory, {
            as : 'Category',
            foreignKey : 'category_id',
            onDelete : 'CASCADE',
            onUpdate : 'CASCADE'
        });
        models.ProductCategory.hasMany(models.Product, {
            as : 'Products',
            foreignKey : 'category_id',
            onDelete : 'CASCADE',
            onUpdate : 'CASCADE'
        });
    }
    return Product;

};