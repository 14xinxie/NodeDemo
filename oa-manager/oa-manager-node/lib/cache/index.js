/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 21:12:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:29:53
 */

'use strict';

const Redis = require('ioredis');

module.exports = new Cache({redis : config.redis});


/**
 * 缓存类
 * 
 * @param {any} options 
 * @constructor
 */
function Cache(options) {
    console.log('redis初始化中....');
    this._client = new Redis(options.redis);
}

Cache.prototype.set = async function (key, content, expire) {
    await this._client.set(key, JSON.stringify(content || ''));
    if (expire) {
        await this._client.expire(key, expire);
    }

    return null;
};

Cache.prototype.get = async function (key, func, expire, refresh = false) {
    let cacheContent = await this._client.get(key);
    if (cacheContent && !refresh) {
        return JSON.parse(cacheContent);
    }
    if (typeof func === 'function') {
        let content = await func();
        await this.set(key, content, expire);
        return content;
    } else {
        return null;
    }
};

Cache.prototype.hset = async function (key, field, content, expire) {
    await this._client.hset(key, field, JSON.stringify(content) || '');
    if (expire) {
        await this._client.expire(key, expire);
    }
    return null;
};

Cache.prototype.hget = async function (key, field, func, expire, refresh = false) {
    let cacheContent = await this._client.hget(key, field);
    if (cacheContent && !refresh) {
        return JSON.parse(cacheContent);
    }
    if (typeof func === 'function') {
        let content = await func();
        await this.hset(key, field, content, expire);
        return content;
    } else {
        return null;
    }
};

Cache.prototype.del = async function (key) {
    return await this._client.del(key);
};
