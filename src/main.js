import Vue from 'vue'
import App from './App'
import router from './router'

import './views/comm/comm.css'
// import 'weui/dist/style/weui.css'

// 解决移动端click事件延迟300ms问题
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})