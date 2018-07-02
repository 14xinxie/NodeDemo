/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:30:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:35:09
 */

'use strict';

const categoryService = require("../../../services/category");

module.exports = handleError({
    getCategorys,
    addCategory,
    delCategory,
    modCategory
});

async function getCategorys(req, res, next) {

    let schema = {
        page: { in: 'query', isInt: true, defaultValue: 1, optional: true },
        pagesize: { in: 'query', isInt: true, defaultValue: 10, optional: true }
    }

    await paramValidator(schema, req);

    let options = {
        where: {},
        page: req.query.page,
        pagesize: req.query.pagesize
    };

    try {

        let result = await categoryService.getCategorys(options);
        return next({ code: 0, msg: '获取产品类型列表成功', ext: { categoryList: result, resultCode: 1 } });
    } catch (error) {
        console.log(error);
        return next({ code: 1, msg: '获取产品类型列表失败', ext: { resultCode: 0 } });
    }



}

async function addCategory(req, res, next) {

    let schema = {
        name: { in: 'body', notEmpty: true },
        sortId: { in: 'body', isInt: true, optional: true }
    };
    await paramValidator(schema, req);

    let options = {
        category: req.body
    };

    try {

        await categoryService.addCategory(options);
        return next({ code: 0, msg: '添加产品成功', ext: { resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '添加产品失败', ext: { resultCode: 0 } });
    }

}

async function delCategory(req, res, next) {

    let schema = {
        id: { in: 'params', isInt: true, optional: true },
    };

    await paramValidator(schema, req);

    let options = {
        where: { id: req.params.id }
    };

    try {

        await categoryService.delCategory(options);
        return next({ code: 0, msg: '删除产品成功', ext: { resultCode: 1 } });

    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '删除产品失败', ext: { resultCode: 0 } });
    }

}

async function modCategory(req, res, next) {

    let schema = {
        id: { in: 'params', isInt: true, optional: false },
        name: { in: 'body', notEmpty: false },
        sortId: { in: 'body', isInt: true, optional: true }
    };

    await paramValidator(schema, req);

    let options = {
        where: { id: req.params.id },
        category: req.body
    };

    try {

        await categoryService.modCategory(options);
        return next({ code: 0, msg: '修改产品信息成功', ext: { resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '修改产品信息失败', ext: { resultCode: 0 } });
    }

}