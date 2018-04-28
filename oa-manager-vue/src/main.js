// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' // 默认主题
// import '../static/css/theme-green/index.css'; // 浅绿色主题
// import SIdentify from './components/page/Identify'; //自定义组件
import 'babel-polyfill'

// Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI)

// window.axios = require('axios')
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// Vue.prototype.$http = window.axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
