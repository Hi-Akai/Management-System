import { createApp } from 'vue'
import App from './App.vue'
//引入ElementPlus及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入ElementPlus图标
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入ElementPlus中文处理
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要的配置代码
import 'virtual:svg-icons-register'
//引入组件对象
import gloablComponent from './components/index'
//引入全局样式
import '@/styles/index.scss'
//引入路由
import router from './router/index'
//引入仓库
import pinia from './store'
//引入路由鉴权
import './permission'

// 获取应用实例对象
const app = createApp(App)
//安装'element-plus'
// app.use(ElementPlus)
//将图标组件循环注册
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
//ElementPlus中文化处理
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
//注册路由模板
app.use(router)
//安装仓库
app.use(pinia)

// 将应用挂载到挂载点上
app.mount('#app')
