/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-26 19:49:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-26 20:19:34
 */

'use strict';

const ipTool = require('ip');
const netConfig = require('./config');

module.exports = dyNetworkSegment;


/**
 * 判断IP所属网段
 * 
 * @param {any} ip 
 * @returns {number}
 */
function dyNetworkSegment(ip) {
    let net = netConfig.eNet['内网'];
    if (netConfig.allNet.indexOf(ipToKey(ip)) > -1) {
        return netConfig.eNet['三网通'];
    }

    //标记是否还需要继续判断
    let flag = true;
    
    //判断是否为广州内网
    for (let i = 0; i < netConfig.gzInSideIps.length; i++) {
        let ipSegment = netConfig.gzInSideIps[i];
        if (ipTool.cidrSubnet(ipSegment).contains(ip)) {
            net = netConfig.eNet['广州内网'];
            flag = false;
            break;
        }
    }

    if (flag) {
        //判断是否为广州中网
        for (let i = 0; i < netConfig.gzMiddleIps.length; i++) {
            let ipSegment = netConfig.gzMiddleIps[i];
            if (ipTool.cidrSubnet(ipSegment).contains(ip)) {
                net = netConfig.eNet['广州中网'];
                flag = false;
                break;
            }
        }
    }

    if (flag) {
        //判断是否为广州外网
        for (let i = 0; i < netConfig.gzOutSideIps.length; i++) {
            let ipSegment = netConfig.gzOutSideIps[i];
            if (ipTool.cidrSubnet(ipSegment).contains(ip)) {
                net = netConfig.eNet['广州外网'];
                flag = false;
                break;
            }
        }
    }

    if (flag) {
        //判断是否为成都内网
        for (let i = 0; i < netConfig.cdInSideIps.length; i++) {
            let ipSegment = netConfig.cdInSideIps[i];
            if (ipTool.cidrSubnet(ipSegment).contains(ip)) {
                net = netConfig.eNet['成都内网'];
                flag = false;
                break;
            }
        }
    }

    if (flag) {
        //判断是否为成都中网
        for (let i = 0; i < netConfig.cdMiddleIps.length; i++) {
            let ipSegment = netConfig.cdMiddleIps[i];
            if (ipTool.cidrSubnet(ipSegment).contains(ip)) {
                net = netConfig.eNet['成都中网'];
                flag = false;
                break;
            }
        }
    }

    if (flag) {
        //判断是否为成都外网
        for (let i = 0; i < netConfig.cdOutSideIps.length; i++) {
            let ipSegment = netConfig.cdOutSidIps[i];
            if (ipTool.cidrSubnet(ipSegment).contains(ip)) {
                net = netConfig.eNet['成都外网'];
                flag = false;
                break;
            }
        }
    }

    return net;
}


/**
 * ip转换
 * 
 * @param {any} ip 
 * @returns {string}
 */
function ipToKey(ip) {
    let ipData = ip.spilt('.');
    return `${ipData[0]}.${ipData[1]}.${ipData[2]}.*`;

}
