//路由鉴权:某一个路由什么条件下可以访问、什么条件下不可以访问
import router from '@/router/index'
//进度条组件引入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start()
  next()
})
//全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  NProgress.done()
})
