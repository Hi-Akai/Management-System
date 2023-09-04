//路由鉴权:某一个路由什么条件下可以访问、什么条件下不可以访问
import router from '@/router/index'
//进度条组件引入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//在组件外部通过同步语句获取小仓库数据，是获取不到的，需要先获取大仓库数据
import pinia from './store'
import useUserStore from './store/modules/user'

//去除进度条默认的加载圆圈
NProgress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `管理系统 - ${to.meta.title}`
  NProgress.start()
  //获取用户仓库中token的数据，判断用户登录状态
  const token = userStore.token
  const username = userStore.username
  if (token) {
    //如果用户已登录，就不能访问登录页面，直接跳转到首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //如果有用户信息
      if (username) {
        next()
      } else {
        //如果没有用户信息，就先获取用户信息，在放行
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //如果是登录页面
    if (to.path == '/login') {
      next()
    } else {
      //如果不是登录页面，但在url上输入了想要去的路由，就把路由上，等用户登录成功后，可以直接跳转的该页面
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach(() => {
  NProgress.done()
})
