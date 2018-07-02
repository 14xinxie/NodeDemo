/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:04:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-02 21:05:57
 */

const productService = require('../../../services/product');

const categoryService = require('../../../services/category');

module.exports = handleError({
    getProducts,
    addProduct,
    delProduct,
    modProduct,
    getProductsByCategory,
    getProductsByKeyWord
});

async function getProducts(req, res, next) {

    let schema = {
        page: { in: 'query', isInt: true, defaultValue: 1, optional: true },
        pagesize: { in: 'query', isInt: true, defaultValue: 10, optional: true }
    };
    await paramValidator(schema, req);

    let options = {
        where: {},
        page: req.query.page,
        pagesize: req.query.pagesize
    };

    try {
        let result = await productService.getProducts(options);
        return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
    }

}

async function addProduct(req, res, next) {

    let schema = {
        name: { in: 'body', notEmpty: true },
        desc: { in: 'body', notEmpty: true },
        url: { in: 'body', notEmpty: true },
        categoryId: { in: 'body', isInt: true, optional: true },
        tip: { in: 'body', notEmpty: true },
        netSegment: { in: 'body', notEmpty: true },
        sortId: { in: 'body', isInt: true, optional: true }
    };

    await paramValidator(schema, req);

    let user = req.session.user;

    console.log("管理员用户信息：" + JSON.stringify(user));
    let addLog = {
        userId: user.id,
        content: user.nickName + '添加了产品' + req.body.name
    };
    let addOptions = {
        product: req.body,
        log: addLog
    };
    try {
        await productService.addProduct(addOptions);
        return next({ code: 0, msg: '添加产品成功', ext: { resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '添加产品失败', ext: { resultCode: 0 } });
    }

}

async function delProduct(req, res, next) {

    let schema = {
        id: { in: 'params', isInt: true, optional: true },
    };
    await paramValidator(schema, req);

    let getOptions = {
        where: { id: req.params.id }
    };

    let oldProduct = await productService.getProductDetail(getOptions);

    let user = req.session.user;

    let delLog = {
      userId: user.id,
      content: user.uNickName+'删除了产品'+oldProduct.name
    };

    let delOptions = {
      where: { id: req.params.id },
      log: delLog
    };

    try {

        await productService.delProduct(delOptions);
        return next({ code: 0, msg: '删除产品成功', ext: { resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '删除产品失败', ext: { resultCode: 0 } });
    }

}

async function modProduct(req, res, next) {

  let schema = {
      id: { in: 'params', isInt: true, optional: false },
      name: { in: 'body', notEmpty: false },
      desc: { in: 'body', notEmpty: false },
      url: { in: 'body', notEmpty: false },
      categoryId: { in: 'body', isInt: true, optional: true },
      tip: { in: 'body', notEmpty: false },
      netSegment: { in: 'body', notEmpty: false },
      sortId: { in: 'body', isInt: true, optional: true }
  };

  await paramValidator(schema, req);

  let getProOptions = {
    where: { id: req.params.id }
  };

  //获取修改前的产品
  let oldProduct = await productService.getProductDetail(getProOptions);

  let getCateOptions = {
    where: { id: req.body.categoryId }
  };
  
  //获取修改后的产品类型名称
  let newCategory = await categoryService.getCategoryDetail(getCateOptions);

  let user = req.session.user;
  let logContent = user.nickName+'';

  if (oldProduct.name !== req.body.name) {
    logContent += '修改产品名称'+oldProduct.name+'为'+req.body.name;
  } 
  if (oldProduct.desc !== req.body.desc) {
    logContent += '修改产品描述'+oldProduct.desc+'为'+req.body.desc;
  } 
  if (oldProduct.url !== req.body.url) {
    logContent += '修改产品网址'+oldProduct.url+'为'+req.body.url;
  } 
  if (oldProduct.category.name !== newCategory.name) {
    logContent += '修改产品类型名称'+oldProduct.category.name+'为'+newCategory.name;
  }
  if (oldProduct.tip !== req.body.tip) {
    logContent += '修改产品注意事项'+oldProduct.tip+'为'+req.body.tip;
  } 
  if (oldProduct.netSegment !== req.body.netSegment) {
    logContent += '修改产品所属网段'+oldProduct.netSegment+'为'+req.body.netSegment;
  } 

  let options = {
      where: { id: req.params.id },
      product: req.body
  };

  try {

      await productService.modProduct(options);
      return next({ code: 0, msg: '修改产品信息成功', ext: { resultCode: 1 } });
  } catch (error) {

      console.log(error);
      return next({ code: 1, msg: '修改产品信息失败', ext: { resultCode: 0 } });
  }

}

async function getProductsByKeyWord(req, res, next) {

    let schema = {
        keyWord: { in: 'params', notEmpty: true },
        page: { in: 'query', isInt: true, optional: true },
        pagesize: { in: 'query', isInt: true, optional: true }
    };

    await paramValidator(schema, req);

    let options = {
        keyWord: req.params.keyWord,
        page: req.query.page,
        pagesize: req.query.pagesize
    };

    try {

        let result = productService.getProductsByKeyWord(options);
        return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
    }
}

async function getProductsByCategory(req, res, next) {

    let schema = {
        categoryId: { in: 'params', isInt: true, optional: false },
        page: { in: 'query', isInt: true, defaultValue: 1, optional: true },
        pagesize: { in: 'query', isInt: true, defaultValue: 10, optional: true }
    };

    await paramValidator(schema, req);

    let options = {
        where: { categoryId: req.params.categoryId },
        page: req.query.page,
        pagesize: req.query.pagesize
    };

    try {

        let result = await productService.getProducts(options);
        return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
    } catch (error) {

        console.log(error);
        return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
    }
}


