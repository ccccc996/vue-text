import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入第三方字体图标样式
import './assets/fonts/iconfont.css'
// 导入全局样式
import './assets/css/global.css'

//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 请求拦截器
axios.interceptors.request.use((config) => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  // console.log(res)
  if(res.data.meta.msg === '无效token' && res.data.meta.status === 400){
    location.href = '/#/login'
  }
  return res
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
