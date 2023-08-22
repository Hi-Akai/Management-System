export const constantRoute = [
  {
    path: '/login', //登录页面
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
  },
  {
    path: '/', //主页页面
    component: () => import('@/views/home/index.vue'),
    name: 'home', //命名路由
  },
  {
    path: '/404',
    component: () => import('@/views/error/index.vue'),
    name: '404', //命名路由
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any', //命名路由
  },
]
