/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 13:48:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:32:13
 */

'use strict';

//引入第三方中间件模块
const path             = require('path');
const mysql            = require('mysql');
const responseTime     = require('response-time');
const cookieParser     = require('cookie-parser');
const bodyParser       = require('body-parser');
const serveFavicon     = require('serve-favicon');
const expressSession   = require('express-session');
const SessionStore     = require('connect-redis')(expressSession);
const express          = require('express');
const ejs              = require('ejs');
const compression      = require('compression');
const expressValidator = require('express-validator');

//引入自定义中间件模块
const ValidatorConfig  = require('../middlewares/param-validator/config');
const ejsHelper        = require('../middlewares/ejs-helper');
const finallyResp      = require('../middlewares/finally-resp');

const router = require('../routes');
const app = express();

app.set('views', path.join(__dirname, '..', config.view.dir));
app.set('view engine', config.view.engine); 
app.engine('.html',ejs.__express);
app.engine('.ejs',ejs.__express);

app.use(compression());
app.use(responseTime());
app.use((logger.log4js.connectLogger(logger, config.log)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

console.log('请求redis服务器中....');
app.use(expressSession({
    proxy             : true,
    resave　          : false,
    saveUninitialized : false,
    name              : 'oa-manager',
    secret            : 'oa-manager-secret',
    store             : new SessionStore({
        host : config.redis.host,
        port : config.redis.port,
        db   : config.redis.sessionDB,
        pass : config.redis.password
    }),
    cookie            : {maxAge : 1000 * 60 *60 * 7}  
}));

app.use(ejsHelper());
app.use(serveFavicon(path.join(__dirname, '../public/favicon.icon')));
app.use(express.static(config.static.dir, {maxAge : config.static.maxAge}));

app.use(expressValidator(ValidatorConfig));

app.use(router);

app.use((req,res,next) => next({code : 2}));

app.use(finallyResp.finallyResp({format : 'JSON'}));

function start(){
    app.listen(config.web.port, function () {
        logger.info(config.web.name, config.web.url, 'start up!');
    });
    return db.sequelize.sync({force : false}).catch(function (err) {
        logger.error(err);
        process.exit(1);
    });
}

if (!module.parent) {
    start();
} else {
    exports.start = start;
}