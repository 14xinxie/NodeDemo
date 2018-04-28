/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 16:25:02 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 16:40:55
 */

'use strict';

let customSanitizers = {
    toArray(value) {
        return (typeof value === 'string') ? JSON.parse(value) : value;
    },
    toIntArray(value) {
        return _.map((typeof value === 'string') ? JSON.parse(value) : value, _.toInteger);
    }
};

let customValidators = {
    isArray(value) {
        try {
            return _.isArray((typeof value === 'string') ? JSON.parse(value) : value);
        } catch (e) {
            return false;
        }
    },
    isIntArray(value) {
        try {
            value = (typeof value === 'string') ? JSON.parse(value) : value;
            return _.isArray(value) && _.every(value, (item) => _.isInteger(parseInt(item)));
        } catch (e) {
            return false;
        }
    }
};

module.exports = {
    customSanitizers,
    customValidators
};