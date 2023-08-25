export const constantRoute = [
  {
    path: '/login', //登录页面
    component: () => import('@/views/login/index.vue'),
    name: 'Login', //命名路由
    meta: {
      title: '登录',
      hidden: true, //在菜单中是否隐藏
    },
  },
  {
    path: '/', //主页
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen', //数据大屏
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen', //命名路由
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
    },
  },
  {
    path: '/acl', //权限管理
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'HelpFilled',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'Avatar',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error/index.vue'),
    name: '404', //命名路由
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any', //命名路由
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
