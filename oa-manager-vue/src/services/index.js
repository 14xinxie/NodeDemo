/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-27 19:43:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 20:07:37
 */
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

export default {
    install : function (V) {
        axios.interceptors.request.use(
            config => {
                if (config.method === 'get') {
                    config.params = {
                        ...config.params,
                        _t: new Data().getTime()
                    }
                }
                return config
            },
            err => {
                return Promise.reject(err)
            }
        );
        axios.interceptors.response.use(
            res => {
                return res.data.Code === 200 ? res : Promise.reject(res)
            },
            err => {
                if (!err.response) {
                    err.response = {
                        Code: 9990,
                        Message: '请求超时',
                        data: {}
                    }
                    return Promise.reject(err)
                }

                if (err.response.status === 403) {
                    Message({
                        type: 'error',
                        message: '登录信息已过期，请重新登录！',
                        duration: 3000
                    })
                    setTimeout(() => {
                        router.push('/login');
                    },1000)
                    return Promise.reject(err);
                }
            }
        )

        V.$axios = axios
        V.prototype.$axios = axios
    }

   
}