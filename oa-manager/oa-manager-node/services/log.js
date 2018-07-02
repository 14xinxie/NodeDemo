/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-28 16:34:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-28 17:52:49
 */

'use strict';

module.exports = {
    getLogs,
    addLog,
    delLog,
    modLog,
};

async function getLogs(options) {

    let page = options.page;
    let pagesize = options.pagesize;
    let where = options.where;
    return await db.Log.findAndCount({
        include: [{
            model: db.User,
            as: 'User'
        }],
        where: where,
        offset: (page - 1) * pagesize,
        limit: pagesize
    });
};

async function addLog(options) {

    let log = options.log;
    return await db.Log.create(log);
}

async function delLog(options) {

    let where = options.where;
    return await db.Log.destroy({
        where: where
    });
}

async function modLog(options) {

    let where = options.where;
    let log = options.log;
    return await db.Log.update(log, {
        where: where
    });

}