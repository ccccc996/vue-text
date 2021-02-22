import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果访问的是 登陆 页面，则放行，允许访问
  if (to.path == '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  // 如果没有获取到token值的话强制跳转到登陆页面
  if(!tokenStr) return next('/login')
  next()
})

export default router
