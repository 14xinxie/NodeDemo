// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' // 默认主题
import SIdentify from '@/components/page/Identify'; //自定义的验证码组件

import "babel-polyfill";
Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.component("SIdentify", SIdentify);

//Vue.prototype.$http = axios
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})