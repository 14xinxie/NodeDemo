/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 17:04:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-10 21:20:51
 */

const productService = require('../../../services/product');

const categoryService = require('../../../services/category');

const multiparty = require('multiparty');
const fs         = require('fs');
const uuid       = require('uuid');

const path       = require('path');


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
    page: { in: 'query', isInt: true, optional: true },
    pagesize: { in: 'query', isInt: true, optional: true }
  };
  await paramValidator(schema, req);

  console.log('page:'+req.query.page);
  console.log('pagesize:'+req.query.pagesize);

  let getOptions = {
    where: {},
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {
    
    let result = await productService.getProducts(getOptions);
    return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
  }

}

async function addProduct(req, res, next) {

  let form = new multiparty.Form();
  //设置form表单传入的字段属性、属性值的编码。默认为utf8。
  form.encoding = 'utf-8';
  //设置上传的文件的保存目录，该目录必须存在
  form.uploadDir='public/upload/'  

  //console.log('生成的UUID码：'+uuid.v1());
  //表单数据解析
  form.parse(req, async function (err, fields, files) {
    
    let formData = {};

    let file = files['iconFile'][0];

    //获取文件类型
    let fileType = path.extname(file.originalFilename);

    // console.log('接收到的文件：'+JSON.stringify(file));

    for(let item in fields) {
      
      formData[item] = fields[item].toString();
    }

    //增加表单项iconName，存储图标的名称
    formData['iconName'] = uuid.v1()+fileType+'';

    console.log('文件名：'+formData['iconName']);

    //对上传的文件重命名
    fs.renameSync(file.path,form.uploadDir+formData['iconName']);
   
    //将表单的数据赋值给req.body
    req.body = formData;

    let schema = {
      name: { in: 'body', notEmpty: true },
      desc: { in: 'body', notEmpty: true },
      url: { in: 'body', notEmpty: true },
      categoryId: { in: 'body', isInt: true, optional: true },
      tip: { in: 'body', notEmpty: true },
      netSegment: { in: 'body', notEmpty: true },
      sortId: { in: 'body', isInt: true, optional: true },  
      iconName: { in: 'body', notEmpty: true }
    };
  
    console.log('提交的数据：'+JSON.stringify(req.body));
  
    await paramValidator(schema, req);

    console.log('文件存储的路径：'+file.path);
  

    console.log('请求头中的信息：'+JSON.stringify(req.body));
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

  
    data = JSON.stringify(fields);
    console.log('表单中的文件：'+JSON.stringify(files));
  });
  
}

async function delProduct(req, res, next) {

  let schema = {
    id: { in: 'params', isInt: true, optional: true },
  };
  await paramValidator(schema, req);

  let getOptions = {
    where: { id: req.params.id }
  };

  //获取删除之前的产品信息
  let oldProduct = await productService.getProductDetail(getOptions);

  console.log('需要删除的产品：'+JSON.stringify(oldProduct));

  //获取session中的用户信息
  let user = req.session.user;
  
  let delLog = {
    userId: user.id,
    content: user.nickName+'删除了产品'+oldProduct.name
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

  
  console.log('更新的params请求数据：'+JSON.stringify(req.params));

  console.log('更新的body请求数据：'+JSON.stringify(req.body));

  let schema = {
    id: { in: 'params', isInt: true, optional: false },
    name: { in: 'body', notEmpty: true, optional: true },
    desc: { in: 'body', notEmpty: true, optional: true},
    url: { in: 'body', notEmpty: true, optional: true },
    categoryId: { in: 'body', isInt: true, optional: true },
    tip: { in: 'body', notEmpty: true, optional: true },
    netSegment: { in: 'body', notEmpty:true, optional: true },
    sortId: { in: 'body', isInt: true, optional: true }
  };

  await paramValidator(schema, req);

  let getProOptions = {
    where: { id: req.params.id }
  };

  //获取修改前的产品信息
  let oldProduct = await productService.getProductDetail(getProOptions);

  console.log('修改前的产品信息：'+JSON.stringify(oldProduct));

  

  //获取session中的用户信息
  let user = req.session.user;

  let logContent = '';

  if (req.body.categoryId !== undefined) {
    let getCateOptions = {
      where: { id: req.body.categoryId }
    };

    //获取修改后的产品类型名称
    let newCategory = await categoryService.getCategoryDetail(getCateOptions);

    if (newCategory.name !== undefined && oldProduct.Category.name !== newCategory.name) {
      logContent += '修改产品类型名称'+oldProduct.Category.name+'为'+newCategory.name;
    }
  }
  
  
  

  //判断产品各个字段的信息是否被修改，并增加相应的日志信息
  if (req.body.name !== undefined &&oldProduct.name !== req.body.name) {
    logContent += '修改产品名称'+oldProduct.name+'为'+req.body.name;
  } 
  if (req.body.desc !== undefined && oldProduct.desc !== req.body.desc) {
    logContent += '修改产品描述'+oldProduct.desc+'为'+req.body.desc;
  } 
  if (req.body.url !== undefined && oldProduct.url !== req.body.url) {
    logContent += '修改产品网址'+oldProduct.url+'为'+req.body.url;
  } 
  
  if (req.body.tip !== undefined && oldProduct.tip !== req.body.tip) {
    logContent += '修改产品注意事项'+oldProduct.tip+'为'+req.body.tip;
  } 
  if (req.body.netSegment !== undefined && oldProduct.netSegment !== req.body.netSegment) {
    logContent += '修改产品所属网段'+oldProduct.netSegment+'为'+req.body.netSegment;
  } 
  if (req.body.sortId !== undefined && oldProduct.sortId !== req.body.sortId) {
    logContent += '修改产品内部排序'+oldProduct.sortId+'为'+req.body.sortId;
  }
  
  let modLog = {
    userId: user.id,
    content: user.nickName+logContent+''
  };
  
  let modOptions = {
    where: { id: req.params.id },
    product: req.body,
    log: modLog
  };

  try {

    await productService.modProduct(modOptions);
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

  let getOptions = {
    keyWord: req.params.keyWord,
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {

    let result = productService.getProductsByKeyWord(getOptions);
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

  let getOptions = {
    where: { categoryId: req.params.categoryId },
    page: req.query.page,
    pagesize: req.query.pagesize
  };

  try {

    let result = await productService.getProducts(getOptions);
    return next({ code: 0, msg: '获取产品信息列表成功', ext: { productList: result, resultCode: 1 } });
  } catch (error) {

    console.log(error);
    return next({ code: 1, msg: '获取产品信息列表失败', ext: { resultCode: 0 } });
  }
}


