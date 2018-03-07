// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui'//这是引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css'

import axios from "axios";//不是vue插件，导入之后只能在当前模块使用
import api, { domain } from "./js/api.js";//导入有名字的内容


import './less/index.less'//这是引入less文件
import './assets/css/style.css'//这是引入less文件

Vue.use(ElementUI)

axios.defaults.baseURL = domain;//配置默认域名，这样请求的时候不用每次都在url里面手动加上域名了

// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;

// 为了使用方便, 把axios和api添加到Vue原型, 将来vue组件就可以直接使用
Vue.prototype.$http = axios;
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
